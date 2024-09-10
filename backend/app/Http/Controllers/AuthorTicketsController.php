<?php

namespace App\Http\Controllers;

use App\Http\Resources\TicketResource;
use App\Http\Requests\Tickets\StoreTicketRequest;
use App\Models\Ticket;
use  App\Http\Filters\TicketFilter;
use App\Http\Requests\Tickets\ReplaceTicketRequest;
use App\Http\Requests\Tickets\UpdateTicketRequest;

use Illuminate\Database\Eloquent\ModelNotFoundException;

class AuthorTicketsController extends ApiController
{
    public function index($author_id, TicketFilter $filters) {
        
        return  TicketResource::collection(Ticket::where('user_id',$author_id)->filter($filters)->paginate());

    }
       /**
     * Store a newly created resource in storage.
     */
    public function store($author_id, StoreTicketRequest $request)
    {   
      
      return new TicketResource(Ticket::create($request->
      mappedAttributes(['user_id'=> $author_id])));
        
      if ($this->isAble('store', Ticket::class)) {
        return new TicketResource(Ticket::create($request->mappedAttributes([
            'author' => $author_id
        ])));
    }

    return $this->notAuthorized('You are not authorized to create that resource');
  }


  public function destroy($author_id,$ticket_id)
  {   

      try{
          $ticket = Ticket::findOrFail($ticket_id);

          if($ticket->user_id==$author_id) {
            $ticket->delete();
            return $this->ok('Ticket sucessfully deleted');
          }
         
          return   $this->error('Ticket cannot found.', 404);

      } catch (ModelNotFoundException $exception) {
           return   $this->error('Ticket cannot found.', 404);
      }
  }
    /**
     * Replace the specified resource in storage.
     */
    public function replace(ReplaceTicketRequest $request,$author_id, $ticket_id)
    {
        try{
                
            $ticket = Ticket::findOrFail($ticket_id);
            
          if($ticket->user_id==$author_id) {
            // $model = [
            //     'title' => $request->input('data.attributes.title'),
            //     'description' =>  $request->input('data.attributes.description'),
            //     'status' =>  $request->input('data.attributes.status'),
            //     'user_id' =>  $request->input('data.relationships.author.data.id'),
            // ];
            
            $ticket->update($request->mappedAttributes());
            return new TicketResource($ticket);
           
          }
          
        }catch(ModelNotFoundException $exception) {
          
            return   $this->error('Ticket cannot found.', 404);
        }

    }
    public function update(UpdateTicketRequest $request,$author_id, $ticket_id)
    {
        try{
                
            $ticket = Ticket::findOrFail($ticket_id);
            
          if($ticket->user_id==$author_id) {
            // $model = [
            //     'title' => $request->input('data.attributes.title'),
            //     'description' =>  $request->input('data.attributes.description'),
            //     'status' =>  $request->input('data.attributes.status'),
            //     'user_id' =>  $request->input('data.relationships.author.data.id'),
            // ];
          
            $ticket->update($request->mappedAttributes());
            return new TicketResource($ticket);
        }
        }catch(ModelNotFoundException $exception) {
          
            return   $this->error('Ticket cannot found.', 404);
        }

    }
}

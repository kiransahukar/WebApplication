<?php

namespace App\Http\Controllers;

use App\Models\Ticket;
use App\Models\User;
use App\Http\Controllers\Controller;
use App\Http\Filters\TicketFilter;
use App\Http\Requests\Tickets\StoreTicketRequest;
use App\Http\Requests\Tickets\ReplaceTicketRequest;
use App\Http\Requests\Tickets\UpdateTicketRequest;
use App\Http\Resources\TicketResource;
use App\Policies\TicketPolicy;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class TicketController extends ApiController
{   

    protected $policyClass =  TicketPolicy::class;
    /**
     * Display a listing of the resource.
     */
    public function index(TicketFilter $filters)
    {
         
        // if($this->include('author')) {

        //     return TicketResource::collection(Ticket::with('author')->paginate());
        // }

        return  TicketResource::collection(Ticket::filter($filters)->paginate());
    //    return TicketResource::collection(Ticket::paginate());

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTicketRequest $request)
    {   
        try{
            $user=User::findOrFail($request->input('data.relationships.author.data.id'));
  
        }catch(ModelNotFoundException $exception) {
           return $this->ok("User not found",[
                'error'=>"Provided user id does not exists"
            ]);
        }

        // $model = [
        //     'title' => $request->input('data.attributes.title'),
        //     'description' =>  $request->input('data.attributes.description'),
        //     'status' =>  $request->input('data.attributes.status'),
        //     'user_id' =>  $request->input('data.relationships.author.data.id'),
        // ];

        return new TicketResource(Ticket::create($request->mappedAttributes()));
  }

    /**
     * Display the specified resource.
     */
    public function show($ticket_id)
    {
        try {
            $ticket = Ticket::findOrFail($ticket_id);
          
            if ($this->include('author')) {

                return new TicketResource($ticket->load('user'));
            }

            return new TicketResource($ticket);
        } catch (ModelNotFoundException $exception) {
            return   $this->error('Ticket cannot found.', 404);
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Ticket $ticket)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTicketRequest $request,  $ticket_id)
    {
        try{
                
            $ticket = Ticket::findOrFail($ticket_id);

            $this->isAble('update',$ticket);
            $ticket->update($request->mappedAttributes());

            return new TicketResource($ticket);
            
        }catch(ModelNotFoundException $exception) {
          
            return   $this->error('Ticket cannot found.', 404);
        } catch(AuthorizationException $ex) {
            return $this->error('You are not authorized to Update that resource', 401);
        }
    }
     /**
     * Replace the specified resource in storage.
     */
    public function replace(ReplaceTicketRequest $request, $ticket_id)
    {
        try{
                
            $ticket = Ticket::findOrFail($ticket_id);
            // $model = [
            //     'title' => $request->input('data.attributes.title'),
            //     'description' =>  $request->input('data.attributes.description'),
            //     'status' =>  $request->input('data.attributes.status'),
            //     'user_id' =>  $request->input('data.relationships.author.data.id'),
            // ];
            $ticket->update($request->mappedAttributes());
            return new TicketResource($ticket);
        }catch(ModelNotFoundException $exception) {
          
            return   $this->error('Ticket cannot found.', 404);
        }

    }
    /**
     * Remove the specified resource from storage.
     */
    public function destroy($ticket_id)
    {   

        try{
            $ticket = Ticket::findOrFail($ticket_id);
            $ticket->delete();
            return $this->ok('Ticket sucessfully deleted');
        } catch (ModelNotFoundException $exception) {
             return   $this->error('Ticket cannot found.', 404);
        }
    }
}

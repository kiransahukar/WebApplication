<?php

namespace App\Http\Controllers\LabsData;

use App\Models\LabsData;
use App\Models\User;

use App\Http\Filters\LabsDataFilter;

use App\Http\Requests\StoreTicketRequest;
use App\Http\Requests\ReplaceTicketRequest;
use App\Http\Requests\UpdateTicketRequest;
use App\Http\Resources\LabsDataResource;
use Illuminate\Database\Eloquent\ModelNotFoundException;


use App\Http\Controllers\ApiController;

class LabsDataController extends ApiController
{
    /**
     * Display a listing of the resource.
     */
    public function index(LabsDataFilter $filters)
    {
         
        // if($this->include('author')) {

        //     return LabsDataResource::collection(LabsData::with('author')->paginate());
        // }

        return  LabsDataResource::collection(LabsData::filter($filters)->paginate());
    //    return LabsDataResource::collection(LabsData::paginate());

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

        $model = [
            'title' => $request->input('data.attributes.title'),
            'description' =>  $request->input('data.attributes.description'),
            'status' =>  $request->input('data.attributes.status'),
            'user_id' =>  $request->input('data.relationships.author.data.id'),
        ];


        return new LabsDataResource(LabsData::create($model));
  }

    /**
     * Display the specified resource.
     */
    public function show($ticket_id)
    {
        try {
            $ticket = LabsData::findOrFail($ticket_id);
          
            if ($this->include('author')) {

                return new LabsDataResource($ticket->load('user'));
            }

            return new LabsDataResource($ticket);
        } catch (ModelNotFoundException $exception) {
            return   $this->error('LabsData cannot found.', 404);
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(LabsData $ticket)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTicketRequest $request, LabsData $ticket)
    {
        //
    }
     /**
     * Replace the specified resource in storage.
     */
    public function replace(ReplaceTicketRequest $request, $ticket_id)
    {
        try{
                
            $ticket = LabsData::findOrFail($ticket_id);
            $model = [
                'title' => $request->input('data.attributes.title'),
                'description' =>  $request->input('data.attributes.description'),
                'status' =>  $request->input('data.attributes.status'),
                'user_id' =>  $request->input('data.relationships.author.data.id'),
            ];
            $ticket->update($model);
            return new LabsDataResource($ticket);
        }catch(ModelNotFoundException $exception) {
          
            return   $this->error('LabsData cannot found.', 404);
        }

    }
    /**
     * Remove the specified resource from storage.
     */
    public function destroy($ticket_id)
    {   

        try{
            $ticket = LabsData::findOrFail($ticket_id);
            $ticket->delete();
            return $this->ok('LabsData sucessfully deleted');
        } catch (ModelNotFoundException $exception) {
             return   $this->error('LabsData cannot found.', 404);
        }
    }
}

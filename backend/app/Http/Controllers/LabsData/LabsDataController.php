<?php

namespace App\Http\Controllers\LabsData;

use App\Models\LabsData;
use App\Models\User;

use App\Http\Filters\LabsDataFilter;

use App\Http\Requests\LabsData\StoreLabsDataRequest;

use App\Http\Requests\LabsData\UpdateLabsDataRequest;
use App\Http\Requests\LabsData\ReplaceLabsDataRequest;
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
     


           // $data = LabsDataResource::collection(LabsData::filter($filters));
            $data = LabsDataResource::collection(LabsData::filter($filters)->paginate());
            return $data;

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
    public function store(StoreLabsDataRequest $request)
    {

        // try{
        //     $user=User::findOrFail($request->input('data.relationships.author.data.id'));

        // }catch(ModelNotFoundException $exception) {
        //    return $this->ok("User not found",[
        //         'error'=>"Provided user id does not exists"
        //     ]);
        // }

        // $model = [
        //     'user_id' => $request->input('data.attributes.user_id'),
        //     'session_id' =>  $request->input('data.attributes.session_id'),
        //     'comment' =>  $request->input('data.attributes.comment'),
        //     'status' =>  $request->input('data.attributes.status'),
        //     //'user_id' =>  $request->input('data.relationships.author.data.id'),
        // ];


        return new LabsDataResource(LabsData::create($request->mappedAttributes()));
    }

    /**
     * Display the specified resource.
     */
    public function show($lab_id)
    {
        try {
            $labData = LabsData::findOrFail($lab_id);

            if ($this->include('author')) {

                return new LabsDataResource($labData->load('user'));
            }

            return new LabsDataResource($labData);
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
    public function update(UpdateLabsDataRequest $request)
    {


        try {

            $labData = LabsData::findOrFail($request->input('data.attributes.id'));
            $labData->update($request->mappedAttributes());
            return new LabsDataResource($labData);
        } catch (ModelNotFoundException $exception) {

            return   $this->error('LabsData cannot found.', 404);
        }
    }
    /**
     * Replace the specified resource in storage.
     */
    public function replace(ReplaceLabsDataRequest $request)
    {
        // return $request;
        try {

            $labData = LabsData::findOrFail($request->input('data.attributes.id'));

            $labData->update($request->mappedAttributes());
            return new LabsDataResource($labData);
        } catch (ModelNotFoundException $exception) {

            return   $this->error('LabsData cannot found.', 404);
        }
    }
    /**
     * Remove the specified resource from storage.
     */
    public function destroy($ticket_id)
    {

        try {
            $ticket = LabsData::findOrFail($ticket_id);
            $ticket->delete();
            return $this->ok('LabsData sucessfully deleted');
        } catch (ModelNotFoundException $exception) {
            return   $this->error('LabsData cannot found.', 404);
        }
    }
}

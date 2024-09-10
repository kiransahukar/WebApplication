<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserResource;
use App\Http\Filters\AuthorFilter;


class AuthorsController extends ApiController
{
    /**
     * Display a listing of the resource.
     */

    
    public function index(AuthorFilter $filter)
    {



        return UserResource::collection(User::filter($filter)->paginate());


        //later try
        //  return UserResource::collection(
        //     User::select('users.*')
        //         ->join('tickets', 'users.id', '=', 'tickets.user_id')
        //         ->filter($filters)
        //         ->distinct()
        //         ->paginate()
        // );
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
    

    /**
     * Display the specified resource.
     */
    public function show(User $author)
    {
        if($this->include('tickets')) {

            return new UserResource($author->load('tickets'));
        }
        return new UserResource($author);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        //
    }

    

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        //
    }
}

<?php

namespace App\Http\Controllers;

use App\Http\Filters\AuthorFilter;
use App\Http\Requests\User\ReplaceUserRequest;
use App\Models\User;
use App\Http\Requests\User\UpdateUserRequest;
use App\Http\Requests\User\StoreUserRequest;
use App\Http\Resources\UserResource;
use App\Policies\UserPolicy;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;

class UserController extends ApiController
{
    protected $policyClass = UserPolicy::class;
    /**
     * Display a listing of the resource.
     */
    public function index(AuthorFilter $filters)
    {

        return UserResource::collection(
            User::filter($filters)->get()
        );
        
        return UserResource::collection(
            User::filter($filters)->paginate()
        );


       
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request)
    {
        try {
            //return $this->ok("here in userContoller");
            $this->isAble('store', User::class);
 
        return new UserResource(User::create($request->mappedAttributes()));
         } catch (AuthorizationException $ex) {
             return $this->error('You are not authorized to create that resource', 401);
         } catch (QueryException $ex) {
            return $this->error("Dublicate",400);
         }
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        if ($this->include('tickets')) {
            return new UserResource($user->load('tickets'));
        }

        return new UserResource($user);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, $user_id)
    {
        try {
            $user = User::findOrFail($user_id);

            // policy
            $this->isAble('update', $user);
            
            $user->update($request->mappedAttributes());
    
            return new UserResource($user);
        } catch (ModelNotFoundException $exception) {
            return $this->error('Ticket cannot be found.', 404);
        } catch (AuthorizationException $ex) {
            return $this->error('You are not authorized to update that resource', 401);
        }
    }

    public function replace(ReplaceUserRequest $request, $user_id) {
        // PUT
        try {
            $user = User::findOrFail($user_id);

            // policy
            $this->isAble('replace', $user);

            $user->update($request->mappedAttributes());

    
            return new UserResource($user);
        } catch (ModelNotFoundException $exception) {
            return $this->error('User cannot be found.', 404);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($user_id)
    {
        try {
            $user = User::findOrFail($user_id);

            // policy
            $this->isAble('delete', $user);

            $user->delete();

            return $this->ok('User successfully deleted');
        } catch (ModelNotFoundException $exception) {
            return $this->error('User cannot found.', 404);
        }
    }
}
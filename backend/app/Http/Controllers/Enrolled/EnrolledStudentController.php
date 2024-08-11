<?php

namespace App\Http\Controllers\Enrolled;

use App\Models\EnrolledStudents;
use App\Http\Controllers\ApiController;
use App\Http\Requests\StoreEnrolledStudentsRequest;
use App\Http\Requests\UpdateEnrolledStudentsRequest;
use App\Http\Resources\EnrolledStudentsResource;
use App\Http\Filters\EnrolledFilter;

class EnrolledStudentController extends ApiController
{
    /**
     * Display a listing of the resource.
     */
    public function index(EnrolledFilter $filter)
    {
        return  EnrolledStudentsResource::collection(EnrolledStudents::filter($filter)->paginate());
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
    public function store(StoreEnrolledStudentsRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(EnrolledStudents $enrolledStudents)
    {
        if($this->include('course')) {

            
            return new EnrolledStudentsResource($enrolledStudents->load('course'));
        }
        return new EnrolledStudentsResource($enrolledStudents);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(EnrolledStudents $enrolledStudents)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateEnrolledStudentsRequest $request, EnrolledStudents $enrolledStudents)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(EnrolledStudents $enrolledStudents)
    {
        //
    }
}

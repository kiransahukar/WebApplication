<?php

namespace App\Http\Controllers\Enrolled;

use App\Models\EnrolledStudents;
use App\Http\Controllers\ApiController;
use App\Http\Requests\StoreEnrolledStudentsRequest;
use App\Http\Requests\Enrolled\UpdateEnrolledStudentsRequest;
use App\Http\Resources\EnrolledStaffResource;
use App\Http\Filters\EnrolledFilter;
use App\Http\Requests\Enrolled\StoreEnrolledRequest;
use App\Models\Course;
use App\Models\Enrolled_Staff;
use App\Models\EnrolledStaff;
use App\Models\User;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Client\Request;

class EnrolledStaffController extends ApiController
{
    /**
     * Display a listing of the resource.
     */
    public function index(EnrolledFilter $filter)
    {
        return  EnrolledStaffResource::collection(EnrolledStaff::filter($filter)->paginate());
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
    public function store(StoreEnrolledRequest $request)
    {
        try{
            $user=User::findOrFail($request->input('data.attributes.userId'));
            $course=Course::findOrFail($request->input('data.attributes.courseId'));

            $enrollData= EnrolledStaff::where('user_id', $request->input('data.attributes.userId'))
            ->where('course_id', $request->input('data.attributes.courseId'))->exists();

            if($enrollData) {
                return $this->error( "Provided user Id or course Id   exists",406);
            }
            if($user->profession === "Staff") {
                return new EnrolledStaffResource(EnrolledStaff::create($request->mappedAttributes()));
            } else {
                return $this->error("User is not Staff. ",406);
            }
        }catch(ModelNotFoundException $exception) {
           return $this->error( "Provided user Id or course Id does not match",406);
        }
       // return new EnrolledStaffResource(EnrolledStaff::create($request->mappedAttributes()));
    }

    /**
     * Display the specified resource.
     */
    public function show(EnrolledStudents $enrolledStudents)
    {
        if($this->include('course')) {

            
            return new EnrolledStaffResource($enrolledStudents->load('course'));
        }
        return new EnrolledStaffResource($enrolledStudents);
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
    public function delete(StoreEnrolledRequest $request)
    {
        try {
           
            $check = EnrolledStaff::where('user_id', $request->input('data.attributes.userId'))
                ->where('course_id', $request->input('data.attributes.courseId'))->exists();
            
            if ($check) {
                
            $ticket = EnrolledStaff::where('user_id', $request->input('data.attributes.userId'))
            ->where('course_id', $request->input('data.attributes.courseId'));
                $ticket->delete(); 
                return $this->ok('LabsData successfully deleted');
            } else {
                return $this->error('Does not  match.', 404);
            }
        } catch (ModelNotFoundException $exception) {
            return $this->error('Cannot  found.', 404);
        }
        
    }
}

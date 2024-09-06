<?php

namespace App\Http\Controllers\CourseControllers;
use App\Http\Controllers\ApiController;
use App\Models\CourseDetails;
use App\Http\Controllers\Controller;
use App\Http\Filters\CourseFilter;
use App\Http\Requests\CourseDetails\StoreCourseDetailsRequest;
use App\Http\Requests\CourseDetails\UpdateCourseDetailsRequest;

use App\Http\Resources\CourseDetailsResource;
use App\Http\Resources\CourseResource;
use App\Models\Course;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Client\Request as ClientRequest;
use Illuminate\Http\Request;

class CourseDetailsController extends ApiController
{
    /**
     * Display a listing of the resource.
     */
    public function index(CourseFilter $filters)
    {
        return CourseDetailsResource::collection(CourseDetails::filter($filters)->paginate());
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
    public function store(StoreCourseDetailsRequest $request)
    {
        try{
            $course=Course::findOrFail($request->input('data.attributes.course_id'));
            $model = [
                'course_id' =>$request->input('data.attributes.course_id'),
                'session_no' => $request->input('data.attributes.session_no'),
                'session_name' =>  $request->input('data.attributes.session_name'),
            ];
    
    
            return new CourseDetailsResource(CourseDetails::create($model));
  
        }catch(ModelNotFoundException $exception) {
           return $this->ok("Course not found",[
                'error'=>"Provided course id does not exists"
            ]);
        }

        
    }

    /**
     * Display the specified resource.
     */
    public function show(CourseDetails $courseDetails)
    {
        return new CourseDetailsResource($courseDetails);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(CourseDetails $courseDetails)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCourseDetailsRequest $request, CourseDetails $courseDetails)
    {
        try{
            $course=CourseDetails::findOrFail($request->input('data.attributes.id'));

           
    
            $course->update($request->mappedAttributes());
            return new CourseDetailsResource($course);
  
        }catch(ModelNotFoundException $exception) {
           return $this->ok("Course not found",[
                'error'=>"Provided course id does not exists"
            ]);
        }

       
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        try{
            $courseDetail = CourseDetails::findOrFail($id);
           $courseDetail->delete();
            return $this->ok('sucessfully deleted ',[$courseDetail]);
        } catch (ModelNotFoundException $exception) {
             return   $this->error('Ticket cannot found.', 404);
        }
    }
}

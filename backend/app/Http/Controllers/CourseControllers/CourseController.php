<?php

namespace App\Http\Controllers\CourseControllers;

use App\Models\Course;
use App\Http\Controllers\ApiController;
use App\Http\Filters\CourseFilter;
use App\Http\Requests\StoreCourseRequest;
use App\Http\Requests\UpdateCourseRequest;
use App\Http\Resources\CourseResource;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class CourseController extends ApiController
{
    /**
     * Display a listing of the resource.
     */
    public function index(CourseFilter $filter)
    {
        return  CourseResource::collection(Course::filter($filter)->paginate());
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCourseRequest $request)
    {
        $model = [
            'course_name' => $request->input('data.attributes.course_name'),
        ];

        return Course::create($model);
    }

    /**
     * Display the specified resource.
     */
    public function show(Course $course)
    {
        
        if($this->include('courseDetails')) {

            return new CourseResource($course->load('courseDetails'));
        }
        return new CourseResource($course);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Course $course)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCourseRequest $request, Course $course)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy( $courseId)
    {
        try{
            $courseDetail = Course::findOrFail($courseId);
           $courseDetail->delete();
            return $this->ok('sucessfully deleted ',[$courseDetail]);
        } catch (ModelNotFoundException $exception) {
             return   $this->error('Course not  found.', 404);
        }
    }
}

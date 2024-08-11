<?php

namespace App\Http\Controllers\CourseControllers;

use App\Models\Course;
use App\Http\Controllers\ApiController;
use App\Http\Filters\CourseFilter;
use App\Http\Requests\StoreCourseDetailsRequest;
use App\Http\Requests\UpdateCourseRequest;
use App\Http\Resources\CourseDetailsResource;
use App\Http\Resources\CourseResource;
use App\Models\CourseDetails;

class AllCourseController extends ApiController
{
    /**
     * Display a listing of the resource.
     */
    public function index($course_id,CourseFilter $filter)
    {
        return  CourseDetailsResource::collection(CourseDetails::where('course_id',$course_id)->filter($filter)->paginate());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store($course_id,StoreCourseDetailsRequest $request)
    {   
        $model = [
            'course_id' =>  $course_id,
            'session_no' => $request->input('data.attributes.session_no'),
            'session_name' =>  $request->input('data.attributes.session_name'),
        ];
        return new CourseDetailsResource(CourseDetails::create($model));
    }

   
}

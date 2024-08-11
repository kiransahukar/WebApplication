<?php


namespace App\Http\Filters;

class CourseFilter extends QueryFilter{


    protected $sortable=[
        'title',
        'status',
        'createdAt'=>'created_at',
        'updatedAt'=>'updated_at'
    ];

    public function createdAt($value) {

        $dates = explode(',',$value);
        if(count($dates)>1) {

            return $this->builder->whereBetween('created_at', $dates);
        }
        return $this->builder->whereDate('created_at',$value);
    }
    
    public function updatedAt($value) {

        $dates = explode(',',$value);
        if(count($dates)>1) {

            return $this->builder->whereBetween('updated_at', $dates);
        }
        return $this->builder->whereDate('updated_at',$value);
    }

    public function include($value) {
        return $this->builder->with($value);
    }

    public function status($value) {
            return $this->builder->whereIn('status',explode(',',$value));
    }

    public function title($value) {
        $likeStr = str_replace('*','%',$value);

        return $this->builder->where('title', 'like', $likeStr);
    }

    public function id($value) {
        return $this->builder->whereIn('id',explode(',',$value));
    }

    public function courseId($value) {
        return $this->builder->whereIn('course_id',explode(',',$value));
    }

    public function sessionName($value) {
        $likeStr = str_replace('*','%',$value);

        return $this->builder->where('session_name', 'like', $likeStr);
    }
    public function name($value) {
        $likeStr = str_replace('*','%',$value);

        return $this->builder->where('course_name', 'like', $likeStr);
    }



}
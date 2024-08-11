<?php


namespace App\Http\Filters;

class EnrolledFilter extends QueryFilter{


    protected $sortable=[
        'userId'=>'user_id',
        'courseId'=>'course_id',
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


    public function userId($value) {
        return $this->builder->whereIn('user_id',explode(',',$value));
    }

    public function courseId($value) {
        return $this->builder->whereIn('course_id',explode(',',$value));
    }

}
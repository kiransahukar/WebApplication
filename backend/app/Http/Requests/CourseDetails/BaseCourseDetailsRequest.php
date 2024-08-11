<?php

namespace App\Http\Requests\CourseDetails;

use Illuminate\Foundation\Http\FormRequest;

class BaseCourseDetailsRequest extends FormRequest
{
    

    public function mappedAttributes() {

        $attributes = [
                'data.attributes.course_id' => 'course_id',
                'data.attributes.id' => 'id',
                'data.attributes.session_no'=>'session_no',
                'data.attributes.session_name'=>'session_name', 
                'data.attributes.createdAt'=>'created_at', 
                'data.attributes.updatedAt'=>'updated_at',  
           // 'data.relationships.author.data.id'=>'user_id'     
            ];
   
            $attributesToUpdate=[];

            foreach($attributes as $key => $attribute) {
                if($this->has($key)) {
                    $attributesToUpdate[$attribute] = $this->input($key);
                }
            }

            return $attributesToUpdate;

    }
   

    public function messages()
    {
        return [ 
            'data.attributes.status'=>"data.attributes.status value is invalid. Require a.c.h.x"
        ];
    }
}

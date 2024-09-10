<?php

namespace App\Http\Requests\Enrolled;

use Illuminate\Foundation\Http\FormRequest;

class BaseEnrolledRequest extends FormRequest
{
    

    public function mappedAttributes() {

        $attributes = [
                'data.attributes.courseId' => 'course_id',
                'data.attributes.userId' => 'user_id',
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
   

    // public function messages()
    // {
    //     return [ 
    //         'data.attributes.status'=>"data.attributes.status value is invalid. Require a.c.h.x"
    //     ];
    // }
}

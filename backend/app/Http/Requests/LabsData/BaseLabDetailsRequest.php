<?php

namespace App\Http\Requests\LabsData;

use Illuminate\Foundation\Http\FormRequest;

class BaseLabDetailsRequest extends FormRequest
{
    

    public function mappedAttributes() {

        $attributes = [
                
                'data.attributes.id' => 'id',
                'data.attributes.user_id' => 'user_id',
                'data.attributes.session_id'=>'session_id',
                'data.attributes.comment'=>'comment', 
                'data.attributes.title'=>'title',
                'data.attributes.status'=>'status', 
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

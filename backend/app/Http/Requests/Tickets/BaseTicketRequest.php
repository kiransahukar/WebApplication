<?php

namespace App\Http\Requests\Tickets;

use Illuminate\Foundation\Http\FormRequest;

class BaseTicketRequest extends FormRequest
{
    

    public function mappedAttributes(array $otherAttributes = []) {

        $attributes = [
            'data.attributes.title' => 'title',
            'data.attributes.description'=>'description',
            'data.attributes.status'=>'status',   
            'data.attributes.createdAt'=>'created_at', 
            'data.attributes.updatedAt'=>'updated_at',  
            'data.relationships.author.data.id'=>'user_id'     
            ];
   
            $attributesToUpdate=[];

            foreach($attributes as $key => $attribute) {
                if($this->has($key)) {
                    $attributesToUpdate[$attribute] = $this->input($key);
                }
            }
                
          //  return $attributesToUpdate;


            return array_merge($otherAttributes, $attributesToUpdate);
    }
   

    public function messages()
    {
        return [ 
            'data.attributes.status'=>"data.attributes.status value is invalid. Require a.c.h.x"
        ];
    }
}

<?php

namespace App\Http\Requests\User;

use Illuminate\Foundation\Http\FormRequest;

class BaseUserRequest extends FormRequest
{
    public function mappedAttributes(array $otherAttributes = []) {
        $attributeMap = array_merge([
            'data.attributes.name' => 'name',
            'data.attributes.email' => 'email',
            'data.attributes.profession' => 'profession',
            'data.attributes.password' => 'password',
        ], $otherAttributes);

        $attributesToUpdate = [];
        foreach ($attributeMap as $key => $attribute) {
            if ($this->has($key)) {
                $value = $this->input($key);

                if ($attribute === 'password') {
                    $value = bcrypt($value);
                }

                $attributesToUpdate[$attribute] = $value;
            }
        }

        return $attributesToUpdate;
    }
}
<?php

namespace App\Http\Requests\LabsData;

use Illuminate\Foundation\Http\FormRequest;

class UpdateLabsDataRequest extends BaseLabDetailsRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $rules = [
            'data.attributes.id' => 'sometimes|integer',
            'data.attributes.user_id' => 'sometimes|integer',
            'data.attributes.session_id' => 'sometimes|integer',
            'data.attributes.comment' => 'sometimes|string',
            'data.attributes.title'=>'sometimes|string',
            'data.attributes.status' => 'sometimes|string',
        ];
        // if ($this->routeIs('tickets.store')) {
        //     $rules['data.relationships.author.data.id'] = 'sometimes|integer';
        // }
        return $rules;
    }
}

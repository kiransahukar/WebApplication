<?php

namespace App\Http\Requests\LabsData;

use Illuminate\Foundation\Http\FormRequest;

class ReplaceLabsDataRequest extends BaseLabDetailsRequest
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
            'data.attributes.id' => 'required|integer',
            'data.attributes.user_id' => 'required|integer',
            'data.attributes.session_id' => 'required|integer',
            'data.attributes.comment' => 'required|string',
            'data.attributes.title'=>'required|string',
            'data.attributes.status' => 'required|string',
        ];
        // if ($this->routeIs('tickets.store')) {
        //     $rules['data.relationships.author.data.id'] = 'required|integer';
        // }
        return $rules;
    }
}

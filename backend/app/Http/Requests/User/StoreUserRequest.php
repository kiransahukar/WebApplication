<?php

namespace App\Http\Requests\User;



class StoreUserRequest extends BaseUserRequest
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
        return [
            'data.attributes.name' => 'required|string',
            'data.attributes.email' => 'required|email',
            'data.attributes.profession' => 'required|string|in:Admin,Staff,Student',
            'data.attributes.password' => 'required|string',
        ];
    }
}
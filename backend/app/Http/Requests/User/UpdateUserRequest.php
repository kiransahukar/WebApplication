<?php

namespace App\Http\Requests\User;

use Illuminate\Foundation\Http\FormRequest;

class UpdateUserRequest extends BaseUserRequest
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
            'data.attributes.name' => 'sometimes|string',
            'data.attributes.email' => 'sometimes|email',
            'data.attributes.profession' => 'sometimes|string|in:Admin,Staff,Student',
            'data.attributes.password' => 'sometimes|string',
        ];
    }
}
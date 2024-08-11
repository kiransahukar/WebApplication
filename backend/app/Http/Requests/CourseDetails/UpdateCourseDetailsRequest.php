<?php

namespace App\Http\Requests\CourseDetails;

use Illuminate\Foundation\Http\FormRequest;

class UpdateCourseDetailsRequest extends BaseCourseDetailsRequest
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
            'data.attributes.id' => 'required|integer',
            'data.attributes.session_no'=>'sometimes|integer',
            'data.attributes.session_name'=>'sometimes|string',
        ];

        if($this->routeIs('courseDetails.store')) {
            $rules['data.attributes.course_id'] = 'sometimes|integer';
        }
    }
}

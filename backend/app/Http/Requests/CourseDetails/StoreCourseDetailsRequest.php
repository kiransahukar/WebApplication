<?php

namespace App\Http\Requests\CourseDetails;

use Illuminate\Foundation\Http\FormRequest;

class StoreCourseDetailsRequest extends BaseCourseDetailsRequest
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
            //'data.attributes.course_id' => 'required|integer',
            'data.attributes.session_no'=>'required|integer',
            'data.attributes.session_name'=>'required|string',
        ];

        if($this->routeIs('courseDetails.store')) {
            $rules['data.attributes.course_id'] = 'required|integer';
        }
    }
}

<?php

namespace App\Http\Resources;

use App\Models\Course;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EnrolledStaffResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        //return parent::toArray($request);

        // return [
        //     'type' => 'enrolled',
        //     'attributes' => [
        //         'userId' => $this->user_id,
        //         'courseId' => $this->course_id,
        //     ],

        //     // 'links'=>[
        //     //     'self'=>route('authors.show',['author'=>$this->id]),
        //     // ]
        // ];
        return [
            'type' => 'enrolled',
            'attributes' => [
                'userId' => $this->user_id,
                'courseId' => $this->course_id,
            ],
           // 'includes' =>  CourseResource::collection(Course::where('id',$this->course_id)->paginate()),
           // 'includes'=> new UserResource($this->whenLoaded('course'))
           'includes'=> new CourseResource($this->whenLoaded('course')),
           
            // 'links'=>[
            //     'self'=>route('authors.show',['author'=>$this->id]),
            // ]
        ];
        return parent::toArray($request);
    }
}

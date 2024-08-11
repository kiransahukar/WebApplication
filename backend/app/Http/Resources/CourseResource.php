<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CourseResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        //return parent::toArray($request);

        return [
            'type' => 'course',
            'id' => $this->id,
            'attributes'=>[
                'name'=> $this->course_name,
                $this->mergeWhen($request->routeIs('courses.*'),[
                    'createdAt'=>$this->created_at,
                    'updatedAt'=>$this->updated_at,    
                ])
                ],
            'includes'=>  CourseDetailsResource::collection($this->whenLoaded('courseDetails')),
    
            // 'links'=>[
            //     'self'=>route('authors.show',['author'=>$this->id]),
            // ]
            ];
    }
}

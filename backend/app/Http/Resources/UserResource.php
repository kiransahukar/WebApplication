<?php

namespace App\Http\Resources;

use App\Models\EnrolledStudents;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
     //   return parent::toArray($request);


     return [
        'type' => 'user',
        'id' => $this->id,
        'attributes'=>[
            'name'=> $this->name,
            'email'=> $this->email,
            'profession'=>$this->profession,
            $this->mergeWhen($request->routeIs('authors.*'),[
                'emailVerifedAt'=>$this->email_verified_at,
                'createdAt'=>$this->created_at,
                'updatedAt'=>$this->updated_at,
            ])
            ],
        'includes'=>  TicketResource::collection($this->whenLoaded('tickets')),
        'courses' => EnrolledStudentsResource::collection($this->whenLoaded('courses')),
        'links'=>[
            'self'=>route('authors.show',['author'=>$this->id]),
        ]
        ];
   
    }
}

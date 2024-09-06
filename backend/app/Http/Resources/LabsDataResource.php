<?php

namespace App\Http\Resources;

use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class LabsDataResource extends JsonResource
{


    //public static $wrap = 'ticket';

    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        //return parent::toArray($request);

        return [
            'type'=>'Lab Data',
            'id'=>$this->id,
            'attributes'=>[
                'userId'=> $this->user_id,
                'sessionId'=> $this->session_id,
                'title'=>$this->title,
                'comment'=>$this->Comment,
                'status'=>$this->status,
                'createdAt'=>$this->created_at,
                'updatedAt'=>$this->updated_at,
            ],
            'relationships'=> [
                'author'=> [
                    'data'=>[
                        'type'=>'user',
                        'id'=> $this->user_id,
                    ],
                    'links'=>['self'=> route('authors.show',['author'=>$this->user_id])],
                ]
            ],
            'includes'=> new UserResource($this->whenLoaded('author')),
            
            'links' => [
                ['self' => route('tickets.show',['ticket'=>$this->id])]
            ]
        ];
    }
}

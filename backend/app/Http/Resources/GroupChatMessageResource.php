<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class GroupChatMessageResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'type' => 'group_chat_message',
            'id' => $this->id,
            'user' => $this->user_id,
            'groupId' => $this->group_id,
            'text' => $this->text,
            'createdAt' => $this->created_at,
            'updatedAt' => $this->updated_at,

        ];
    }
}

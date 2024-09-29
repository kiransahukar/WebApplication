<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Queue\SerializesModels;

class GroupMessageSent implements ShouldBroadcast
{
    use SerializesModels;

    public $message;
    public $groupId;
    public $user;

    public function __construct($message, $groupId, $user)
    {
        $this->message = $message;
        $this->groupId = $groupId;
        $this->user = $user;
    }

    public function broadcastOn()
    {
        return new Channel('group-chat.' . $this->groupId);
    }
}


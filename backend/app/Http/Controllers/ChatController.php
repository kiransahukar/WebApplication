<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Message; 
use App\Events\MessageSent;

use App\Events\PrivateMessageSent;
use App\Events\GroupMessageSent;
use App\Http\Resources\GroupChatMessageResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ChatController extends Controller
{
    // Handle sending private messages
    public function sendPrivateMessage(Request $request)
    {
        $message = $request->input('message');
        $receiverId = $request->input('receiver_id');

        // Broadcast the message to the receiver
        broadcast(new PrivateMessageSent($message, $receiverId))->toOthers();

        return response()->json(['status' => 'Message sent!']);
    }


    public function sendGroupMessage(Request $request)
    {
        $messageText = $request->input('message');
        $groupId = $request->input('group_id');
        $user = $request->input('user');
    
        // Save the message to the database
        $message = Message::create([
            'user_id' => $user, 
            'group_id' => $groupId,
            'text' => $messageText,
        ]);
        
        Log::info("Broadcasting message: ", ['message' => $messageText, 'groupId' => $groupId, 'user' => $user]);


        broadcast(new GroupMessageSent($messageText, $groupId, $user))->toOthers();
    
        
        return response()->json(['status' => 'Group message sent!']);
        return new GroupChatMessageResource($message);
    }
    
    public function getGroupMessages($groupId)
    {
        // Fetch messages for the group from the database
        $messages = Message::where('group_id', $groupId)->orderBy('created_at', 'asc')->get();
    
        // Return the messages as a collection of resources
        return GroupChatMessageResource::collection($messages);
    }
}

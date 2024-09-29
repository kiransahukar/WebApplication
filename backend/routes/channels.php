<?php

use Illuminate\Support\Facades\Broadcast;

/*
 |--------------------------------------------------------------------------
 | Broadcast Channels
 |--------------------------------------------------------------------------
 |
 | Here you may register all of the event broadcasting channels that your
 | application supports. The given channel authorization callbacks are
 | used to check if an authenticated user can listen to the channel.
 |
 */

Broadcast::channel('chat', function () {
    return true;
});
// For one-to-one chat (private channel)
Broadcast::channel('private-chat.{receiverId}', function ($user, $receiverId) {
    return (int) $user->id === (int) $receiverId;
});

// For group chat (public channel)
Broadcast::channel('group-chat.{groupId}', function ($user, $groupId) {
    return true; // Add your own group access control here if needed
});


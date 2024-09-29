<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMessagesTable extends Migration
{
    public function up()
    {
        Schema::create('messages', function (Blueprint $table) {
            $table->id(); // Auto-incrementing ID
            $table->unsignedBigInteger('user_id'); // ID of the user who sent the message
            $table->unsignedBigInteger('group_id')->nullable(); // ID of the group (nullable for private messages)
            $table->string('text'); // The message text
            $table->timestamps(); // Created at and updated at timestamps

            // Add foreign key constraints if necessary
           // $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
           // $table->foreign('group_id')->references('id')->on('groups')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('messages');
    }
}

<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Schema::create('labs_data', function (Blueprint $table) {
        //     $table->id();
        //     $table->timestamps();
        // });
        Schema::create('labs_data', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users','id')->onUpdate('cascade')->onDelete('cascade');
            $table->foreignId('session_id')->constrained('course_details','id')->onUpdate('cascade')->onDelete('cascade');
           // $table->foreignID('user_id')->constrained();
            $table->string('title');
            $table->text('Comment');
            $table->string('status');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('labs_data');
    }
};

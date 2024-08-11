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
        Schema::create('Enrolled_Students', function (Blueprint $table) {
            //$table->id();
            $table->foreignId('user_id')->constrained('users','id')->onUpdate('cascade')->onDelete('cascade');
            $table->foreignId('course_id')->constrained('courses')->onUpdate('cascade')->onDelete('cascade');
            
            //$table->foreign('user_id');
            //$table->foreign('cource_id');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('enrolleds');
    }
};

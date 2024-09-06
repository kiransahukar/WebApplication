<?php

namespace Database\Factories;

use App\Models\CourseDetails;
use App\Models\EnrolledStudents;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\LabsData>
 */
class LabsDataFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {   

        $userId = User::inRandomOrder()->first()->id;
        $sessionId = CourseDetails::inRandomOrder()->first()->id;
        return [
            'user_id' =>  $userId ,
            'session_id' => $sessionId ,
            
            'Comment'=>fake()->words(3, true),
            'title' => fake()->words(1, true),
            'status'=>fake()->randomElement(['Completed','Request'])
            // 'email' => fake()->unique()->safeEmail(),
            // 'email_verified_at' => now(),
            // 'password' => static::$password ??= Hash::make('password'),
            // 'remember_token' => Str::random(10),
        ];
    }
}

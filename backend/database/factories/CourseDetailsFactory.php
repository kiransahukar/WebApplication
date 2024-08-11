<?php

namespace Database\Factories;

use App\Models\Course;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\CourseDetails>
 */
class CourseDetailsFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            //'user_id' => User::factory(),
            'course_id' =>Course::inRandomOrder()->first()->id,
            'session_no'=>fake()->numberBetween(1,10),
            'session_name'=>fake()->words(3, true),
           // 'description' => fake()->paragraph(),
           // 'status'=>fake()->randomElement(['A','C','H','X'])
            // 'email' => fake()->unique()->safeEmail(),
            // 'email_verified_at' => now(),
            // 'password' => static::$password ??= Hash::make('password'),
            // 'remember_token' => Str::random(10),
        ];
    }
}

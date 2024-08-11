<?php

namespace Database\Factories;

use App\Models\Course;
use App\Models\EnrolledStudents;
use App\Models\User;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class EnrolledStudentsFactory extends Factory
{
    /**
     * The current password being used by the factory.
     */
    protected static ?string $password;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    // public function definition(): array
    // {
    //     return [
    //         'user_id' => User::inRandomOrder()->first('id'),
    //         'course_id' => Course::inRandomOrder()->first('id'),
    //     ];
    // }
    public function definition(): array
    {
        $userId = User::inRandomOrder()->first()->id;
        $courseId = Course::inRandomOrder()->first()->id;

        // Ensure no repeating users with the same course
        while (EnrolledStudents::where('user_id', $userId)->where('course_id', $courseId)->exists()) {
            $userId = User::inRandomOrder()->first()->id;
            $courseId = Course::inRandomOrder()->first()->id;
        }

        return [
            'user_id' => $userId,
            'course_id' => $courseId,
        ];
    }
    /**
     * Indicate that the model's email address should be unverified.
     */
    public function unverified(): static
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }
}

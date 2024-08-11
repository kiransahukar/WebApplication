<?php

namespace Database\Seeders;

use App\Models\Course;
use App\Models\CourseDetails;
use App\Models\User;
use App\Models\Ticket;
use App\Models\Enrolled;
use App\Models\EnrolledStudents;
use App\Models\LabsData;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::create([
            'name' => 'Admin',
            'email' => 'admin@app.com',
            'profession'=>'Admin',
            'password'=>bcrypt('password')
        ]);
       
        User::create([
            'name' => 'Staff',
            'email' => 'staff@app.com',
            'profession'=>'Staff',
            'password'=>bcrypt('password')
        ]);
        User::create([
            'name' => 'Student',
            'email' => 'student@app.com',
            'profession'=>'Student',
            'password'=>bcrypt('password')
        ]);


        // User::factory(10)->create();
         
        // Ticket::factory(50)->create();

        $user = User::factory(10)->create();

        Ticket::factory(50)
        ->recycle($user)
        ->create();


        Course::create([
            'course_name' => 'First Course',
        ]);
        Course::create([

            'course_name' => 'Second Course',

        ]);
        Course::create([

            'course_name' => 'Third Course',

        ]);
        Course::create([

            'course_name' => 'Fourth Course ',

        ]);
        Course::create([

            'course_name' => 'Fifth Course',

        ]);
        Course::create([

            'course_name' => 'Sixth Course',
        ]);


       CourseDetails::factory(20)->create();
       EnrolledStudents::factory(20)->create();
        
       LabsData::factory(30)->create();
        
        
    }
}

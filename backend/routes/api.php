<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\demo;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\TicketController;
use App\Http\Controllers\CourseControllers\CourseController;
use App\Http\Controllers\CourseControllers\AllCourseController;

use App\Http\Controllers\CourseControllers\CourseDetailsController;

use App\Http\Controllers\Enrolled\EnrolledStudentController;
use App\Http\Controllers\AuthorsController;
use App\Http\Controllers\AuthorTicketsController;
use App\Http\Controllers\FileController\FileController;
use App\Http\Controllers\LabsData\LabsDataController;
use App\Http\Controllers\UserController;
use App\Livewire\Actions\Logout;

use App\Models\Ticket;



Route::get('/profile', function() {
    return response()->json([
        'name'=>"Try",
        'email' => "Hello@try.com",
        'phone'=>1234567890,
        'address'=>"dobt ask"
    ],200);
});


Route::middleware('auth:sanctum')->get('/userData', function (Request $request) {
    return $request->user();
});

Route::post('/login',[AuthController::class, 'login']);
//Route::get('/logTry',[AuthController::class, 'logTry']);
//Route::post('/register',[AuthController::class, 'register']);

Route::middleware(['auth:sanctum'])->post('/logout',[AuthController::class, 'logout']);


Route::middleware(['auth:sanctum'])->group(function(){

    Route::apiResource('users',UserController::class);
    Route::put('users/{user}',[UserController::class,'replace']);
    Route::patch('users/{user}',[UserController::class,'update']);


    Route::apiResource('authors',AuthorsController::class);
    Route::apiResource('authors.tickets',AuthorTicketsController::class)->except(['update']);
    Route::put('authors/{author}/tickets/{ticket}',[AuthorTicketsController::class,'replace']);//put
    Route::patch('authors/{author}/tickets/{ticket}',[AuthorTicketsController::class,'update']);//patch
 
    
    Route::apiResource('tickets',TicketController::class)->except(['update']);
    Route::put('tickets/{tickets}',[TicketController::class,'replace']);
    Route::patch('tickets/{tickets}',[TicketController::class,'update']);
    
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
});

Route::middleware(['auth:sanctum'])->apiResource('courses',CourseController::class);
Route::middleware(['auth:sanctum'])->apiResource('courses.courseDetails',AllCourseController::class);

Route::middleware(['auth:sanctum'])->apiResource('courseDetails',CourseDetailsController::class);
Route::middleware(['auth:sanctum'])->patch('courseDetails',[CourseDetailsController::class,'update']);
Route::middleware(['auth:sanctum'])->delete('courseDetails',[CourseDetailsController::class,'destroy']);

Route::middleware(['auth:sanctum'])->apiResource('enrolledStudents',EnrolledStudentController::class);

Route::middleware(['auth:sanctum'])->apiResource('labsData',LabsDataController::class)->except(['update']);
Route::middleware(['auth:sanctum'])->patch('labsData',[LabsDataController::class,'update']);
Route::middleware(['auth:sanctum'])->put('labsData',[LabsDataController::class,'replace']);


Route::post('file',[FileController::class,'store']);
Route::get('/getfile/{filename}', [FileController::class, 'getFile']);



//Route::post('/file', [FileController::class, 'store'])->name('file');

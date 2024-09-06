<?php

use App\Http\Controllers\FileController\FileController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {

    return ['Laravel' => app()->version()];
});
// routes/web.php
Route::get('/csrf-token', function () {
    return response()->json(['csrfToken' => csrf_token()]);
});
//Route::post('/file', [FileController::class, 'store'])->name('file');
//Route::post('file',[FileController::class,'store']);
require __DIR__.'/auth.php';

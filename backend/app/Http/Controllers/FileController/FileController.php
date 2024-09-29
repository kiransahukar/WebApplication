<?php

namespace App\Http\Controllers\FileController;

use App\Http\Controllers\ApiController;
use App\Http\Controllers\Controller;
use App\Models\LabsData;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class FileController extends ApiController
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        // $request->validate([
        //     'file' => 'required|file|mimes:jpg,png,pdf,docx|max:2048',
        // ]);

        try {
            $uploadedFilePath = $request->file('file')->store('public/uploads');
            return $this->ok("sucess", $request->file->hashName());
        } catch (\Exception $e) {
            return $this->error('File upload failed. Please try again later.', 500);
        }
    }

    public function getFile($filename)
    {

        if (!Storage::exists('public/uploads/' . $filename)) {
            return $this->error('File not found.', 200);
        }


        $fileContents = Storage::get('public/uploads/' . $filename);

        $mimeType = Storage::mimeType('public/uploads/' . $filename);

        return response($fileContents, 200)->header('Content-Type', $mimeType);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    // public function destroy(string $filename)
    // {
    //     $filePath = 'public/uploads/'.$filename;
        
    //     if (!Storage::exists($filePath)) {
    //         return $this->error('File not found.', 404);
    //     }
    
    //     try {
    //         Storage::delete($filePath);
    //         return $this->ok('File deleted successfully.');
    //     } catch (\Exception $e) {
    //         return $this->error('File deletion failed. Please try again later.', 500);
    //     }
    // }


public function destroy(string $filename)
{
    $filePath = 'public/uploads/' . $filename;
    
    if (!Storage::exists($filePath)) {
        return $this->error('File not found.', 404);
    }

    try {
        Storage::delete($filePath);
        
        LabsData::where('title', $filename)->delete();
        
        return $this->ok('File deleted successfully.');
    } catch (\Exception $e) {
        return $this->error('File deletion failed. Please try again later.', 500);
    }
}

}

<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;


class demo extends Controller
{
    //

    public function lol() {

        return response()->json([
            'message'=>" this php"
        ]);
    }
}

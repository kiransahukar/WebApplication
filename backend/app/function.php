<?php

function dd($value)
{
 
    // echo "<pre>";
    // var_dump($value);
    // echo "</pre>";


    return response()->json(var_dump($value));
    die();
}
<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Traits\ApiResponses;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Permissions\Abilities;

class AuthController extends Controller
{

    use ApiResponses;


    public function logTry(Request $request) {

            return response()->json($request);

    }
    public function login(LoginRequest $request)
    {
        //dd($request);
        $request->validated($request->all());

        //    if(!Auth::attempt($request->only('email','password'))){

        //         return $this->error("unauthorised",401);
        //    }
        if (!Auth::attempt($request->only('email', 'password'))) {
            return $this->error("unauthorised", 401);
        }
        $user = User::firstWhere('email', $request->email);



        return $this->ok(
            'Authenticated',
            //  ['csrfToken' => $user->createToken('API token for'.$user->email)->plainTextToken]
            [
                'type' => $user->profession,
                'userId'=>$user->id,
                'token' => $user->createToken(
                    'API token for' . $user->email,
                     //Abilities::getAbilities($user),
                    ['*'],
                      now()->addMonth())->plainTextToken,
                // 'token'=>$user->remember_token

            ]
        );
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return $this->ok('logged Out');
    }
    public function register()
    {

        return $this->error("register", 401);
    }

    public function getUserDetails() {
        $user = auth();
        return $user;
    }
}

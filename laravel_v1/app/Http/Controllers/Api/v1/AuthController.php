<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class AuthController extends Controller
{
    public function user(Request $request)
    {
        return $request->user();
    }

    public function login(Request $request)
    {
        $user = User::where('email', $request['email'])->first();

        my_abort_errors_if(
            is_null($user),
            [['Invalid credentials.']]
        );

        $passwordCheck = $user->checkPassword($request['password']);

        my_abort_errors_if(
            count($passwordCheck) !== 0,
            $passwordCheck
        );

        return $user->createToken('User-Token', $user->roles)->accessToken;
    }
}

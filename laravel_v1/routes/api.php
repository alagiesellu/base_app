<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('login', [\App\Http\Controllers\Api\v1\AuthController::class, 'login']);

Route::middleware('auth:api')->group(function () {

    Route::get('user', [\App\Http\Controllers\Api\v1\AuthController::class, 'user']);
    Route::post('logout', [\App\Http\Controllers\Api\v1\AuthController::class, 'logout']);

    Route::prefix('get')->group(function () {
        Route::get('configs', [\App\Http\Controllers\Api\v1\GetController::class, 'configs']);
    });

    Route::patch('users/password', [\App\Http\Controllers\Api\v1\UserController::class, 'password']);
    Route::apiResource('users', \App\Http\Controllers\Api\v1\UserController::class);
});

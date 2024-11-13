<?php

use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->group(function (){
    Route::post('/logout', [AuthController::class, 'logout']);
});


// Rota de registo
Route::post('signup', [AuthController::class, 'signup']);

// Rota de login
Route::post('login', [AuthController::class, 'login']);

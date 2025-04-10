<?php

use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('register',[AuthController::class,'register']);
Route::post('login',[AuthController::class,'login']);
Route::post('logout',[AuthController::class,'logout'])->middleware('auth:sanctum');


use App\Http\Controllers\JobController;

Route::get('/jobs', [JobController::class, 'index']); 

Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('/jobs', [JobController::class, 'store']);
});

use App\Http\Controllers\CompanyController;
Route::middleware('auth:sanctum')->post('/companies', [CompanyController::class, 'store']);


use App\Http\Controllers\ApplicationController;
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/applications', [ApplicationController::class, 'store']);
    Route::get('/applications/user', [ApplicationController::class, 'index']);
});

// إذا كنت تستخدم Sanctum للمصادقة عبر API
Route::middleware('auth:sanctum')->post('/apply-job/{jobId}', [JobController::class, 'applyForJob']);

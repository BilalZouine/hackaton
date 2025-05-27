<?php

use App\Http\Controllers\FacturesController;
use App\Http\Controllers\LocauxController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\ReservationController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});
Route::get('/locaux', [LocauxController::class, 'index']);
Route::get('/locaux/{id}', [LocauxController::class, 'show']);
Route::post('/locaux', [LocauxController::class, 'store']);
Route::put('/locaux/{id}', [LocauxController::class, 'update']);
Route::delete('/locaux/{id}', [LocauxController::class, 'destroy']);

Route::get('/reservations', [ReservationController::class, 'index']);
Route::get('/reservations/{id}', [ReservationController::class, 'show']);
Route::post('/reservations', [ReservationController::class, 'store']);
Route::put('/reservations/{id}', [ReservationController::class, 'update']);
Route::delete('/reservations/{id}', [ReservationController::class, 'destroy']);

Route::get('/factures', [FacturesController::class, 'index']);
Route::get('/factures/{id}', [FacturesController::class, 'show']);
Route::post('/factures', [FacturesController::class, 'store']);
Route::put('/factures/{id}', [FacturesController::class, 'update']);
Route::delete('/factures/{id}', [FacturesController::class, 'destroy']);

Route::post('/login', [LoginController::class, 'login']);
Route::post('/register', [LoginController::class, 'register']);
Route::post('/logout', [LoginController::class, 'logout']);

Route::post('/locaux/status/{id}', [LocauxController::class, 'toggleStatus']);

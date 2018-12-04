<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Route::get('/action', ['uses' => 'MainController@action', 'as' => 'action']);
Route::get('/' , ['uses' => 'MainController@index', 'as' => 'index']);
Route::post('/data', ['uses' => 'MainController@data', 'as' => 'data']);

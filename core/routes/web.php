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
Route::get('/' , ['uses' => 'MainController@index', 'as' => 'index']);

Route::post('/action', ['uses' => 'MainController@action', 'as' => 'action']);

Route::get('/parametres', ['uses' => 'MainController@param', 'as' => 'param']);

Route::post('/parametres/modification', ['uses' => 'MainController@ecritParamBio', 'as' => 'ecritParamBio']);

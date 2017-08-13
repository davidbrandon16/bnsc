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

Route::get('/', function () {
    return view('welcome');
});
Route::get("/register",function(){
    return view('register');
});

Route::post('/register',"UserController@insert");

Route::get('/storage/images/{filename}',function($filename){
    $path = storage_path().'\app/images/'.$filename;
    $file = File::get($path);
    $type = File::mimeType($path);

    $response = Response::make($file, 200);
    $response->header("Content-Type", $type);
    return $response;
});

Route::get('/login',function(){
    return view("login");
    return view("login");
});
Route::post('/login','UserController@login');
Route::get('/logout','UserController@logout');
Route::get('/tetris',function(){
    return view('tetris');
});

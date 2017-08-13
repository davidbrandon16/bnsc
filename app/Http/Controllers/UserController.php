<?php

namespace App\Http\Controllers;

use App\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    //
    public function insert(Request $request)
    {

        $this->validate($request,[
            'name'=>'required',
            'username'=>'required',
            'email'=>'required|email',
            'dob' => 'required|date',
            'password'=>'required',
            'phoneNumber'=>'required|Numeric',
            'pp'=>'required|mimes:jpeg,bmp,png'
        ]);
        $path = $request->file('pp')->store('images');

        $user = User::create([
            'name'=>$request->input('name'),
            'username'=>$request->input("username"),
            'password'=>md5($request->input("password")),
            'email'=>$request->input("email"),
            'phoneNumber'=>$request->input('phoneNumber'),
            'pp'=>$path,
            'dob'=>$request->input('dob')
        ]);

        return view('login')->with('message',"success register ".$user->username);

    }
    public function login(Request $request){
        $this->validate($request,[
            'username'=>"required",
            'password' =>"required",
        ]);
        $user = User::where('username',$request->input('username'))->orWhere('email',$request->input('username'))->where('password',md5($request->input('password')))->first();

        if($user != null) {
            Auth::login($user, true);
            return redirect('/');
        }
        else {
            //dd(redirect()->back()->with("errormsg","Username or password don't match"));
            return redirect()->back()->with("errormsg","Username or password don't match");
        }
    }
    public function logout() {
        Auth::logout();
        return redirect('/');
    }

}

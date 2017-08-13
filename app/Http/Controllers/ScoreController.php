<?php

namespace App\Http\Controllers;

use App\Score;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ScoreController extends Controller
{
    //
    public function Insert(Request $request){
        Score::create([
            "score"=>$request->input('score'),
            'user_id'=>Auth::user()->id,
            'type'=>$request->input('type')
        ]);
        return "success";
    }
    public function tetris(){
        $scores = Score::Where("type","tetris")->orderBy("score","desc")->limit(10)->get();
        foreach($scores as $score){
            $score->user = User::find($score->user_id)->name;
        }
        return view("tetris")->with(compact(['scores']));
    }
}

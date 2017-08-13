@extends('_master')
@section('content')
    <div class="content-game">
        <div class="content-game-content">
           <canvas height="400" width="400" id="tetris_canvas">

           </canvas>
           <div>
               <button class="button" id="btnPlay">Play</button>
           </div>
        </div>
        <div class="content-game-leaderboard">
            <div class="content-game-leaderboard-status">
                <h1 id="status"> Play</h1>
                <span>Score : </span><span id="score">0</span>
            </div>
            <div class="content-game-leaderboard-score">

            </div>
        </div>

    </div>
@endsection
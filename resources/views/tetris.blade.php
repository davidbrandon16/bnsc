@extends('_master')
@section('content')
    {{csrf_field()}}
    <div class="content-game">
        <div class="content-game-content">
           <canvas height="400" width="400" id="tetris_canvas">

           </canvas>
           <div>
               <button class="button" id="btnPlay">Play</button>
               <button class="button" id="btnReset" style="display: none">Reset</button>
           </div>
        </div>
        <div class="content-game-leaderboard">
            <div class="content-game-leaderboard-status">
                <h1 id="status"> Play</h1>
                <span>Score : </span><span id="score">0</span>
            </div>
            <div class="content-game-leaderboard-score">
                @if(count($scores)>0)
                    @foreach($scores as $score)
                        <div>
                            <span>{{$score->user}}</span>
                            <span>{{$score->score}}</span>
                        </div>
                    @endforeach
                @endif
            </div>
        </div>

    </div>
@endsection
@extends('_master')

@section('content')

    <div class="register-form">

        @if(session('message'))
            <div class="alert-success">
                {{session('message')}}
            </div>
        @elseif(count($errors)>0)
            @foreach($errors->all() as $error)
                <div class="alert-danger">
                    {{$error}}
                </div>
            @endforeach
        @elseif(session('errormsg'))
            <div class="alert-danger">
                {{session('errormsg')}}
            </div>
        @endif
        <div class="register-form-content">
            <form action="{{url('/login')}}" method="post">
                {{csrf_field()}}
                <label for="username">Username Or Email</label>
                <input type="text" name="username" required>
                <label for="password">Password</label>
                <input type="password" name="password" required>
                <input type="submit" value="Login">
            </form>
        </div>
    </div>
@endsection
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Indonesia Game Portal</title>
    <link rel="stylesheet" href="{{asset("css/style.css")}}">
    <script src="{{asset("js/jquery-3.2.1.js")}}"></script>
    <script src="{{asset("js/script.js")}}"></script>
    @yield('script')
</head>
<body>
    <div class="left-menu">
        <span>Welcome,
        @if(\Illuminate\Support\Facades\Auth::user())
            {{\Illuminate\Support\Facades\Auth::user()->name}}
        @else
            Guest
        @endif
        </span>
        <div class="menu-item">
            <a href="{{url('/')}}">Home</a>
        </div>
        @if(\Illuminate\Support\Facades\Auth::user())
            <div class="menu-item">
                <a href="{{url('/logout')}}">Logout</a>
            </div>
            <div class="menu-item">
                <a href="{{url('/tetris')}}">Tetris</a>
            </div>

        @else
            <div class="menu-item">
                <a href="{{url('/login')}}">Login</a>
            </div>
            <div class="menu-item">
                <a href="{{url('/register')}}">Register</a>
            </div>

        @endif

    </div>
    <div class="content">
        @yield('content')

        <div class="content-footer">
            <span>&copy David Brandon W</span>
        </div>
    </div>
</body>
</html>
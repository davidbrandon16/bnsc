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
</head>
<body>
    <div class="left-menu">
        <div class="menu-item">
            <a href="{{url('/')}}">Home</a>
        </div>
        <div class="menu-item">
            <a href="{{url('/register')}}">Register</a>
        </div>
        <div class="menu-item">
            <a href="{{url('/tetris')}}">Tetris</a>
        </div>
    </div>
    <div class="content">
        @yield('content')

        <div class="content-footer">
            <span>&copy David Brandon W</span>
        </div>
    </div>
</body>
</html>
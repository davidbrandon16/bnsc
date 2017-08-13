@extends('_master')

@section('content')
    <div class="register-form">
        @if(count($errors)>0)
            @foreach($errors->all() as $error)
                <div class="alert-danger">
                    {{$error}}
                </div>
            @endforeach
        @endif
        <div class="register-form-content">
            <form action="{{url("/register")}}" method="post" enctype="multipart/form-data">
                {{csrf_field()}}
                <label for="name">Name</label>
                <input type="text" name="name" required value="{{old('name')}}">
                <label for="username">Username</label>
                <input type="text" name="username" required value="{{old('username')}}">
                <label for="email">Email</label>
                <input type="text" name="email" required value="{{old("email")}}">
                <label for="password">Password</label>
                <input type="password" name="password" required >
                <label for="dob">Date Of Birth</label>
                <input type="date" name="dob" required value="{{old('dob')}}">
                <label for="phoneNumber">Phone Number</label>
                <input type="text" name="phoneNumber" required value="{{old("phoneNumber")}}">
                <label for="pp">Profile Picture</label>
                <input type="file" name="pp">
                <input type="submit" value="register">
            </form>
        </div>
    </div>
@endsection
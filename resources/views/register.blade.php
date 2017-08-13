@extends('_master')

@section('content')
    <div class="register-form">
        <div class="register-form-content">
            <form action="">
                <label for="name">Name</label>
                <input type="text" name="name" required>
                <label for="username">Username</label>
                <input type="text" name="username" required>
                <label for="email">Email</label>
                <input type="text" name="email" required>
                <label for="password">Password</label>
                <input type="password" name="password" required>
                <label for="dob">Date Of Birth</label>
                <input type="date" name="dob" required >
                <label for="phoneNumber">Phone Number</label>
                <input type="text" name="phoneNumber" required>
                <label for="pp">Profile Picture</label>
                <input type="file" name="pp" >
                <input type="submit">
            </form>
        </div>
    </div>
@endsection
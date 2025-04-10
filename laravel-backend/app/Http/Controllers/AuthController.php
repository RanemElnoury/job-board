<?php

namespace App\Http\Controllers;

use App\Http\Requests\AuthLoginRequest;
use App\Http\Requests\AuthRegisterRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(AuthRegisterRequest $request)
    {
        // الـ validation سيتم تلقائيًا هنا باستخدام Form Request
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'type' => $request->type
        ]);

        $token = $user->createToken('auth_Token')->plainTextToken;

        return response()->json([
            'message' => 'User Registered Successfully',
            'user' => $user,
            'token' => $token,
            'redirect' => $user->type === 'company' ? 'company-form' : 'applicant-form'
        ], 201);
    }

    public function login(AuthLoginRequest $request)
    {
        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json([
                'message' => 'Invalid email or password',
            ], 401);
        }
    
        $user = User::where('email', $request->email)->firstOrFail();
        $token = $user->createToken('auth_Token')->plainTextToken;
    
        return response()->json([
            'message' => 'Login Successful',
            'user' => $user,
            'token' => $token,
            'redirect' => $user->type === 'company' ? 'company-form' : 'applicant-form'
        ], 200);
    }
    
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Logout Successful',
        ], 200);
    }
}

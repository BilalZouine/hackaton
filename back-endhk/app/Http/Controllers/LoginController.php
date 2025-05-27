<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Session;
use App\Models\User;

class LoginController extends Controller
{
    // ✅ Inscription d’un utilisateur
    public function register(Request $request)
{
    $validated = $request->validate([
        'name' => 'required',
        'email' => 'required|email|unique:users',
        'password' => 'required',
    ]);

    $validated['password'] = bcrypt($validated['password']);
    

    $chars = '';
    for ($i = 0; $i < 3; $i++) {
        $chars .= chr(random_int(65, 90));  // random uppercase letter A-Z
    }
    $validated['qr_code'] = random_int(10000000, 99999999) . '.' . $chars;


    $user = User::create($validated);

    Auth::login($user); 


    return response()->json([
        'token' => $user->createToken('auth_token' , ['api'] , now()->addDays(1))->plainTextToken,
        'user' => $user,
        'message' => 'Registration successful'
    ], 200);
}


    // ✅ Connexion d’un utilisateur
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if (!Auth::attempt($credentials)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        $user = Auth::user(); 

        return response()->json([
            'token' => $user->createToken('auth_token' , ['api'] , now()->addDays(1))->plainTextToken,
            'user' => $user,
            'message' => 'Login successful'
        ], 200);
    }

    // ✅ Déconnexion d’un utilisateur
    public function logout(Request $request)
    {
        Auth::logout();
        Session::flush();

        return response()->json(['message' => 'Logged out'], 200);
    }
}

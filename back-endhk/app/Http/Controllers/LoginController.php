<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Session;
use App\Models\User;
use Illuminate\Database\Eloquent\Builder;

class LoginController extends Controller
{
    // ✅ Inscription d’un utilisateur

public function register(Request $request)
{
    $user = User::create([
        'name' => $request->name,
        'email' => $request->email,
        'password' => Hash::make($request->password),
    ]);

    // Générer le QR Code
    $result = Builder::create()
        ->data("USER_ID:{$user->id},EMAIL:{$user->email}")
        ->size(300)
        ->build();

    $qrPath = "qr_codes/user_{$user->id}.png";
    $result->saveToFile(public_path($qrPath));

    $user->update(['qr_code_path' => $qrPath]);

    return response()->json(['message' => 'Inscription réussie', 'qr_code' => $qrPath]);
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

<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Laravel\Socialite\Facades\Socialite;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class GoogleController extends Controller
{
    public function redirectToGoogle()
    {
        return Socialite::driver('google')->redirect();
    }

    public function handleGoogleCallback()
    {
        $user = Socialite::driver('google')->stateless()->user();
        $this->findOrCreateUser($user, 'google');
        Auth::login($user);

        return redirect()->intended('/dashboard');
    }

    public function findOrCreateUser($googleUser, $provider)
    {
        $user = User::where('email', $googleUser->getEmail())->first();

        if (!$user) {
            $user = User::create([
                'name' => $googleUser->getName(),
                'email' => $googleUser->getEmail(),
                'provider' => $provider,
                'provider_id' => $googleUser->getId(),
                'password' => Hash::make(uniqid()),
            ]);
        }
        return $user;
    }
}
?>
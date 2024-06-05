<?php
namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Kreait\Firebase\Factory;
use Kreait\Firebase\Auth;
use Illuminate\Support\Facades\Auth as LaravelAuth;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FirebaseController extends Controller
{
    protected $auth;

    public function __construct()
    {
        $factory = (new Factory)->withServiceAccount(config('firebase.credentials.file'));
        $this->auth = $factory->createAuth();
    }

    public function redirectToGoogle()
    {
        // La redirección a la autenticación de Google será manejada por Firebase en el frontend.
        return Inertia::render('Auth/login');
    }

    public function handleGoogleCallback(Request $request)
    {
        $idToken = $request->input('idToken');
        $verifiedIdToken = $this->auth->verifyIdToken($idToken);
        $firebaseUserId = $verifiedIdToken->claims()->get('sub');

        $firebaseUser = $this->auth->getUser($firebaseUserId);
        $email = $firebaseUser->email;

        $user = User::where('email', $email)->first();

        if ($user) {
            // Si el usuario ya existe, redirigir a la página de inicio de sesión        
            LaravelAuth::login($user);

            return Inertia::render('Welcome');
        } else {
            // Si el usuario no existe, crearlo
            $user = User::create([
                'name' => $firebaseUser->displayName,
                'surname' => '',
                'email' => $email,
                'password' => Hash::make(uniqid()), // Puedes usar una contraseña generada aleatoriamente
            ]);
        

        // Iniciar sesión con el usuario recién creado
        LaravelAuth::login($user);
        return Inertia::render('Welcome');
        }
    }
}


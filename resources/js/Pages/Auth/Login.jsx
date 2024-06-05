import { useEffect } from 'react';
import Checkbox from '@/Components/Checkbox';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from 'react-bootstrap';
import { usePage } from '@inertiajs/react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { router } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { props } = usePage();
    const { message } = props;
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('login'));
    };

    useEffect(() => {
        const firebaseConfig = {
            apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
            authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
            projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
            storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
            messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
            appId: import.meta.env.VITE_FIREBASE_APP_ID,
        };

        if (!firebase.apps.length) {
            console.log(firebaseConfig);
            firebase.initializeApp(firebaseConfig);
        }
    }, []);

    const signInWithGoogle = () => {
        const provider = new firebase.auth.GoogleAuthProvider();

        firebase.auth()
            .signInWithPopup(provider)
            .then((result) => {
                console.log(document.querySelector('meta[name="csrf-token"]'));
                result.user.getIdToken().then((idToken) => {
                    fetch('/auth/google/callback', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                        },
                        body: JSON.stringify({ idToken })
                    }).then(response => response.json())
                        .then(data => {
                            if (data.redirect) {
                                window.location.href = data.redirect;
                            }
                            router.get('/');
                        });
                });
            }).catch((error) => {
                console.error(error);
            });
    };

    return (
        <GuestLayout>
            <Head title="Log in" />
            {message && <div className="alert alert-warning">{message}</div>}
            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Contraseña" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="current-password"
                        onChange={(e) => setData('password', e.target.value)}
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="block mt-4">
                    <label className="flex items-center">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) => setData('remember', e.target.checked)}
                        />
                        <span className="ms-2 text-sm text-gray-600">Recordarme</span>
                    </label>
                </div>

                <div className="flex items-center justify-end mt-4">
                    {canResetPassword && (
                        <Link
                            href={route('password.request')}
                            className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            ¿Has olvidado tu contraseña?
                        </Link>
                    )}

                    <PrimaryButton className="ms-4" disabled={processing}>
                        Iniciar sesión
                    </PrimaryButton>
                    <Link href={route('register')} className="ms-4">
                        <PrimaryButton className="ms-4">
                            Registrarte
                        </PrimaryButton>
                    </Link>
                    <Button className="ms-4" onClick={signInWithGoogle}>
                        Google
                    </Button>
                </div>
            </form>
        </GuestLayout>
    );
}

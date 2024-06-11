import { useEffect } from "react";
import Checkbox from "@/Components/Checkbox";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";
import { Button } from "react-bootstrap";
import { usePage } from "@inertiajs/react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { router } from "@inertiajs/react";
import avatar from "../../../img/avatar.webp";
import Navigation from "@/Components/Navigation";
import google from "../../../img/googleç.webp";
import Footer from "@/Components/Footer";
export default function Login({ status, canResetPassword, user }) {
  const { props } = usePage();
  const { message } = props;
  const { data, setData, post, processing, errors, reset } = useForm({
    email: "",
    password: "",
    remember: false,
  });
  useEffect(() => {
    return () => {
      reset("password");
    };
  }, []);
  const submit = (e) => {
    e.preventDefault();
    post(route("login"));
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
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        console.log(document.querySelector('meta[name="csrf-token"]'));
        result.user.getIdToken().then((idToken) => {
          fetch("/auth/google/callback", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-CSRF-TOKEN": document
                .querySelector('meta[name="csrf-token"]')
                .getAttribute("content"),
            },
            body: JSON.stringify({ idToken }),
          })
            .then((response) => response.json())
            .then((data) => {
              if (data.redirect) {
                window.location.href = data.redirect;
              }
              router.get("/");
            });
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <>
    <GuestLayout>
      
      <Navigation user={props.user} /> <Head title="Log in" />
      {message && <div className="">{message}</div>}
      {status && <div className="">{status}</div>}
      <div className="flex flex-row justify-evenly mt-10 mb-20">
        
        <div className="bg-gradient-to-br from-primary to-secondary w-80 rounded-3xl flex flex-col justify-center items-center">
          
          <div>
            
            <img width={200} src={avatar} alt="" />
          </div>
          <div>
            
            <h2 className="text-black text-3xl font-bold">
              Únete a nosotros
            </h2>
          </div>
          <div>
            
            <h4 className="text-black">Para estar al día de todo</h4>
          </div>
        </div>
        <form onSubmit={submit} className="w-90 mt-4 text-center">
          
          <div>
            
            <h2 className="text-3xl font-bold">Bienvenido de nuevo</h2>
            <div className="mt-4">
              
              <InputLabel
                htmlFor="email"
                value="Email"
                className="hidden"
              />
              <TextInput
                id="email"
                type="email"
                name="email"
                value={data.email}
                className="mt-1 block w-full mx-auto px-3 py-1 rounded-2xl text-black"
                placeholder="Email..."
                autoComplete="username"
                isFocused={true}
                onChange={(e) => setData("email", e.target.value)}
              />
              <InputError message={errors.email} className="mt-2" />
            </div>
            <div className="mt-4">
              
              <InputLabel
                htmlFor="password"
                value="Contraseña"
                className="hidden"
              />
              <TextInput
                id="password"
                type="password"
                name="password"
                placeholder="Contraseña..."
                value={data.password}
                className="mt-1 block w-full mx-auto px-3 py-1 rounded-2xl text-black"
                autoComplete="current-password"
                onChange={(e) => setData("password", e.target.value)}
              />
              <InputError message={errors.password} className="mt-2" />
            </div>
            <div className="block mt-4">
              
              <label className="flex">
                
                <Checkbox
                  name="remember"
                  checked={data.remember}
                  onChange={(e) => setData("remember", e.target.checked)}
                />
                <span className="ml-3">Recordarme</span>
              </label>
            </div>
            <div className="mt-4">
              
              {canResetPassword && (
                <Link
                  href={route("password.request")}
                  className="text-blue-500"
                >
                  
                  ¿Has olvidado tu contraseña?
                </Link>
              )}
            </div>
            <div className="mt-4">
              
              <PrimaryButton
                className="rounded-2xl mb-2 bg-primary p-4 py-1 font-bold text-black"
                disabled={processing}
              >
                
                Iniciar sesión
              </PrimaryButton>
            </div>
            <div className="flex items-center mt-4">
              
              <span className="flex-grow border-t border-white-400"></span>
              <span className="mx-2 text-white">O también</span>
              <span className="flex-grow border-t border-white-400"></span>
            </div>
            <div className="mt-4 flex justify-center">
              
              <PrimaryButton
                className="rounded-2xl mb-2 bg-primary p-4 py-1 font-bold text-black flex items-center !letter-spacing-1"
                onClick={signInWithGoogle}
              >
                
                <span>
                  <img
                    src={google}
                    alt="logo-google"
                    width={20}
                    className="mr-2"
                  />
                </span>
                Google
              </PrimaryButton>
              <Link href={route("register")} className="w-40">
                
                <PrimaryButton className="rounded-2xl mb-2 bg-primary p-4 py-1 font-bold text-black">
                  
                  Registrarse
                </PrimaryButton>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </GuestLayout>
      <Footer />
      </>
  );
}

import { useEffect, useState } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import Navigation from '@/Components/Navigation';

export default function Register({ user }) {
  const { auth } = usePage().props;
  const { data, setData, post, processing, errors, reset } = useForm({
    name: '',
    surname: '',
    phone: '',
    email: '',
    password: '',
    password_confirmation: '',
    role: '',
  });

  const [phoneError, setPhoneError] = useState('');

  useEffect(() => {
    return () => {
      reset('password', 'password_confirmation');
    };
  }, []);

  const validatePhone = (phone) => {
    const phoneRegex = /^\d{1,11}$/;
    const maxIntValue = 2147483647;

    if (!phoneRegex.test(phone)) {
      setPhoneError('El número de teléfono debe ser un número de hasta 11 dígitos.');
    } else if (parseInt(phone, 10) > maxIntValue) {
      setPhoneError(`El número de teléfono debe ser menor a ${maxIntValue}.`);
    } else {
      setPhoneError('');
    }
  };

  const handlePhoneChange = (e) => {
    const phone = e.target.value;
    setData('phone', phone);
    validatePhone(phone);
  };

  const submit = (e) => {
    e.preventDefault();
    if (phoneError) {
      return;
    }
    post(route('register'));
  };

  return (
    <GuestLayout>
      <Head title="Register" />
      <Navigation user={user} />
      <div className="flex flex-col items-center mt-10 mb-20">
        <div className="bg-gradient-to-br from-primary to-secondary w-80 rounded-3xl flex flex-col justify-center items-center p-6">
          <div>
            <h2 className="text-black text-3xl font-bold">Regístrate</h2>
          </div>
        </div>
        <form onSubmit={submit} className="w-90 mt-4 text-center">
          <div className="mt-4">
            <InputLabel htmlFor="name" value="Nombre" className="hidden" />
            <TextInput
              id="name"
              name="name"
              value={data.name}
              className="mt-1 block w-full mx-auto px-3 py-1 rounded-2xl text-black"
              autoComplete="name"
              isFocused={true}
              onChange={(e) => setData('name', e.target.value)}
              placeholder="Nombre..."
              required
            />
            <InputError message={errors.name} className="mt-2" />
          </div>
          <div className="mt-4">
            <InputLabel htmlFor="surname" value="Apellidos" className="hidden" />
            <TextInput
              id="surname"
              name="surname"
              value={data.surname}
              className="mt-1 block w-full mx-auto px-3 py-1 rounded-2xl text-black"
              autoComplete="surname"
              onChange={(e) => setData('surname', e.target.value)}
              placeholder="Apellidos..."
              required
            />
            <InputError message={errors.surname} className="mt-2" />
          </div>
          <div className="mt-4">
            <InputLabel htmlFor="phone" value="Teléfono" className="hidden" />
            <TextInput
              id="phone"
              name="phone"
              value={data.phone}
              className="mt-1 block w-full mx-auto px-3 py-1 rounded-2xl text-black"
              autoComplete="phone"
              onChange={handlePhoneChange}
              placeholder="Teléfono..."
              required
            />
            {phoneError && <InputError message={phoneError} className="mt-2" />}
            <InputError message={errors.phone} className="mt-2" />
          </div>
          <div className="mt-4">
            <InputLabel htmlFor="email" value="Email" className="hidden" />
            <TextInput
              id="email"
              type="email"
              name="email"
              value={data.email}
              className="mt-1 block w-full mx-auto px-3 py-1 rounded-2xl text-black"
              autoComplete="username"
              onChange={(e) => setData('email', e.target.value)}
              placeholder="Email..."
              required
            />
            <InputError message={errors.email} className="mt-2" />
          </div>
          <div className="mt-4">
            <InputLabel htmlFor="password" value="Contraseña" className="hidden" />
            <TextInput
              id="password"
              type="password"
              name="password"
              value={data.password}
              className="mt-1 block w-full mx-auto px-3 py-1 rounded-2xl text-black"
              autoComplete="new-password"
              onChange={(e) => setData('password', e.target.value)}
              placeholder="Contraseña..."
              required
            />
            <InputError message={errors.password} className="mt-2" />
          </div>
          <div className="mt-4">
            <InputLabel htmlFor="password_confirmation" value="Confirma tu Contraseña" className="hidden" />
            <TextInput
              id="password_confirmation"
              type="password"
              name="password_confirmation"
              value={data.password_confirmation}
              className="mt-1 block w-full mx-auto px-3 py-1 rounded-2xl text-black"
              autoComplete="new-password"
              onChange={(e) => setData('password_confirmation', e.target.value)}
              placeholder="Confirma tu Contraseña..."
              required
            />
            <InputError message={errors.password_confirmation} className="mt-2" />
          </div>

          {user && user['role'] === 'admin' && (
            <div className="mt-4">
              <InputLabel htmlFor="role" value="Rol" className="hidden" />
              <select
                id="role"
                name="role"
                value={data.role}
                className="mt-1 block w-full mx-auto px-3 py-1 rounded-2xl text-black"
                onChange={(e) => setData('role', e.target.value)}
                required
              >
                <option value="">Selecciona un rol</option>
                <option value="user">Usuario</option>
                <option value="admin">Administrador</option>
              </select>
              <InputError message={errors.role} className="mt-2" />
            </div>
          )}

          <div className="flex items-center justify-end mt-4">
            <Link
              href={route('login')}
              className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              ¿Ya tienes una cuenta?
            </Link>
            <PrimaryButton className="ms-4 rounded-2xl mb-2 bg-primary p-4 py-1 font-bold text-black" disabled={processing || phoneError}>
              Registrar
            </PrimaryButton>
          </div>
        </form>
      </div>
    </GuestLayout>
  );
}

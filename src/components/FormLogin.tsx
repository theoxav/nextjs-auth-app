import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import 'react-toastify/dist/ReactToastify.css';

interface FormData {
  email: string;
  password: string;
}

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Ce champs est requis' })
    .email("L'email n'est pas valide"),
  password: z
    .string()
    .min(6, { message: 'Le mot de passe doit faire 6 caractères minimum' }),
});

export default function FormLogin() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await signIn('credentials', {
        email: values.email,
        password: values.password,
        redirect: false,
      });

      if (!response?.error) {
        router.push('/dashboard');
      }
      toast.success('Connexion réussie');
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <form
        className="max-w-[800px] flex flex-col gap2 bg-salte-50 p-5 rounded-md shadow-md"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label className="text-slate-900">Email</label>
        <input
          type="email"
          {...register('email')}
          className="h-10 border border-slate-900 p-4 rounded-md"
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}

        <label className="text-slate-900">Mot de passe</label>
        <input
          type="password"
          {...register('password')}
          className="h-10 border border-slate-900 p-4 rounded-md"
        />
        {errors.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}

        <button
          type="submit"
          className="bg-gray-600 px-3 py-1.5 text-white my-3 rounded-md hover:bg-gray-700"
        >
          Connexion
        </button>
        <a
          href="#"
          onClick={() => router.push('/register')}
          className="text-red-500 hover:text-red-600"
        >
          Pas de compte ? Inscrivez-vous
        </a>
      </form>
    </>
  );
}

import { PasswordInput, TextInput } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import { auth } from '../utils/Firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

const SignIn = () => {
  const signInForm = useRef<HTMLFormElement>(null);
  const nav = useNavigate();

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const email = signInForm.current?.email.value;
      const password = signInForm.current?.password.value;
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      console.log({ user });
      signInForm.current?.reset();
      nav('/');
      console.log(auth.currentUser?.displayName);
    } catch (error: any) {
      alert(error.code);
    }
  };

  return (
    <div className=" h-screen flex items-center justify-center">
      <form
        onSubmit={e => onSubmitHandler(e)}
        ref={signInForm}
        className=" border-2 rounded-lg shadow-md p-7 w-[400px]"
      >
        <h1 className="text-2xl font-bold mb-2">Sign In</h1>
        <hr className="" />
        <TextInput
          name="email"
          placeholder="youremail@gmail.com"
          className=" mt-3 mb-2"
        />
        <PasswordInput
          name="password"
          placeholder="enter your password"
          className=" mt-3"
        />
        <div className=" flex gap-1 items-center mt-2">
          <div className=" text-sm">Don't have an account?</div>
          <span
            className=" cursor-pointer text-blue-800"
            onClick={() => {
              nav('/signUp');
            }}
          >
            Register
          </span>
        </div>
        <button
          type="submit"
          className=" bg-black text-white py-2 w-full rounded-md mt-3"
        >
          Sign In
        </button>
      </form>
    </div>
  );
};

export default SignIn;

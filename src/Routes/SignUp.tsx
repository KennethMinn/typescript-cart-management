import { PasswordInput, TextInput } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import { auth } from '../utils/Firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

const SignUp = () => {
  const signUpForm = useRef<HTMLFormElement>(null);
  const nav = useNavigate();
  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const userName = signUpForm.current?.displayName.value;
      const email = signUpForm.current?.email.value;
      const password = signUpForm.current?.password.value;
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (user) {
        updateProfile(user, {
          displayName: userName,
        });
      }
      signUpForm.current?.reset();
      nav('/signIn');
      console.log(user);
    } catch (error: any) {
      alert(error.code);
    }
  };

  return (
    <div className=" h-screen flex items-center justify-center">
      <form
        onSubmit={e => onSubmitHandler(e)}
        ref={signUpForm}
        className=" border-2 rounded-lg shadow-md p-7 w-[400px]"
      >
        <h1 className="text-2xl font-bold mb-2">Register</h1>
        <hr className="" />
        <TextInput
          name="displayName"
          placeholder="username"
          className=" mt-3 mb-2"
        />
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
          <div className=" text-sm">Already have an account?</div>
          <span
            className=" cursor-pointer text-blue-800"
            onClick={() => {
              nav('/signIn');
            }}
          >
            Log in
          </span>
        </div>
        <button
          type="submit"
          className=" bg-black text-white py-2 w-full rounded-md mt-3"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default SignUp;

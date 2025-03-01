import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components';

// FORM VALIDATION IMPORTS
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRegisteUserMutation } from '../features/auth/authApiSlice';

const signUpSchema = z.object({
    firstName: z.string().trim().min(1,'First name cannot be empty'),
    lastName: z.string().trim().min(1,'Last name cannot be empty'),
    email: z.string().email("Invalid email address").nonempty("Email is required"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters long")
      .nonempty("Password is required"),
  });

type signUpFormInputs = z.infer<typeof signUpSchema>;


function RegisterPage() {
    const  [registerUser, {isLoading, error}] = useRegisteUserMutation()
    const navigate = useNavigate();

      const {
            register,
            handleSubmit,
            formState: { errors, isSubmitting },
          } = useForm<signUpFormInputs>({
            resolver: zodResolver(signUpSchema),
          });

    const handleRegister: SubmitHandler<signUpFormInputs> = async (data) => {
        try {
            const response = await registerUser(data);
            console.log(response);
            if(response.data){
                alert("Registeration is successful")
                navigate('/login');
            }
        } catch (error) {
            if (error instanceof Error) {
                alert(error.message);
              } 
        }
    };

    useEffect(() => {
        if(error){
            console.log(error)
            alert(error)
        }
    },[error])

    return (
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className='h-screen flex justify-center items-center px-4 md:px-0'>
            <form className='flex flex-col  gap-4  h-fit xl:w-1/3 md:w-1/2  bg-white border rounded-lg shadow-md p-6' onSubmit={handleSubmit(handleRegister)}>
                <h2 className='text-3xl text-center font-semibold py-3'>Signup</h2>
                <div className='flex flex-col gap-1'>
                    <label htmlFor='first-name'>First Name:</label>
                    <input
                        id='first-name'
                        className='p-3 focus:outline focus:outline-primary focus:border-none border rounded-lg'
                        type='text'
                        {...register('firstName')}
                        placeholder='First Name'
                    />
                     {errors.firstName && (<p className="mt-1 text-red-500 text-sm">{errors.firstName.message}</p>)}
                </div>
                <div className='flex flex-col gap-1'>
                    <label htmlFor='last-name'>Last Name:</label>
                    <input
                        id='last-name'
                        className='p-3 focus:outline focus:outline-primary focus:border-none border rounded-lg'
                        type='text'
                        {...register('lastName')}
                        placeholder='Last Name'
                    />
                    {errors.lastName && (<p className="mt-1 text-red-500 text-sm">{errors.lastName.message}</p>)}
                </div>

                <div className='flex flex-col gap-1'>
                    <label htmlFor='email'>Email:</label>
                    <input
                        id='email'
                        className='p-3 focus:outline focus:outline-primary focus:border-none border rounded-lg'
                        type='email'
                        {...register('email')}
                        placeholder='Email'
                    />
                    {errors.email && (<p className="mt-1 text-red-500 text-sm">{errors.email.message}</p>)}
                </div>
                <div className='flex flex-col gap-1'>
                    <label htmlFor='password'>Password:</label>
                    <input
                        id='password'
                        className='p-3 focus:outline focus:outline-primary focus:border-none border rounded-lg'
                        type='password'
                        {...register('password')}
                        placeholder='Password'
                    />
                    {errors.password && (<p className="mt-1 text-red-500 text-sm">{errors.password.message}</p>)}
                </div>
                <div className='grid w-1/3 mx-auto'>
                    <Button disabled={isSubmitting} theme='red' text={isLoading ? 'signing up' :'signup'} type='submit' />
                </div>
                <span className='text-center'>
                    Already have an account?
                    <Link className='underline text-blue-400  px-1' to='/login'>
                        Login
                    </Link>
                </span>
            </form>
        </motion.section>
    );
}

export default RegisterPage;

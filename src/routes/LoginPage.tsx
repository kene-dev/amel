import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useLoginUserMutation } from '../features/auth/authApiSlice';
import { Button } from '../components';

// FORM VALIDATION IMPORTS
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from '../utils/schema';


type LoginFormInputs = z.infer<typeof loginSchema>;

function LoginPage() {
    const [loginUser, {isLoading}] = useLoginUserMutation()
    const navigate = useNavigate();
    // const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<LoginFormInputs>({
        resolver: zodResolver(loginSchema),
    });

   
    const handleLogin : SubmitHandler<LoginFormInputs> = async (data) => {
          try {
            const response = await loginUser(data).unwrap()
            if(response){
                navigate('/account');
            }
          } catch (error) {
            alert('Invalid credentials' + error);
          } 
    };

    return (
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className='h-screen flex justify-center items-center px-4 md:px-0'>
            <form className='flex flex-col  gap-4  h-fit xl:w-1/3 md:w-1/2  bg-white border rounded-lg shadow-md p-6' onSubmit={handleSubmit(handleLogin)}>
                <div>
                    <h2 className='text-3xl text-center font-semibold py-3'>Login</h2>
                </div>
                <div className='flex flex-col gap-1'>
                    <label htmlFor='email'>Email:</label>
                    <input
                        id='email'
                        {...register("email")}
                        className='p-3 focus:outline focus:outline-primary focus:border-none border rounded-lg'
                        type='email'                        
                        placeholder='Email'
                      
                    />
                    {errors.email && (<p className="mt-1 text-red-500 text-sm">{errors.email.message}</p>)}
                </div>
                <div className='flex flex-col gap-1'>
                    <label htmlFor='password'>Password:</label>
                    <input
                        id='password'
                        {...register("password")}
                        className='p-3 focus:outline focus:outline-primary focus:border-none border rounded-lg'
                        type='password'
                        placeholder='Password'
                    />
                    {errors.password && (<p className="mt-1 text-red-500 text-sm">{errors.password.message}</p>)}
                </div>
                <div className='grid w-1/3 mx-auto'>
                    <Button theme='red' text={isLoading ? "Logging In" : 'Login'} type='submit' />
                </div>
                <span className='text-center'>
                    If you don't have an account you can signup
                    <Link className='underline text-blue-400  px-1' to='/signup'>
                        here
                    </Link>
                </span>
            </form>
        </motion.section>
    );
}

export default LoginPage;

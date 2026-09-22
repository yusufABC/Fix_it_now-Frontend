"use client"

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import React, { useActionState, useEffect } from 'react';
import { loginAction } from '../_actions/authAction';
import { toast } from 'sonner';
// import { useRouter } from 'next/navigation';

const LoginForm = () => {
    const[state,action,pending]=useActionState(loginAction,false) 
    // const router=useRouter()
    useEffect(()=>{
        if(!state) return 
        // if(state.success){
        //     toast.success(state.message)
        //     router.refresh()
        //     router.push('/dashboard')
        // }
        if(!state.success){
            toast.error(state.message)
        }

    },[state])


        return (
    <form action={action} className='space-y-4' >
        <Card className='p-5 space-y-4'>
            
            <Input name='email' autoComplete='username' type='email' placeholder='Please enter your email'  />
            <Input name='password' autoComplete='password' type='password' placeholder='Please enter your password'  />
            <Button  type='submit'>
                {
                    pending ?"Submitting....":"Login"
                }
            </Button>
        </Card>
    </form>
    );
};

export default LoginForm;
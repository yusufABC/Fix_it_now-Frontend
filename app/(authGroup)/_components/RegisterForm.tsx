"use client"
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import React, { useActionState, useEffect, useState } from 'react';
import { registerAction } from '../_actions/authAction';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const RegisterForm = () => {
  const [role, setRole] = useState<'CUSTOMER' | 'TECHNICIAN'>('CUSTOMER');
    const [state,action,pending]=useActionState(registerAction,false)
    const router=useRouter()
        useEffect(()=>{
            if(!state) return 
            if(state.success){
                toast.success(state.message)
              router.push('/login')
            }
            if(!state.success){
                toast.error(state.message)
            }
        },[state,router])
  return (
    <form action={action} className='space-y-4'>
      <Card className='p-5 space-y-4'>
        <Input name='name' type='text' placeholder='Please enter your name' />
        <Input name='email' type='email' placeholder='Please enter your email' />
        <Input name='password' type='password' placeholder='Please enter your password' />

        <Select value={role} onValueChange={(v) => setRole(v as 'CUSTOMER' | 'TECHNICIAN')}>
          <SelectTrigger>
            <SelectValue placeholder='Select role' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='CUSTOMER'>Customer</SelectItem>
            <SelectItem value='TECHNICIAN'>Technician</SelectItem>
          </SelectContent>
        </Select>

        <input type='hidden' name='role' value={role} />

        <Button type='submit'>{
            pending?"Submitting....":"SignUp"
            }</Button>
      </Card>
    </form>
  );
};

export default RegisterForm;
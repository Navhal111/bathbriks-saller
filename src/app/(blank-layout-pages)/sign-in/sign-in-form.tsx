'use client';

import Link from 'next/link';
import { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { PiArrowRightBold } from 'react-icons/pi';
import { Checkbox, Password, Button, Input, Text } from 'rizzui';
import { Form } from "@/app/(dashboard)/shared/form";
import { loginSchema, LoginSchema } from '@/validators/login.schema';
import toast from 'react-hot-toast';
import { CustomErrorType } from '@/kit/models/CustomError';
import { useSWRLogin } from '@/kit/hooks/data/auth';
import { Login } from '@/kit/models/Auth';
import storage from '@/kit/services/storage';
import authConfig from '@/config/auth'
import { useRouter } from 'next/navigation';
import { useAuth } from '@/kit/hooks/useAuth';

const initialValues: LoginSchema = {
  email: '',
  password: '',
  rememberMe: true,
};

export default function SignInForm() {
  const auth = useAuth()
  const router = useRouter()
  const [reset, setReset] = useState({});

  const { create: onLoginAccount, isMutating, error: loginError } = useSWRLogin()

  const onSubmit: SubmitHandler<LoginSchema> = async (data) => {
    const payload = {
      Username: data.email,
      password: data.password
    }
    const basicAuthHeader = 'Basic ' + btoa(`${data.email}:${data.password}`);
    const headers: { [key: string]: string } = {
      Authorization: basicAuthHeader,
    };

    try {
      const loginDetail = await onLoginAccount(payload as Partial<Login>, undefined, headers);
      auth.setLoading(false)

      storage.setItem(authConfig.storageTokenKeyName, loginDetail.data.accessToken)
      storage.setItem(authConfig.storageRefreshKeyName, loginDetail.data.refreshToken)
      storage.setItem(authConfig.storageUserDetailName, loginDetail.data.seller)
      storage.setItem('userId', loginDetail.data.seller.id)

      setReset({ email: "", password: "", isRememberMe: false });
      toast.success(loginDetail?.message ?? 'Login Successfully!')
      router.replace('/dashboard')
    } catch (error) {
      toast.error((error as CustomErrorType)?.message)
    }
  };

  return (
    <>
      <Form<LoginSchema>
        validationSchema={loginSchema}
        resetValues={reset}
        onSubmit={onSubmit}
        useFormProps={{
          mode: 'onChange',
          defaultValues: initialValues,
        }}
      >
        {({ register, formState: { errors } }) => (
          <div className="space-y-5">
            <Input
              type="email"
              size="lg"
              label="Email"
              placeholder="Enter your email"
              className="[&>label>span]:font-medium"
              inputClassName="text-sm"
              {...register('email')}
              error={errors.email?.message}
            />
            <Password
              label="Password"
              placeholder="Enter your password"
              size="lg"
              className="[&>label>span]:font-medium"
              inputClassName="text-sm"
              {...register('password')}
              error={errors.password?.message}
            />
            <div className="flex items-center justify-between pb-2">
              <Checkbox
                {...register('rememberMe')}
                label="Remember Me"
                variant="flat"
                className="[&>label>span]:font-medium"
              />
              <Link
                href={""}
                className="h-auto p-0 text-sm font-semibold text-blue underline transition-colors hover:text-gray-900 hover:no-underline"
              >
                Forget Password?
              </Link>
            </div>
            <Button className="w-full" type="submit" size="lg" isLoading={isMutating}>
              <span>Sign in</span>{' '}
              <PiArrowRightBold className="ms-2 mt-0.5 h-6 w-6" />
            </Button>
          </div>
        )}
      </Form>
      <Text className="mt-6 text-center leading-loose text-gray-500 lg:mt-8 lg:text-start">
        Don’t have an account?{' '}
        <Link
          href={"/sign-up"}
          className="font-semibold text-gray-700 transition-colors hover:text-blue"
        >
          Sign Up
        </Link>
      </Text>
    </>
  );
}

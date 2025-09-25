"use client";

import toast from "react-hot-toast";
import { Controller, useForm } from "react-hook-form";
import { PiEnvelopeSimple } from "react-icons/pi";
import { Text, Input } from "rizzui";
import FormGroup from "@/app/shared/form-group";
import FormFooter from "@/components/form-footer";
import { useEffect } from "react";
import { useAuth } from "@/kit/hooks/useAuth";
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import KitShow from "@/kit/components/KitShow/KitShow";
import KitLoader from "@/kit/components/KitLoader/KitLoader";

interface FormData {
  name: string,
  mobile: string,
  email: string,
  designation: string,
}

const formSchema = yup.object().shape({
  name: yup.string().required('Name is a required'),
  email: yup.string().required('Email is a required'),
  designation: yup.string().optional(),
  mobile: yup
    .string()
    .required('Mobile number is required')
    .matches(/^\d{10,}$/, 'Mobile number must be at least 10 digits'),
})

export default function PersonalInfoView() {
  const { user, loading } = useAuth()

  const defaultValues: FormData = {
    name: user?.contacts[0]?.name || '',
    mobile: user?.contacts[0]?.phone || '',
    email: user?.contacts[0]?.email || '',
    designation: user?.contacts[0]?.designation || '',
  }

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(formSchema)
  })

  // const isBtnLoading = isCreatingCategory || isUpdatingCategory

  const onSubmit = async (data: any) => {
    try {
      const payload = {
        companyName: user?.companyName,
        email: user?.email,
        gstNumber: user?.gstNumber,
        panNumber: user?.panNumber,
        registeredAddress: {
          addressLine1: user?.addresses[0]?.addressLine1,
          city: user?.addresses[0]?.city,
          state: user?.addresses[0]?.state,
          postalCode: user?.addresses[0]?.postalCode,
          country: user?.addresses[0]?.country,
        },
        warehouseAddress: {
          addressLine1: user?.addresses[1]?.addressLine1,
          city: user?.addresses[1]?.city,
          state: user?.addresses[1]?.state,
          postalCode: user?.addresses[1]?.postalCode,
          country: user?.addresses[1]?.country,
        },
        pointOfContact: {
          name: data.name,
          phone: data.mobile,
          email: data.email,
          designation: data.designation ?? "",
        },
        bankAccount: {
          bankName: user?.bankAccounts[0]?.bankName,
          accountName: user?.bankAccounts[0]?.accountName,
          accountNumber: user?.bankAccounts[0]?.accountNumber,
          ifscCode: user?.bankAccounts[0]?.ifscCode,
          accountType: user?.bankAccounts[0]?.accountType || '',
        },
        documents: []
      };

      console.log("Calling updateUser with payload:", payload);

      // const result = await updateUser(payload);
      // toast.success(<Text as="b">Profile updated successfully!</Text>);
    } catch (error) {
      toast.error(<Text as="b">Failed to update profile</Text>);
    }
  };

  useEffect(() => {
    if (!user) return;
    reset(defaultValues)
  }, [user]);

  return (
    <>
      <div className="@container">
        <KitShow show={loading}>
          <div className='h-screen flex justify-center'>
            <KitLoader isLoading={true} />
          </div>
        </KitShow>
        <KitShow show={!loading}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-10 grid gap-7 divide-y divide-dashed divide-gray-200 @2xl:gap-9 @3xl:gap-11">
              <FormGroup
                title="Username"
                className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
              >
                <Controller
                  name="name"
                  control={control}
                  render={({ field: { value, onChange, ref } }) => (
                    <Input
                      ref={ref}
                      required
                      value={value}
                      onChange={onChange}
                      disabled
                      error={errors.name && errors.name.message}
                      placeholder="Username"
                      className="col-span-full bg-gray-50 cursor-not-allowed"
                    />
                  )}
                />
              </FormGroup>
              <FormGroup
                title="Email Address"
                className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
              >
                <Controller
                  name="email"
                  control={control}
                  render={({ field: { value, onChange, ref } }) => (
                    <Input
                      prefix={
                        <PiEnvelopeSimple className="h-6 w-6 text-gray-500" />
                      }
                      ref={ref}
                      type="email"
                      required
                      value={value}
                      onChange={onChange}
                      className="col-span-full"
                      placeholder="georgia.young@example.com"
                      error={errors.email && errors.email.message}
                    />
                  )}
                />
              </FormGroup>
              <FormGroup
                title="Mobile Number"
                className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
              >
                <Controller
                  name="mobile"
                  control={control}
                  render={({ field: { value, onChange, ref } }) => (
                    <Input
                      ref={ref}
                      required
                      value={value}
                      onChange={onChange}
                      error={errors.mobile && errors.mobile.message}
                      placeholder="+1 (555) 000-0000"
                      className="col-span-full"
                      type="number"
                      onKeyDown={(e) => {
                        if (['e', 'E', '+', '-', '.'].includes(e.key)) e.preventDefault();
                      }}
                    />
                  )}
                />
              </FormGroup>
              <FormGroup
                title="Designation"
                className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
              >
                <Controller
                  name="designation"
                  control={control}
                  render={({ field: { value, onChange, ref } }) => (
                    <Input
                      ref={ref}
                      value={value}
                      onChange={onChange}
                      placeholder="Enter your designation (optional)"
                      className="col-span-full"
                    />
                  )}
                />
              </FormGroup>
            </div>
            <FormFooter
              // isLoading={isLoading}
              altBtnText="Cancel"
              submitBtnText="Save"
            />
          </form>
        </KitShow>
      </div>
    </>
  );
}

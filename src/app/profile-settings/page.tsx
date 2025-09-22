"use client";

import dynamic from "next/dynamic";
import toast from "react-hot-toast";
import { SubmitHandler } from "react-hook-form";
import { PiEnvelopeSimple } from "react-icons/pi";
import { Form } from "@/app/shared/form";
import { Loader, Text, Input } from "rizzui";
import FormGroup from "@/app/shared/form-group";
import FormFooter from "@/components/form-footer";
import {
  defaultValues,
  personalInfoFormSchema,
  PersonalInfoFormTypes,
} from "@/validators/personal-info.schema";
import { LocalStorageService } from "@/services/localStorageService";
import { useUserDetailsRedux } from "@/store/hooks/useUserDetailsRedux";
import { useEffect, useState, useRef } from "react";

export default function PersonalInfoView() {
  const [userName, setUserName] = useState<string>("");
  const [formMethods, setFormMethods] = useState<any>(null);

  // Redux hook for user details
  const { userDetails, isLoading, error, fetchUserDetails, updateUser } =
    useUserDetailsRedux();

  useEffect(() => {
    // Get username from localStorage on component mount
    const storedUsername = LocalStorageService.getUsername();
    if (storedUsername) {
      setUserName(storedUsername);
    }
    // Fetch user details
    fetchUserDetails();
  }, []);

  // Handle successful update
  useEffect(() => {
    if (userDetails && !isLoading && !error) {
      // Success handling can be added here if needed
    }
  }, [userDetails, isLoading, error]);

  // Update form values when user details are fetched and form methods are available
  useEffect(() => {
    if (userDetails && formMethods) {
      formMethods.setValue("email", userDetails.userEmail || "");
      formMethods.setValue("mobile", userDetails.userMobile || "");
      formMethods.setValue("designation", userDetails.userDesignation || "");
      setUserName(userDetails.userName || "");
    }
  }, [userDetails, formMethods]);

  const onSubmit: SubmitHandler<PersonalInfoFormTypes> = async (data) => {
    console.log("Form submitted with data:", data);
    console.log("Current user details:", userDetails);
    console.log("Current username:", userName);

    try {
      if (!userDetails) {
        console.error("User details not loaded");
        toast.error(<Text as="b">User details not loaded</Text>);
        return;
      }

      const payload = {
        username: userName,
        userEmail: data.email,
        userMobile: data.mobile,
        userDesignation: data.designation,
        userType: userDetails.userType,
      };

      console.log("Calling updateUser with payload:", payload);

      const result = await updateUser(payload);
      console.log("Update result:", result);
      toast.success(<Text as="b">Profile updated successfully!</Text>);
    } catch (error) {
      console.error("Update error:", error);
      toast.error(<Text as="b">Failed to update profile</Text>);
    }
  };

  return (
    <Form<PersonalInfoFormTypes>
      validationSchema={personalInfoFormSchema}
      // resetValues={reset}
      onSubmit={onSubmit}
      className="@container"
      useFormProps={{
        mode: "onChange",
        defaultValues,
      }}
    >
      {({
        register,
        control,
        setValue,
        getValues,
        formState: { errors, isSubmitting },
      }) => {
        // Capture form methods for use in useEffect
        if (!formMethods || formMethods.setValue !== setValue) {
          setFormMethods({ setValue, register, control, getValues });
        }

        console.log("Form errors:", errors);
        console.log("Form is submitting:", isSubmitting);

        return (
          <>
            <FormGroup
              title="Personal Info"
              description="Update your photo and personal details here"
              className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
            />

            {isLoading && (
              <div className="flex justify-center items-center py-8">
                <Loader size="lg" />
                <Text className="ml-3">Loading user details...</Text>
              </div>
            )}

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
                <Text className="text-red-600">
                  Error loading user details. Please try again.
                </Text>
              </div>
            )}

            <div className="mb-10 grid gap-7 divide-y divide-dashed divide-gray-200 @2xl:gap-9 @3xl:gap-11">
              <FormGroup
                title="Username"
                className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
              >
                <Input
                  placeholder="Username"
                  value={userName}
                  readOnly
                  disabled
                  className="col-span-full bg-gray-50 cursor-not-allowed"
                />
              </FormGroup>

              <FormGroup
                title="Email Address"
                className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
              >
                <Input
                  className="col-span-full"
                  prefix={
                    <PiEnvelopeSimple className="h-6 w-6 text-gray-500" />
                  }
                  type="email"
                  placeholder="georgia.young@example.com"
                  {...register("email")}
                  error={errors.email?.message}
                />
              </FormGroup>

              <FormGroup
                title="Mobile Number"
                className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
              >
                <Input
                  className="col-span-full"
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  {...register("mobile")}
                  error={errors.mobile?.message}
                />
              </FormGroup>
              <FormGroup
                title="Designation"
                className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
              >
                <Input
                  type="text"
                  className="col-span-full"
                  placeholder="Enter your designation (optional)"
                  inputClassName="text-sm"
                  {...register('designation')}
                />
              </FormGroup>
            </div>

            <FormFooter
              isLoading={isLoading}
              altBtnText="Cancel"
              submitBtnText="Save"
            />
          </>
        );
      }}
    </Form>
  );
}

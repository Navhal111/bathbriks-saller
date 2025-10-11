"use client";

import { useState } from "react";
import { SubmitHandler, Controller } from "react-hook-form";
import { PiDesktop } from "react-icons/pi";
import { Form } from "@/app/(dashboard)/shared/form";
import { Button, Password, Title, Text } from "rizzui";
import cn from "../../../../utils/class-names";
import HorizontalFormBlockWrapper from "@/app/(dashboard)/shared/account-settings/horiozontal-block";
import {
  passwordFormSchema,
  PasswordFormTypes,
} from "@/validators/password-settings.schema";
import { useUpdatePassword } from "@/kit/hooks/data/users";
import toast from "react-hot-toast";

export default function PasswordSettingsView({
  settings,
}: {
  settings?: PasswordFormTypes;
}) {
  const [reset, setReset] = useState({});
  
  const {
    updatePassword,
    isUpdatingPassword,
    updatePasswordError,
    updatePasswordReset,
  } = useUpdatePassword();

  const onSubmit: SubmitHandler<PasswordFormTypes> = async (data) => {
    try {
      const payload = {
        oldPassword: data.currentPassword,
        newPassword: data.newPassword,
        confirmPassword: data.confirmedPassword,
      };

      await updatePassword(payload);
      
      toast.success("Password updated successfully!");
      
      // Force form reset with new values
      setReset({
        currentPassword: "",
        newPassword: "",
        confirmedPassword: "",
        _key: Date.now(), // Force re-render
      });
      
    } catch (error) {
      console.error("Password update error:", error);
      toast.error("Failed to update password. Please try again.");
    }
  };

  return (
    <>
      <Form<PasswordFormTypes>
        validationSchema={passwordFormSchema}
        resetValues={reset}
        onSubmit={onSubmit}
        className="@container"
        useFormProps={{
          mode: "onChange",
          defaultValues: {
            ...settings,
          },
        }}
      >
        {({ register, control, formState: { errors }, getValues }) => {
          return (
            <>
              <div className="mx-auto w-full max-w-screen-2xl">
                <HorizontalFormBlockWrapper
                  title="Current Password"
                  titleClassName="text-base font-medium"
                >
                  <Password
                    {...register("currentPassword")}
                    placeholder="Enter your password"
                    error={errors.currentPassword?.message}
                  />
                </HorizontalFormBlockWrapper>

                <HorizontalFormBlockWrapper
                  title="New Password"
                  titleClassName="text-base font-medium"
                >
                  <Controller
                    control={control}
                    name="newPassword"
                    render={({ field: { onChange, value } }) => (
                      <Password
                        value={value || ""}
                        placeholder="Enter your password"
                        helperText={
                          getValues().newPassword?.length < 8 &&
                          "Your current password must be more than 8 characters"
                        }
                        onChange={onChange}
                        error={errors.newPassword?.message}
                      />
                    )}
                  />
                </HorizontalFormBlockWrapper>

                <HorizontalFormBlockWrapper
                  title="Confirm New Password"
                  titleClassName="text-base font-medium"
                >
                  <Controller
                    control={control}
                    name="confirmedPassword"
                    render={({ field: { onChange, value } }) => (
                      <Password
                        value={value || ""}
                        placeholder="Enter your password"
                        onChange={onChange}
                        error={errors.confirmedPassword?.message}
                      />
                    )}
                  />
                </HorizontalFormBlockWrapper>

                <div className="mt-6 flex w-auto items-center justify-end gap-3">
                  <Button type="button" variant="outline">
                    Cancel
                  </Button>
                  <Button type="submit" variant="solid" isLoading={isUpdatingPassword}>
                    Update Password
                  </Button>
                </div>
              </div>
            </>
          );
        }}
      </Form>
    </>
  );
}

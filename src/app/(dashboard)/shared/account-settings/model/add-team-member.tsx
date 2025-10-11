"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { Controller, SubmitHandler } from "react-hook-form";
import { useModal } from "@/app/(dashboard)/shared/modal-views/use-modal";
import { Input, Text, Title, Button, Select } from "rizzui";
import { Form } from "@/app/(dashboard)/shared/form";
import {
  AddTeamMemberInput,
  addTeamMemberSchema,
} from "@/validators/team-member.schema";
import { useAddUser, useGetUsersList } from "@/kit/hooks/data/users";

const userTypes = [
  {
    label: "Admin",
    value: "ADMIN",
  },
  {
    label: "Super Admin",
    value: "SUPER_ADMIN",
  },
  {
    label: "Manager",
    value: "MANAGER",
  },
  {
    label: "Staff",
    value: "STAFF",
  },
];

export default function AddTeamMemberModalView() {
  const { closeModal } = useModal();
  const [reset, setReset] = useState({});
  const { addUser, isAddingUser, addUserError, onAddUser } = useAddUser();
  const { refreshUsersList } = useGetUsersList();

  const onSubmit: SubmitHandler<AddTeamMemberInput> = async (data) => {
    try {
      await addUser(data);

      toast.success(
        <Text as="b" className="font-semibold">
          Team member successfully added!
        </Text>
      );

      // Refresh the users list
      refreshUsersList();

      // Close modal and reset form
      closeModal();
      setReset({
        username: "",
        password: "",
        userEmail: "",
        userMobile: "",
        userType: "",
      });
    } catch (error) {
      toast.error(
        <Text as="b" className="font-semibold">
          Failed to add team member. Please try again.
        </Text>
      );
    }
  };

  return (
    <div className="m-auto p-6">
      <Title as="h3" className="mb-6 text-lg">
        Add New Member
      </Title>
      <Form<AddTeamMemberInput>
        validationSchema={addTeamMemberSchema}
        resetValues={reset}
        onSubmit={onSubmit}
      >
        {({ register, control, formState: { errors } }) => (
          <>
            <MemberForm control={control} register={register} errors={errors} />
            <div className="mt-8 flex justify-end gap-3">
              <Button
                className="w-auto"
                variant="outline"
                onClick={() => closeModal()}
              >
                Cancel
              </Button>
              <Button type="submit" isLoading={isAddingUser} className="w-auto">
                Add Member
              </Button>
            </div>
          </>
        )}
      </Form>
    </div>
  );
}

export function MemberForm({ register, control, errors }: any) {
  return (
    <div className="flex flex-col gap-4 text-gray-700">
      <Input
        type="text"
        label="Username"
        placeholder="john_doe"
        labelClassName="text-sm font-medium text-gray-900"
        {...register("username")}
        error={errors?.username?.message}
      />
      <Input
        type="password"
        label="Password"
        placeholder="Enter password"
        labelClassName="text-sm font-medium text-gray-900"
        {...register("password")}
        error={errors?.password?.message}
      />
      <Input
        type="email"
        label="Email"
        labelClassName="text-sm font-medium text-gray-900"
        placeholder="john@doe.io"
        {...register("userEmail")}
        error={errors?.userEmail?.message}
      />
      <Input
        type="tel"
        label="Mobile Number"
        placeholder="+1234567890"
        labelClassName="text-sm font-medium text-gray-900"
        {...register("userMobile")}
        error={errors?.userMobile?.message}
      />
      <Controller
        control={control}
        name="userType"
        render={({ field: { value, onChange } }) => (
          <Select
            label="User Type"
            inPortal={false}
            labelClassName="text-sm font-medium text-gray-900"
            dropdownClassName="h-auto"
            placeholder="Select user type..."
            options={userTypes}
            onChange={onChange}
            value={value}
            getOptionValue={(option) => option.value}
            displayValue={(selected) =>
              userTypes?.find((type) => type.value === selected)?.label ?? ""
            }
            error={errors?.userType?.message as string}
          />
        )}
      />
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Controller, SubmitHandler } from "react-hook-form";
import { useModal } from "@/app/shared/modal-views/use-modal";
import { Input, Text, Title, Button, Select } from "rizzui";
import { Form } from "@/app/shared/form";
import {
  EditTeamMemberInput,
  editTeamMemberSchema,
} from "@/validators/team-member.schema";
import { useEditUser, useGetUsersList } from "@/kit/hooks/data/users";
import { UsersListItem } from "@/kit/models/User";

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

// Form component for member fields
function MemberForm({
  control,
  register,
  errors,
}: {
  control: any;
  register: any;
  errors: any;
}) {
  return (
    <div className="flex flex-col gap-4">
      <Input
        label="User Name"
        placeholder="Enter user name"
        {...register("username")}
        error={errors.username?.message}
      />
      <Input
        label="Email"
        placeholder="Enter email address"
        type="email"
        {...register("userEmail")}
        error={errors.userEmail?.message}
      />
      <Input
        label="Mobile"
        placeholder="Enter mobile number"
        {...register("userMobile")}
        error={errors.userMobile?.message}
      />
      <Controller
        control={control}
        name="userType"
        render={({ field: { onChange, value } }) => (
          <Select
            label="User Type"
            placeholder="Select user type"
            options={userTypes}
            onChange={onChange}
            value={value}
            error={errors.userType?.message}
          />
        )}
      />
    </div>
  );
}

interface EditTeamMemberModalViewProps {
  userData: UsersListItem;
}

export default function EditTeamMemberModalView({
  userData,
}: EditTeamMemberModalViewProps) {
  const { closeModal } = useModal();
  const [reset, setReset] = useState({});
  const { editUser, isEditingUser, editUserError, onEditUser } = useEditUser();
  const { refreshUsersList } = useGetUsersList();

  // Set initial form values based on user data
  const initialValues = {
    username: userData.userName,
    userEmail: userData.userEmail,
    userMobile: userData.userMobile,
    userType: userData.userType,
  };

  const onSubmit: SubmitHandler<EditTeamMemberInput> = async (data) => {
    try {
      const editPayload = {
        id: userData.id,
        username: data.username,
        userEmail: data.userEmail,
        userMobile: data.userMobile,
        userType: data.userType,
      };

      await editUser(editPayload);

      toast.success(
        <Text as="b" className="font-semibold">
          Team member successfully updated!
        </Text>
      );

      // Refresh the users list
      refreshUsersList();

      // Close modal
      closeModal();
    } catch (error) {
      toast.error(
        <Text as="b" className="font-semibold">
          Failed to update team member. Please try again.
        </Text>
      );
    }
  };

  return (
    <div className="m-auto p-6">
      <Title as="h3" className="mb-6 text-lg">
        Edit Member
      </Title>
      <Form<EditTeamMemberInput>
        validationSchema={editTeamMemberSchema}
        resetValues={reset}
        onSubmit={onSubmit}
        useFormProps={{
          defaultValues: initialValues,
        }}
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
              <Button
                type="submit"
                isLoading={isEditingUser}
                className="w-auto"
              >
                Update Member
              </Button>
            </div>
          </>
        )}
      </Form>
    </div>
  );
}

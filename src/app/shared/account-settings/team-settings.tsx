"use client";

import Link from "next/link";
import { Button, Title } from "rizzui";
import LoggedInDevices from "@/app/shared/account-settings/logged-in-devices/table";
import HorizontalFormBlockWrapper from "@/app/shared/account-settings/horiozontal-block";
import AddTeamMemberModalView from "@/app/shared/account-settings/model/add-team-member";
import { useModal } from "@/app/shared/modal-views/use-modal";
import { PiPlusBold } from "react-icons/pi";
import { useGetUsersList } from "@/kit/hooks/data/users";

export default function TeamSettingsView() {
  const { openModal } = useModal();
  const { usersList, usersListError, isUsersListLoading } = useGetUsersList();

  return (
    <div className="@container">
      <HorizontalFormBlockWrapper
        childrenWrapperClassName="gap-0 @lg:gap-0"
        title="Teams"
        description="Manage your teams & user permissions."
        titleClassName="text-xl font-semibold"
      >
        <div className="col-span-2 flex justify-end gap-4">
          <Button
            type="button"
            onClick={() =>
              openModal({
                view: <AddTeamMemberModalView />,
              })
            }
          >
            <PiPlusBold className="me-1.5 h-4 w-4" />
            Add Member
          </Button>
        </div>
      </HorizontalFormBlockWrapper>

      {usersList && usersList.length > 0 && (
        <LoggedInDevices
          className="@xs:col-span-full"
          usersList={usersList}
          isLoading={isUsersListLoading}
          error={usersListError}
        />
      )}
    </div>
  );
}

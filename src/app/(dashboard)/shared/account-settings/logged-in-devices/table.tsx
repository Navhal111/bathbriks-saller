"use client";

import { loggedInDeviceData } from "@/data/logged-in-device";
import Table from "@/kit/components/Table";
import { useTanStackTable } from "@/kit/components/Table/use-TanStack-Table";
import { loggedInDeviceColumns } from "./columns";
import TablePagination from "@/kit/components/Table/pagination";
import { UsersListItem } from "@/kit/models/User";
import { CustomError } from "@/kit/models/CustomError";
import { useEffect } from "react";
import { useModal } from "@/app/(dashboard)/shared/modal-views/use-modal";
import EditTeamMemberModalView from "@/app/(dashboard)/shared/account-settings/model/edit-team-member";

export type LoggedInDevicesDataType = (typeof loggedInDeviceData)[number] & {
  originalUser?: UsersListItem;
};

interface LoggedInDevicesProps {
  className?: string;
  usersList: UsersListItem[];
  isLoading?: boolean;
  error?: CustomError[] | null;
}

export default function LoggedInDevices({
  className,
  usersList = [],
  isLoading = false,
  error,
}: LoggedInDevicesProps) {
  const { openModal } = useModal();

  // Debug logs
  console.log("LoggedInDevices - usersList:", usersList);
  console.log("LoggedInDevices - isLoading:", isLoading);
  console.log("LoggedInDevices - error:", error);

  // Transform users list data to match the expected table format
  console.log("About to transform usersList:", usersList);

  var transformedData =
    usersList && usersList.length > 0
      ? usersList.map((user) => ({
        id: user.id.toString(), // Convert to string to match expected type
        user: {
          name: user.userName,
          email: user.userEmail,
          avatar: "",
        },
        status: "Active", // Show active for all as requested
        email: user.userEmail, // Using userName as email key
        teams: [user.userType], // Show ADMIN role for all for now
        originalUser: user, // Keep reference to original user data
      }))
      : [];

  useEffect(() => {
    console.log("Transformed data:", transformedData);
  }, [transformedData]);

  // Handle edit action
  const handleEditRow = (row: LoggedInDevicesDataType) => {
    console.log("Edit clicked for row:", row);
    if (row.originalUser) {
      openModal({
        view: <EditTeamMemberModalView userData={row.originalUser} />,
      });
    }
  };

  // Handle delete action
  const handleDeleteRow = (row: LoggedInDevicesDataType) => {
    console.log("Delete clicked for row:", row);
    // TODO: Implement delete functionality
  };

  const { table } = useTanStackTable<LoggedInDevicesDataType>({
    tableData: transformedData,
    columnConfig: loggedInDeviceColumns,
    options: {
      initialState: {
        pagination: {
          pageIndex: 0,
          pageSize: 10,
        },
      },
      meta: {
        handleDeleteRow,
      },
      enableRowSelection: true,
      enableMultiRowSelection: true,
    },
  });

  if (isLoading) {
    return (
      <div className={`${className} flex items-center justify-center p-8`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading users...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`${className} flex items-center justify-center p-8`}>
        <div className="text-center">
          <p className="text-red-600">Error loading users</p>
        </div>
      </div>
    );
  }

  // Don't render table if no data is available yet
  if (!transformedData || transformedData.length === 0) {
    console.log("LoggedInDevices - No data to show:", {
      transformedData,
      usersList,
    });
    return (
      <div className={`${className} flex items-center justify-center p-8`}>
        <div className="text-center">
          <p className="text-gray-600">No users found</p>
        </div>
      </div>
    );
  }

  console.log("LoggedInDevices - Rendering table with data:", transformedData);

  return (
    <div className={className}>
      <Table table={table} variant="modern" />
      <TablePagination table={table} className="mt-4" />
    </div>
  );
}

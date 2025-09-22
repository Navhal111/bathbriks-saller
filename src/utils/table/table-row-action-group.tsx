
"use client";

import { ActionIcon, Flex, Tooltip } from "rizzui";
import Link from "next/link";
import DeletePopover from "../delete-popover";
import PencilIcon from "@/components/icons/pencil";
import EyeIcon from "@/components/icons/eye";
import cn from "@/utils/class-names";
import CopyUrlIcon from "@/components/icons/copy";
import KitButton from "@/kit/components/KitButton/KitButton";

export default function TableRowActionGroup({
  onDelete,
  onCopyUrl,
  editUrl,
  viewUrl,
  approve,
  deletePopoverTitle = "Delete the appointment",
  deletePopoverDescription = "Are you sure you want to delete this item?",
  className,
}: {
  onDelete?: () => void;
  onCopyUrl?: () => void;
  // editUrl?: string;
  editUrl?: string | (() => void);
  viewUrl?: () => void;
  approve?: () => void
  deletePopoverTitle?: string;
  deletePopoverDescription?: string;
  className?: string;
}) {
  return (
    <Flex
      align="center"
      justify="end"
      gap="3"
      className={cn("pe-3", className)}
    >
      {onCopyUrl && (
        <Tooltip size="sm" content="Copy URL" placement="top" color="invert">
          <ActionIcon
            as="button"
            size="sm"
            variant="outline"
            aria-label="Copy URL"
            onClick={onCopyUrl}
          >
            <CopyUrlIcon className="size-4" />
          </ActionIcon>
        </Tooltip>
      )}
      {viewUrl && (
        <Tooltip size="sm" content="View Answer" placement="top" color="invert">
          <ActionIcon
            as="button"
            size="sm"
            variant="outline"
            aria-label="Copy URL"
            onClick={viewUrl}
          >
            <EyeIcon className="size-4" />
          </ActionIcon>
        </Tooltip>
      )}
      {approve && (
        <Tooltip size="sm" content="Approve Product" placement="top" color="invert">
          <KitButton
            variant="outline"
            color="primary"
            className='w-[80px] rounded-full !h-[30px] text-green-600 bg-green-100 border-green-600 hover:bg-primary-lighter'
            onClick={approve}
          >
            Approve
          </KitButton>
        </Tooltip>
      )}
      {editUrl && typeof editUrl === "string" ? (
        <Tooltip size="sm" content="Edit Item" placement="top" color="invert">
          <Link href={editUrl}>
            <ActionIcon as="span" size="sm" variant="outline" aria-label="Edit Item">
              <PencilIcon className="size-4" />
            </ActionIcon>
          </Link>
        </Tooltip>
      ) : (
        typeof editUrl === "function" && (
          <Tooltip size="sm" content="Edit Item" placement="top" color="invert">
            <ActionIcon
              as="button"
              size="sm"
              variant="outline"
              aria-label="Edit Item"
              onClick={editUrl}
            >
              <PencilIcon className="size-4" />
            </ActionIcon>
          </Tooltip>
        )
      )}
      {onDelete && (
        <DeletePopover
          title={deletePopoverTitle}
          description={deletePopoverDescription}
          onDelete={onDelete}
        />
      )}
    </Flex>
  );
}

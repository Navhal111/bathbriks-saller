"use client";

import { type Table as ReactTableType } from "@tanstack/react-table";
import {
  ActionIcon,
  Box,
  Flex,
  Grid,
  Select,
  SelectOption,
  Text,
} from "rizzui";
import {
  PiCaretLeftBold,
  PiCaretRightBold,
  PiCaretDoubleLeftBold,
  PiCaretDoubleRightBold,
} from "react-icons/pi";
import cn from "@/utils/class-names";

const options = [
  { value: 5, label: "5" },
  { value: 10, label: "10" },
  { value: 15, label: "15" },
  { value: 20, label: "20" },
  { value: 25, label: "25" },
];

type ExternalPaginationProps<TData extends Record<string, any>> = {
    pageIndex: number;
    pageSize: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    onPageSizeChange: (size: number) => void;
    className?: string;
  };

export default function ServerPagination<TData extends Record<string, any>>({
    pageIndex,
    pageSize,
    totalPages,
    onPageChange,
    onPageSizeChange,
    className,
  }: ExternalPaginationProps<TData>) {
    return (
      <Flex gap="6" align="center" justify="between" className={cn("@container", className)}>
        <Flex align="center" className="w-auto shrink-0">
          <Text className="hidden font-normal text-gray-600 @md:block">Rows per page</Text>
          <Select
            size="sm"
            variant="flat"
            options={options}
            className="w-12"
            value={pageSize}
            onChange={(v: SelectOption) => {
              onPageSizeChange(Number(v.value));
            }}
            suffixClassName="[&>svg]:size-3"
            selectClassName="font-semibold text-xs ring-0 shadow-sm h-7"
            optionClassName="font-medium text-xs px-2 justify-center"
          />
        </Flex>
        <Flex justify="end" align="center">
          <Text className="hidden font-normal text-gray-600 @3xl:block">
            Page {pageIndex} of {totalPages}
          </Text>
          <Grid gap="2" columns="4">
            <ActionIcon
              size="sm"
              rounded="lg"
              variant="outline"
              aria-label="Go to first page"
              onClick={() => onPageChange(1)}
              disabled={pageIndex === 1}
              className="text-gray-900 shadow-sm disabled:text-gray-400 disabled:shadow-none"
            >
              <PiCaretDoubleLeftBold className="size-3.5" />
            </ActionIcon>
            <ActionIcon
              size="sm"
              rounded="lg"
              variant="outline"
              aria-label="Go to previous page"
              onClick={() => onPageChange(pageIndex - 1)}
              disabled={pageIndex === 1}
              className="text-gray-900 shadow-sm disabled:text-gray-400 disabled:shadow-none"
            >
              <PiCaretLeftBold className="size-3.5" />
            </ActionIcon>
            <ActionIcon
              size="sm"
              rounded="lg"
              variant="outline"
              aria-label="Go to next page"
              onClick={() => onPageChange(pageIndex + 1)}
              disabled={pageIndex === totalPages}
              className="text-gray-900 shadow-sm disabled:text-gray-400 disabled:shadow-none"
            >
              <PiCaretRightBold className="size-3.5" />
            </ActionIcon>
            <ActionIcon
              size="sm"
              rounded="lg"
              variant="outline"
              aria-label="Go to last page"
              onClick={() => onPageChange(totalPages)}
              disabled={pageIndex === totalPages}
              className="text-gray-900 shadow-sm disabled:text-gray-400 disabled:shadow-none"
            >
              <PiCaretDoubleRightBold className="size-3.5" />
            </ActionIcon>
          </Grid>
        </Flex>
      </Flex>
    );
  }

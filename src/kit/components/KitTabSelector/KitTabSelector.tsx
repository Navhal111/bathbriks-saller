"use client";

import KitButton from "@/kit/components/KitButton/KitButton";
import { Text } from "rizzui/typography";
import cn from "@/utils/class-names";

interface TabItem {
  label: string;
  value: string;
}

interface TabSelectorProps {
  items: TabItem[];
  selected: string;
  onChange: (value: string) => void;
}

export default function KitTabSelector({ items, selected, onChange }: TabSelectorProps) {
  return (
    <div className="flex h-[52px] items-start overflow-hidden">
      <div className="-mb-3 flex w-full gap-3 overflow-x-auto scroll-smooth md:gap-5 lg:gap-8">
        {items.map((item, index) => (
          <KitButton
            variant="text"
            key={`tab-${index}`}
            onClick={() => onChange(item.value)}
            className={cn(
              "group relative cursor-pointer whitespace-nowrap py-2.5 font-medium text-gray-500 before:absolute before:bottom-0 before:left-0 before:z-[1] before:h-0.5 before:bg-gray-1000 before:transition-all hover:text-gray-900",
              selected === item.value
                ? "before:visible before:w-full before:opacity-100 text-gray-900"
                : "before:invisible before:w-0 before:opacity-0"
            )}
          >
            <Text
              as="span"
              className="inline-flex rounded-md px-2.5 py-1.5 transition-all duration-200 group-hover:bg-gray-100/70"
            >
              {item.label}
            </Text>
          </KitButton>
        ))}
      </div>
    </div>
  );
}

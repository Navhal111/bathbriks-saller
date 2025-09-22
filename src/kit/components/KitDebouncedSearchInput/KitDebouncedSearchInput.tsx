// import { Controller, type Control, type FieldValues } from "react-hook-form";
// import { useEffect, useState } from "react";
// import { Input } from "rizzui/input";



// type DebouncedSearchInputProps<T extends FieldValues> = {
//   control: Control<T>;
//   name: keyof T;
//   placeholder?: string;
//   onDebouncedChange?: (value: string) => void;
//   debounceDelay?: number;
// };

// export function KitDebouncedSearchInput<T extends FieldValues>({
//   control,
//   name,
//   placeholder = "Search...",
//   onDebouncedChange,
//   debounceDelay = 300,
// }: DebouncedSearchInputProps<T>) {
//   const [searchValue, setSearchValue] = useState("");

//   useEffect(() => {
//     const timeout = setTimeout(() => {
//       onDebouncedChange?.(searchValue);
//     }, debounceDelay);

//     return () => clearTimeout(timeout);
//   }, [searchValue, debounceDelay, onDebouncedChange]);

//   return (
//     <Controller
//       name={name as any}
//       control={control}
//       render={({ field }) => (
//         <Input
//           {...field}
//           type="search"
//           label="Search"
//           placeholder={placeholder}
//           className="w-full"
//           onChange={(e) => {
//             field.onChange(e); // sync with form
//             setSearchValue(e.target.value); // debounce logic
//           }}
//         />
//       )}
//     />
//   );
// }

import { useEffect, useState } from "react";

function KitDebouncedSearchInput(searchQuery: string, delay = 300) {
  const [debouncedSearch, setDebouncedSearch] = useState(searchQuery);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery, delay]);

  return debouncedSearch;
}

export default KitDebouncedSearchInput
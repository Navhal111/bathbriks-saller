export function CheckboxIcon({ checked }: { checked: boolean }) {
  return (
    <div
      className={`w-4 h-4 flex items-center justify-center border rounded-full 
        ${checked ? "bg-white border-white" : "bg-gray-200 border-gray-400"}
      `}
    >
      {checked && (
        <svg
          className="w-3 h-3 text-blue-500"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
          />
        </svg>
      )}
    </div>
  );
}

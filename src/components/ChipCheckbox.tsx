import CheckIcon from "./icons/check";


interface ChipCheckboxProps {
  label: string;
  isChecked: boolean;
  onChange: () => void;
}

export default function ChipCheckbox({
  label,
  isChecked,
  onChange,
}: ChipCheckboxProps) {
  return (
    <label
      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full border cursor-pointer transition-all
        ${isChecked ? "bg-blue-500 text-white border-blue-500" : "bg-gray-100 text-gray-700 border-gray-300"}
      `}
    >
      <div
        className={`w-4 h-4 flex items-center justify-center border rounded ${
          isChecked ? "bg-white border-white" : "border-gray-400 bg-transparent"
        }`}
      >
        {isChecked && <CheckIcon className="w-4 h-4 text-blue-500" />}
      </div>
      <input type="checkbox" className="hidden" checked={isChecked} onChange={onChange} />
      <span className="whitespace-nowrap">{label}</span>
    </label>
  );
}

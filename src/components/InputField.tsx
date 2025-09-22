import { Input } from "rizzui/input";

interface InputFieldProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputField: React.FC<InputFieldProps> = ({ value, onChange }) => (
  <Input
    type="number"
    prefix={"Rs."}
    value={value}
    onChange={onChange}
    placeholder="1234567890"
  />
);

import MinusIcon from "@/components/icons/minus";
import PlusIcon from "@/components/icons/plus";
import { Button } from "rizzui/button";
import { Input } from "rizzui/input";

type Props = {
    value: number;
    onChange: (value: number) => void;
    label?: string;
    required?: boolean;
};

function KitPlusMinusInput({ value, onChange, label, required }: Props) {
    const handleDecrease = () => {
        if (value > 0) onChange(value - 1);
    };

    const handleIncrease = () => {
        onChange(value + 1);
    };

    const handleManualChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const raw = e.target.value.replace(/\D/g, '');
        onChange(Number(raw));
    };

    return (
        <div className="w-full">
            {label && (
                <label className="mb-1 block text-sm font-medium text-gray-700">
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}
            <div className="flex items-center gap-2">
                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleDecrease}
                    disabled={value <= 0}
                    className="p-2"
                >
                    <MinusIcon className="w-4 h-4" />
                </Button>

                <Input
                    type="text"
                    className="w-full text-center"
                    value={value}
                    onChange={handleManualChange}
                />

                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleIncrease}
                    className="p-2"
                >
                    <PlusIcon className="w-4 h-4" />
                </Button>
            </div>
        </div>
    );
}

export default KitPlusMinusInput

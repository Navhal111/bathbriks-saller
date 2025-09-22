import cn from "@/utils/class-names";
import { type ReactNode } from "react";
import { Button, Loader } from "rizzui";

interface Props {
  children: ReactNode;
  isLoading?: boolean;
  className?: string;
  variant?: "solid" | "outline" | "text" | "flat";
  color?: "primary" | "secondary" | "danger";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

const KitButton = ({
  children,
  isLoading = false,
  className = "",
  variant = "solid",
  color = "primary",
  size = "md",
  disabled,
  ...rest
}: Props) => {
  return (
    <Button
      className={cn("h-[40px]", className)}
      variant={variant}
      color={color}
      size={size}
      disabled={isLoading || disabled}
      loader={<Loader size="sm" variant="spinner" className="mr-2" />}
      isLoading={isLoading}
      {...rest}
    >
      {children}
    </Button>
  );
};

export default KitButton;

import cn from "@/utils/class-names";
import { Loader } from "rizzui";

interface Props {
  isLoading: boolean;
  label?: string;
  showLabel?: boolean;
  isDarkTheme?: boolean;
  className?: string;
}

const KitLoader = ({
  isLoading,
  label = "Loading...",
  showLabel = true,
  isDarkTheme = false,
  className = "",
}: Props) => {
  if (!isLoading) return null;

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center w-full h-full py-10",
        className
      )}
    >
      <Loader
        variant="spinner"
        color={isDarkTheme ? "secondary" : "primary"}
        size="lg"
        className={isDarkTheme ? "text-white" : ""}
      />
      {showLabel && (
        <p
          className={cn(
            "mt-4 text-sm",
            isDarkTheme ? "text-white" : "text-muted-foreground"
          )}
        >
          {label}
        </p>
      )}
    </div>
  );
};

export default KitLoader;

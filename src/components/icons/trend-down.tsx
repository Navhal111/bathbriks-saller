export default function TrendingDown({
    strokeWidth,
    ...props
  }: React.SVGProps<SVGSVGElement>) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={strokeWidth ?? 1.5}
        stroke="currentColor"
        {...props}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 7l6 6 4-4 8 8M14 17h7v-7"
        />
      </svg>
    );
  }
  
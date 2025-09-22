
export default function CopyUrlIcon({
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
          d="M9 12h6m-6 4h6M7.5 4.5h9a2 2 0 012 2v2.379a2 2 0 01-.586 1.414l-1.707 1.707a2 2 0 00-.586 1.414v2.379a2 2 0 01-2 2h-9a2 2 0 01-2-2V6.5a2 2 0 012-2z"
        />
      </svg>
    );
  }
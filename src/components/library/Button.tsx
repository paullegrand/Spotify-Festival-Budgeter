interface Props {
  onClick: () => void;
  intent?: "success" | "warning" | "destroy" | "default";
  size?: "sm" | "md" | "lg";
  children: string | string[] | JSX.Element | JSX.Element[];
}

export default function Button({
  onClick,
  intent = "default",
  size = "md",
  children,
}: Props) {
  let colorClasses = "";
  let sizeClasses = "";

  switch (intent) {
    case "success":
      colorClasses =
        "text-white bg-emerald-600 hover:bg-emerald-700 focus-visible:outline-emerald-600";
      break;
    case "warning":
      colorClasses =
        "text-white bg-yellow-600 hover:bg-yellow-500 focus-visible:outline-yellow-600";
      break;
    case "destroy":
      colorClasses =
        "text-gray-700 bg-red-300 hover:bg-red-500 focus-visible:outline-red-600";
      break;
    default:
      colorClasses =
        "text-gray-100 bg-gray-500 hover:bg-gray-700 focus-visible:outline-gray-600";
  }

  switch (size) {
    case "sm":
      sizeClasses = "px-2 py-2 m-2 text-xs";
      break;
    case "lg":
      sizeClasses = "px-4 py-3 m-4 text-md";
      break;
    case "md":
    default:
      sizeClasses = "px-3 py-2 m-3 text-sm";
      break;
  }

  return (
    <button
      type="button"
      className={`rounded-md ${sizeClasses} font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${colorClasses}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

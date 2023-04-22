interface Props {
  onClick: () => void;
  intent: "success" | "warning" | "destroy" | "default";
  children: string | string[] | JSX.Element | JSX.Element[];
}

export default function Button({
  onClick,
  intent = "default",
  children,
}: Props) {
  let buttonColors = "";
  switch (intent) {
    case "success":
      buttonColors =
        "text-white bg-emerald-600 hover:bg-emerald-500 focus-visible:outline-emerald-600";
      break;
    case "warning":
      buttonColors =
        "text-white bg-yellow-600 hover:bg-yellow-500 focus-visible:outline-yellow-600";
      break;
    case "destroy":
      buttonColors =
        "text-gray-700 bg-red-300 hover:bg-red-500 focus-visible:outline-red-600";
      break;
    default:
      buttonColors =
        "text-gray-100 bg-gray-500 hover:bg-gray-600 focus-visible:outline-gray-600";
  }
  return (
    <button
      type="button"
      className={`rounded-md px-3 py-2 m-3 text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${buttonColors}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

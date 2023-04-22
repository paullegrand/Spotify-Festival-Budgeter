interface Props {
  children: JSX.Element;
}

export default function Footer({ children }: Props) {
  return (
    <div className="bg-gray-500 fixed bottom-0 left-0 w-full">
      <div className="flex flex-row gap-8 justify-end z-10 drop-shadow-xl max-w-7xl mx-auto">
        {children}
      </div>
    </div>
  );
}

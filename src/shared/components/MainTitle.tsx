interface IProps {
  children: React.ReactNode;
}

function MainTitle({ children }: IProps) {
  return (
    <div
      className="flex px-4 h-20 items-center
                          text-black text-3xl font-medium"
    >
      {children}
    </div>
  );
}

export default MainTitle;

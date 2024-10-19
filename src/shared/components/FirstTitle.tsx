interface IProps {
    children: React.ReactNode;
  }
  
  function FirstTitle({ children }: IProps) {
    return (
      <div
      className="flex px-4 bg-fourth h-8  items-center
                                  text-fifth text-sm font-medium"
    >
      {children}
    </div>
    );
  }
  
  export default FirstTitle;
  
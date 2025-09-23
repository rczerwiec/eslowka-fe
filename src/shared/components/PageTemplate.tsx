import FirstTitle from "./FirstTitle";
import MainTitle from "./MainTitle";

interface IProps {
    children: React.ReactNode;
    firstTitle: string;
    mainTitle: string;
    backButton?: boolean;
    childrenButton?: React.ReactNode;
}

function PageTemplate({ children, firstTitle, mainTitle, backButton, childrenButton }: IProps) {
    return (
      <div className="flex flex-col w-full p-4 h-full bg-gray-100 ">
        <span className="max-lg:hidden">
        <FirstTitle>{firstTitle}</FirstTitle>
        </span>

        <div className="flex justify-between items-center mt-4 mb-6 max-lg:hidden">
          <MainTitle>{mainTitle}</MainTitle>
          {backButton && (
            <div className="flex items-center">
              {childrenButton}
            </div>
          )}
        </div>
        <div className="flex flex-col bg-white shadow-md rounded-2xl  w-full  mx-auto">
          {children}
        </div>
      </div>
    );
}

export default PageTemplate;
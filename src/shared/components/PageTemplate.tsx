import FirstTitle from "./FirstTitle";
import MainTitle from "./MainTitle";

interface IProps {
    children: React.ReactNode;
    firstTitle: string;
    mainTitle: string;
    backButton?: boolean;
    childrenButton?: React.ReactNode;

}

function PageTemplate({children,firstTitle, mainTitle,backButton,childrenButton}: IProps){

    return (
      <div className="flex flex-col w-full h-full">
        <FirstTitle>{firstTitle}</FirstTitle>
        <div className="flex justify-between items-center mr-4">
          <MainTitle>{mainTitle}</MainTitle>
          {backButton ? <>{childrenButton}</> : <></>}
        </div>
        {children}
      </div>
    );
}
export default PageTemplate;
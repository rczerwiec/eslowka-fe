import FirstTitle from "./FirstTitle";
import MainTitle from "./MainTitle";

interface IProps {
    children: React.ReactNode;
    firstTitle: string;
    mainTitle: string;
}

function PageTemplate({children,firstTitle, mainTitle}: IProps){

    return(
        <div className="flex flex-col w-full h-full">
            <FirstTitle>{firstTitle}</FirstTitle>
            <MainTitle>{mainTitle}</MainTitle>
            {children}
        </div>
    )
}
export default PageTemplate;
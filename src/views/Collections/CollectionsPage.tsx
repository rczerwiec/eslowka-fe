import FirstTitle from "../../shared/components/FirstTitle";
import MainTitle from "../../shared/components/MainTitle";

const CollectionsPage = () => {
  return (
    <div className="flex flex-col w-full h-full">
      <FirstTitle>Kolekcje</FirstTitle>
      <MainTitle>Kolekcje</MainTitle>
      <div className="relative inline-block text-left">
        <div className="flex gap-2">
            <div>Gotowce</div>
            <div>Społeczność</div>
        </div>
        <div>
            <div></div>
        </div>
      </div>
    </div>
  );
};

export default CollectionsPage;

import { TbFolderFilled } from "react-icons/tb";
import FirstTitle from "../../shared/components/FirstTitle";
import MainTitle from "../../shared/components/MainTitle";
import { FaEdit, FaPlayCircle } from "react-icons/fa";
import { MdAddBox } from "react-icons/md";
import { useEffect, useMemo, useState } from "react";
import { RootState, useCreateFolderMutation, useGetAllSharedFoldersQuery, useGetUserFoldersQuery, useIncrementSharedCounterMutation, useFetchUserQuery } from "../../shared/store";
import { useSelector } from "react-redux";
import { IFolder, IWord } from "../../shared/store/slices/FolderSlice";
import { toast } from "react-toastify";
import { Modal, useModal } from "../../shared/components/Modal";

const CollectionsPage = () => {
  const response = useGetAllSharedFoldersQuery(undefined);
  const user = useSelector((state: RootState) => state.userProfile);
  const userFoldersResponse = useGetUserFoldersQuery(user.value);
  const [createFolder] = useCreateFolderMutation();
  const [incrementSharedCounter] = useIncrementSharedCounterMutation();
  useEffect(() => {
    if (response.isSuccess) {
      console.log("Shared collections:", response.data);
    }
    if (response.isError) {
      console.log("Shared collections error:", response.error);
    }
  }, [response.isSuccess, response.isError, response.data, response.error]);


  const renderActionButton = (
    icon: React.ReactNode,
    label: string,
    onClick: () => void,
    color: string = "text-gray-600"
  ) => (
    <button
      onClick={onClick}
      className={`flex flex-col items-center gap-1 hover:text-main font-medium ${color} transition duration-200`}
    >
      {icon}
      <span className="text-xs">{label}</span>
    </button>
  );




  const [search, setSearch] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState<string>("All");
  const [page, setPage] = useState<number>(1);
  const pageSize = 20;
  const preview = useModal();
  const [previewFolder, setPreviewFolder] = useState<any | null>(null);

  const nextFolderId = useMemo(() => {
    const folders = (userFoldersResponse.data as IFolder[]) || [];
    if (!folders.length) return 1;
    const maxId = folders.reduce((acc, f) => (Number(f.id) > acc ? Number(f.id) : acc), 0);
    return maxId + 1;
  }, [userFoldersResponse.data]);

  const makeid = (length:number) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }

  const handleAdd = async (sharedFolder: any) => {
    // Sprawdź czy to nie jest własna kolekcja
    if (sharedFolder.authorID === user.value) {
      toast.error("Nie możesz dodać własnej kolekcji");
      return;
    }

    // Sprawdź czy folder już istnieje w kolekcji użytkownika
    const userFolders = (userFoldersResponse.data as IFolder[]) || [];
    const folderExists = userFolders.some(f => 
      f.folderName === sharedFolder.folderName && 
      f.authorID === sharedFolder.authorID
    );
    if (folderExists) {
      toast.error("Ta kolekcja już znajduje się w Twoich folderach");
      return;
    }

    try {
      const newId = nextFolderId;
      const updatedWords = Array.isArray(sharedFolder.words)
        ? (sharedFolder.words as IWord[]).map((w) => ({
            ...w,
            folderId: newId,
            repeated: 0,
            known: 0,
            streak: 0,
            reverseStreak: 0,
          }))
        : [];

      const newFolder: IFolder = {
        id: newId,
        folderName: sharedFolder.folderName,
        words: updatedWords,
        currentProgress: 0,
        maxProgress: 0,
        defaultVoice: sharedFolder.defaultVoice,
        defaultVoiceReversed: sharedFolder.defaultVoiceReversed,
        referenceID: user.value + makeid(9),
        isShared: false,
        folderLanguage: sharedFolder.folderLanguage,
        sharedCounter: 0,
        authorID: sharedFolder.authorID,
      };

      await createFolder({ newFolder, userID: user.value }).unwrap();
      if (sharedFolder._id) {
        incrementSharedCounter({ folderMongoId: sharedFolder._id }).catch(() => {});
      }
      toast.success("Dodano kolekcję do Twoich folderów");
      userFoldersResponse.refetch();
      response.refetch();
    } catch (e) {
      toast.error("Nie udało się dodać kolekcji");
    }
  }

  const languageBadge = (lang: string) => (
    <span className="px-2 py-0.5 text-xs rounded-full bg-blue-50 text-blue-600 border border-blue-200">
      {lang}
    </span>
  );

  const AuthorName: React.FC<{ authorID?: string }> = ({ authorID }) => {
    const { data, isSuccess } = useFetchUserQuery(authorID as string, { skip: !authorID });
    const name = isSuccess ? data.userName : "...";
    return <span className="text-sm text-gray-600">Autor: {name}</span>;
  };

  return (
    <div className="flex flex-col w-full h-full bg-gray-100 p-6">
      <FirstTitle>Kolekcje</FirstTitle>
      <div className="flex flex-col gap-4 w-full max-w-5xl mx-auto">
        <div className="flex justify-between items-center">
          <MainTitle>Kolekcje społeczności</MainTitle>
        </div>

        <div className="w-full flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Wyszukaj kolekcje słówek..."
            className="w-full sm:flex-1 h-11 rounded-md border border-gray-300 bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-main focus:border-transparent"
          />
          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="w-full sm:w-56 h-11 rounded-md border border-gray-300 bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-main focus:border-transparent"
          >
            <option value="All">Wszystkie języki</option>
            <option value="Angielski">Angielski</option>
            <option value="Niemiecki">Niemiecki</option>
            <option value="Hiszpański">Hiszpański</option>
            <option value="Francuski">Francuski</option>
            <option value="Włoski">Włoski</option>
          </select>
        </div>
      </div>

      <div className="w-full max-w-5xl mx-auto mt-6">
        {response.isLoading && (
          <div className="text-center text-gray-500">Ładowanie...</div>
        )}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4"
          style={{
            maxWidth: "calc(100% - 20px)",
            overflowY: "auto",
            maxHeight: "calc(100vh - 200px)",
          }}
        >
          {(() => {
            const all = Array.isArray(response.data) ? response.data : [];
            const filtered = all.filter((f) => {
              const matchesSearch = search
                ? f.folderName?.toLowerCase().includes(search.toLowerCase())
                : true;
              const matchesLang = selectedLanguage === "All"
                ? true
                : f.folderLanguage === selectedLanguage;
              return matchesSearch && matchesLang;
            });
            
            // Sortuj według sharedCounter gdy wybrane "Wszystkie języki"
            const sorted = selectedLanguage === "All" 
              ? filtered.sort((a, b) => (b.sharedCounter || 0) - (a.sharedCounter || 0))
              : filtered;
            const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
            const currentPage = Math.min(page, totalPages);
            const start = (currentPage - 1) * pageSize;
            const current = sorted.slice(start, start + pageSize);

            return current.map((c, idx) => (
              <div key={c._id ?? idx} className="flex flex-col bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition duration-300">
                <div
                  className="flex items-start gap-3 bg-secondary p-4 text-white cursor-pointer min-h-[4rem]"
                  onClick={() => { setPreviewFolder(c); preview.toggleModal(); }}
                >
                  <TbFolderFilled className="text-3xl flex-shrink-0 mt-1" />
                  <span className="text-lg font-semibold break-words leading-tight">{c.folderName}</span>
                </div>

                <div className="flex flex-col p-4 gap-2">
                  <div className="flex items-center justify-between">
                    <AuthorName authorID={c.authorID} />
                    {languageBadge(c.folderLanguage)}
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>Słówek: {Array.isArray(c.words) ? c.words.length : 0}</span>
                    <span>Dodało: {c.sharedCounter ?? 0} osób</span>
                  </div>
                </div>

                <div className="flex justify-around items-center bg-gray-100 p-4">
                  {renderActionButton(
                    <FaEdit className="text-lg" />,
                    "Podgląd",
                    () => { setPreviewFolder(c); preview.toggleModal(); }
                  )}
                  {renderActionButton(
                    <MdAddBox className="text-lg text-green-500" />,
                    "Dodaj",
                    () => handleAdd(c)
                  )}
                </div>
              </div>
            ));
          })()}
        </div>
        {response.isSuccess && Array.isArray(response.data) && response.data.length === 0 && (
          <div className="text-center text-gray-500 font-medium mt-4">Brak kolekcji do wyświetlenia.</div>
        )}

        {/* Paginacja */}
        {(() => {
          const all = Array.isArray(response.data) ? response.data : [];
          const filtered = all.filter((f) => {
            const matchesSearch = search
              ? f.folderName?.toLowerCase().includes(search.toLowerCase())
              : true;
            const matchesLang = selectedLanguage === "All"
              ? true
              : f.folderLanguage === selectedLanguage;
            return matchesSearch && matchesLang;
          });
          
          // Sortuj według sharedCounter gdy wybrane "Wszystkie języki"
          const sorted = selectedLanguage === "All" 
            ? filtered.sort((a, b) => (b.sharedCounter || 0) - (a.sharedCounter || 0))
            : filtered;
          const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
          const canPrev = page > 1;
          const canNext = page < totalPages;
          return (
            <div className="flex items-center justify-center gap-3 mt-2">
              <button
                className={`px-3 py-1 rounded-md text-sm ${canPrev ? "bg-secondary text-white hover:bg-secondarylight" : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}
                onClick={() => canPrev && setPage((p) => Math.max(1, p - 1))}
              >
                Poprzednia
              </button>
              <span className="text-sm text-gray-600">Strona {Math.min(page, totalPages)} z {totalPages}</span>
              <button
                className={`px-3 py-1 rounded-md text-sm ${canNext ? "bg-secondary text-white hover:bg-secondarylight" : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}
                onClick={() => canNext && setPage((p) => p + 1)}
              >
                Następna
              </button>
            </div>
          );
        })()}
      </div>
      {/* Preview Modal */}
      <Modal isVisible={preview.isVisible} onClose={preview.closeModal}>
        <div className="absolute bg-whiteMain mt-20 z-20 w-full top-0 bg-white rounded xl:w-2/3 xl:left-0 xl:right-0 xl:mr-auto xl:ml-auto">
          <div className="flex flex-col p-6 max-h-[70vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <TbFolderFilled className="text-2xl text-secondary" />
                <div className="text-xl font-bold">{previewFolder?.folderName}</div>
              </div>
              {previewFolder && (
                <div className="flex items-center gap-2">
                  {languageBadge(previewFolder.folderLanguage)}
                </div>
              )}
            </div>
            {previewFolder && (
              <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                <AuthorName authorID={previewFolder.authorID} />
                <div className="flex gap-4">
                  <span>Słówek: {Array.isArray(previewFolder.words) ? previewFolder.words.length : 0}</span>
                  <span>W kolekcjach: {previewFolder.sharedCounter ?? 0}</span>
                </div>
              </div>
            )}
            <div className="w-full bg-white border rounded">
              <div className="grid grid-cols-2 gap-2 p-3 font-semibold text-fifth border-b">
                <div>Słowo</div>
                <div>Tłumaczenie</div>
              </div>
              <div className="max-h-[50vh] overflow-y-auto">
                {Array.isArray(previewFolder?.words) && previewFolder?.words.length > 0 ? (
                  previewFolder.words.map((w: any, i: number) => (
                    <div key={i} className="grid grid-cols-2 gap-2 p-3 border-b text-sm">
                      <div className="truncate">{w.word}</div>
                      <div className="truncate">{w.translation}</div>
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-sm text-gray-500">Brak słów do wyświetlenia.</div>
                )}
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <button onClick={preview.closeModal} className="px-4 py-2 bg-secondary text-white rounded-md hover:bg-secondarylight">Zamknij</button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CollectionsPage;

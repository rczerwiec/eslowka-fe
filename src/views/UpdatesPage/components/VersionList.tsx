interface IProps{
    children: React.ReactNode;
    version: string;
}

function VersionList({children, version}:IProps) {
  return (
    <>
      <div className="text-lg font-inter font-bold">{version}</div>
      <div>
        <ul className="pl-2 text-sm font-inter">
          {children}
        </ul>
      </div>
    </>
  );
}

export default VersionList;

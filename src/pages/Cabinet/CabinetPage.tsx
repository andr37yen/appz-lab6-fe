
import DocumentBlock from "./components/Documents/DocumentBlock";
import ProfileBlock from "./components/Profile/AccountBlock";

function CabinetPage() {
  return (
      <div className=" w-full flex justify-center p-8" style={{height: "52rem"}}>
        <div className="bg-white p-6 rounded-xl mr-4  border-2 border-gray-200 w-96 block">
          <ProfileBlock />
        </div>
        <div className="bg-white p-6 rounded-xl blo k flex-1 border-2 overflow-y-auto">
          <DocumentBlock />
        </div>
      </div>
  );
}

export default CabinetPage;


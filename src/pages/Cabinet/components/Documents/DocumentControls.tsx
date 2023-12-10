import React from "react";
import { IDocumentView, SortTypesState } from "../../../../types/types";
import { readFileContent } from "../../../../utils/fileReader";

interface DocumentControlsProps {
  searchQuery: string;
  sortType: SortTypesState;
  setSearchQuery: (query: string) => void;
  setSortType: (sortType: SortTypesState) => void;
  onUpload: (document: IDocumentView) => void;
}

const DocumentControls: React.FC<DocumentControlsProps> = ({
  searchQuery,
  sortType,
  setSearchQuery,
  setSortType,
  onUpload,
}) => {
  const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const fileContent = await readFileContent(file);

        onUpload({
          isVerified: false,
          uploadDate: new Date(),
          name: file.name,
          content: fileContent,
        });
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="flex justify-between mb-4">
      <div>
        <input
          type="text"
          placeholder="Search notifications..."
          className="px-4 py-2 border rounded-md"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select
          className="px-4 py-2 border rounded-md ml-4"
          value={sortType}
          onChange={(e) => setSortType(e.target.value as SortTypesState)}>
          <option value="none">None</option>
          <option value="date">Sort by Date</option>
          <option value="type">Sort by Verification</option>
        </select>
      </div>
      <input
        type="file"
        onChange={handleFileSelect}
        className="hidden"
        id="file-upload"
      />
      <label
        htmlFor="file-upload"
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded cursor-pointer">
        Load New
      </label>
    </div>
  );
};

export default DocumentControls;


import React, { useMemo, useState } from "react";
import { useDocuments } from "../../hooks/useDocuments";
import { SortTypesState } from "../../../../types/types";
import DescriptionIcon from "@mui/icons-material/Description";

const DocumentBlock: React.FC = () => {
  const { documents, error, loading, createDocument, deleteDocument } =
    useDocuments();
  const [sortType, setSortType] = useState<SortTypesState>("none");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredAndSortedDocuments = useMemo(() => {
    const filtered = documents.filter(
      (document) =>
        document.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        document.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const sorted = [...filtered];
    if (sortType === "date") {
      sorted.sort((a, b) => -a.uploadDate.getTime() + b.uploadDate.getTime());
    } else if (sortType === "type") {
      sorted.sort((a, b) => -Number(a.isVerified) + Number(b.isVerified));
    }

    return sorted;
  }, [sortType, searchQuery, documents]);

  if (loading) return <div>Loading...</div>;

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
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
        <button
          onClick={() => { alert("Document successfully uploaded")}}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          Load New
        </button>
      </div>
      <div>
        {filteredAndSortedDocuments.map((doc, index) => (
          <div
            key={index}
            className="border-b border-gray-200 py-2 flex justify-stretch">
            <div className="flex-1 flex items-center">
              <DescriptionIcon fontSize={"large"} className="scale-150 text-blue-500" />
              <div className="ml-6">
                <h5 className="font-bold">{doc.title}</h5>
                <p>{doc.description}</p>
                <p>Verified: {doc.isVerified ? "Yes" : "No"}</p>
                <p>Upload Date: {doc.uploadDate.toDateString()}</p>
              </div>
            </div>
            <button
              onClick={() => deleteDocument(doc.id)}
              className="text-red-500 hover:text-red-700 block w-20">
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DocumentBlock;


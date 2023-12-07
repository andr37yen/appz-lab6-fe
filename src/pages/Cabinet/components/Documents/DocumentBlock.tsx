import React, { useContext, useMemo, useState } from "react";
import { useDocuments } from "../../hooks/useDocuments";
import { SortTypesState } from "../../../../types/types";
import DocumentControls from "./DocumentControls";
import DocumentList from "./DocumentList";
import { AuthContext } from "../../../../providers/authProvider";

const DocumentBlock: React.FC = () => {
  const { user } = useContext(AuthContext)!;
  const {
    documents,
    error,
    loading,
    createDocument,
    deleteDocument,
    verifyDocument,
  } = useDocuments((user!).id);
  const [sortType, setSortType] = useState<SortTypesState>("none");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredAndSortedDocuments = useMemo(() => {
    const filtered = documents.filter(
      (document) =>
        document.title.toLowerCase().includes(searchQuery.toLowerCase())
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
      <DocumentControls
        searchQuery={searchQuery}
        sortType={sortType}
        setSearchQuery={setSearchQuery}
        setSortType={setSortType}
        onUpload={createDocument}
      />
      <DocumentList
        documents={filteredAndSortedDocuments}
        onDelete={deleteDocument}
        onVerify={verifyDocument}
      />
    </div>
  );
};

export default DocumentBlock;


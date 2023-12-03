import React from "react";
import DocumentItem from "./DocumentItem";
import { IDocument } from "../../../../types/types";

interface DocumentListProps {
  documents: IDocument[];
  onDelete: (id: string) => void;
  onVerify: (id: string) => void;
}

const DocumentList: React.FC<DocumentListProps> = ({
  documents,
  onDelete,
  onVerify,
}) => {
  return (
    <div>
      {documents.map((doc, index) => (
        <DocumentItem
          key={index}
          document={doc}
          onDelete={onDelete}
          onVerify={onVerify}
        />
      ))}
    </div>
  );
};

export default DocumentList;


import React from "react";
import DescriptionIcon from "@mui/icons-material/Description";
import { IDocument } from "../../../../types/types"; // Adjust the import path

interface DocumentItemProps {
  document: IDocument;
  onDelete: (id: string) => void;
  onVerify: (id: string) => void;
}

const DocumentItem: React.FC<DocumentItemProps> = ({
  document,
  onDelete,
  onVerify,
}) => {
  return (
    <div className="border-b border-gray-200 py-2 flex justify-stretch">
      <div className="flex-1 flex items-center">
        <DescriptionIcon
          fontSize={"large"}
          className="scale-150 text-blue-500"
        />
        <div className="ml-6">
          <h5 className="font-bold hover:underline">
            <a href={document.url} target="_blank" rel="noopener noreferrer">
              {document.name}
            </a>
          </h5>
          <p>Verified: {document.isVerified ? "Yes" : "No"}</p>
          <p>Upload Date: {document.uploadDate.toDateString()}</p>
        </div>
      </div>
      <div className="flex flex-col justify-evenly">
        {!document.isVerified && (
          <button
            className="text-blue-500 hover:text-blue-700 block w-20"
            onClick={() => onVerify(document.id)}>
            Verify
          </button>
        )}
        <button
          onClick={() => onDelete(document.id)}
          className="text-red-500 hover:text-red-700 block w-20">
          Delete
        </button>
      </div>
    </div>
  );
};

export default DocumentItem;


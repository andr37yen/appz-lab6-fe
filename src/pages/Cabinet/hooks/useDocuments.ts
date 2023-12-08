import { useEffect, useState } from "react";
import { IDocument, IDocumentView } from "../../../types/types";

export const useDocuments = () => {
  const [documents, setDocuments] = useState<IDocument[]>([
    {
      id: "doc1",
      title: "Medical Report 2021",
      isVerified: true,
      uploadDate: new Date("2022-01-15"),
      url: "#",
      userId: "1",
    },
    {
      id: "doc2",
      title: "Insurance Policy",
      isVerified: false,
      uploadDate: new Date("2022-03-05"),
      url: "#",
      userId: "1",
    },
    {
      id: "doc3",
      title: "Prescription List",
      isVerified: true,
      uploadDate: new Date("2022-04-20"),
      url: "#",
      userId: "1",
    },
    {
      id: "doc8",
      title: "Eye Exam Report",
      isVerified: false,
      uploadDate: new Date("2022-10-10"),
      url: "#",
      userId: "1",
    },
    {
      id: "doc3",
      title: "Prescription List",
      isVerified: true,
      uploadDate: new Date("2022-04-20"),
      url: "#",
      userId: "1",
    },
    {
      id: "doc8",
      title: "Eye Exam Report",
      isVerified: false,
      uploadDate: new Date("2022-10-10"),
      url: "#",
      userId: "1",
    },
  ]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        setDocuments(documents);
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, []);

  const deleteDocument = async (id: string) => {
    setDocuments([...documents.filter((d) => d.id !== id)]);
  };

  const createDocument = async (document: IDocumentView) => {
    setDocuments([
      ...documents,
      {
        ...document,
        id: `${Math.ceil(Math.random() * 1000000)}`,
        userId: "1",
        url: "#",
      },
    ]);
  };

  const verifyDocument = async (id: string) => {
    alert(`Verifying Document ${id}...`);
  };

  return {
    documents,
    loading,
    error,
    deleteDocument,
    createDocument,
    verifyDocument,
  };
};


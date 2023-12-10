import { useEffect, useState } from "react";
import { IBaseDocument, IDocument } from "../../../types/types";
import { apiCreateDocument, apiDeleteDocument, apiVerifyDocument, getDocumentsByPatientId } from "../../../api";

export const useDocuments = (userId: string) => {
  const [documents, setDocuments] = useState<IDocument[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchDocuments = async () => {
    try {
      const newDocs = await getDocumentsByPatientId(userId);
      setDocuments(newDocs);
    } catch (error) {
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  };

  const deleteDocument = async (id: string) => {
    try {
      await apiDeleteDocument(id);
    } catch (error) {
      alert((error as Error).message)
    } finally {
      await fetchDocuments();
    }
  };

  const createDocument = async (document: IBaseDocument) => {
    try {
      await apiCreateDocument(document);
    } catch (error) {
      alert((error as Error).message)
    } finally {
      await fetchDocuments();
    }
  };

  const verifyDocument = async (id: string) => {
    try {
      await apiVerifyDocument(id);
    } catch (error) {
      alert((error as Error).message)
    } finally {
      await fetchDocuments();
    }
  };

  useEffect(() => {
    fetchDocuments()
    console.log("Fetching documents...");
  }, [userId]);

  useEffect(() => {
    console.log("Fetched documents: ", documents);
  }, [documents]);

  return {
    documents,
    loading,
    error,
    deleteDocument,
    createDocument,
    verifyDocument,
  };
};


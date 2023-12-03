import { useEffect, useState } from "react";
import { IBaseDocument, IDocument } from "../../../types/types";

const exampleDocuments: IDocument[] = [
    {
      id: 'doc1',
      title: 'Medical Report 2021',
      description: 'Comprehensive medical report for the year 2021.',
      isVerified: true,
      uploadDate: new Date('2022-01-15')
    },
    {
      id: 'doc2',
      title: 'Insurance Policy',
      description: 'Details of the current health insurance policy.',
      isVerified: false,
      uploadDate: new Date('2022-03-05')
    },
    {
      id: 'doc3',
      title: 'Prescription List',
      description: 'List of prescribed medications for the current year.',
      isVerified: true,
      uploadDate: new Date('2022-04-20')
    },
    {
      id: 'doc8',
      title: 'Eye Exam Report',
      description: 'Detailed report from the last eye examination.',
      isVerified: false,
      uploadDate: new Date('2022-10-10')
    },
    {
      id: 'doc3',
      title: 'Prescription List',
      description: 'List of prescribed medications for the current year.',
      isVerified: true,
      uploadDate: new Date('2022-04-20')
    },
    {
      id: 'doc8',
      title: 'Eye Exam Report',
      description: 'Detailed report from the last eye examination.',
      isVerified: false,
      uploadDate: new Date('2022-10-10')
    }
];

export const useDocuments = () => {
  const [documents, setDocuments] = useState<IDocument[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        setDocuments(exampleDocuments);
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, []);

  const deleteDocument = async (_id: string) => {

  }

  const createDocument = async (_document: IBaseDocument) => {

  }

  return { documents, loading, error, deleteDocument, createDocument };
};
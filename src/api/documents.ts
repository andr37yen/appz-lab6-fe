import axios from "axios";
import { IBaseDocument, IDocument } from "../types/types";
import { APP_DOMAIN } from "../config";

export const getDocumentsByPatientId = async (
  id: string
): Promise<IDocument[]> => {
  try {
    const res = await axios.get<IDocument[]>(`${APP_DOMAIN}/documents/${id}`);
    return res.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch documents");
  }
};

export const createDocument = async (
  document: IBaseDocument
): Promise<object> => {
  try {
    const res = await axios.post(`${APP_DOMAIN}/documents`, document);
    return res;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create document");
  }
};

export const deleteDocument = async (id: string): Promise<object> => {
  try {
    const res = await axios.delete(`${APP_DOMAIN}/documents/${id}`);
    return res;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to delete document");
  }
};

export const verifyDocument = async (id: string): Promise<object> => {
  try {
    const res = await axios.post(`${APP_DOMAIN}/documents/verify${id}`, {});
    return res;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to verify document");
  }
};


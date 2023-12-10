import axios from "axios";
import { IBaseDocument, IDocument, IDocumentDto } from "../types/types";
import { APP_DOMAIN } from "../config";
import { convertToTrueDocument } from "../utils/typeConverter";

export const getDocumentsByPatientId = async (
  id: string
): Promise<IDocument[]> => {
  try {
    const res = await axios.get<IDocumentDto[]>(`${APP_DOMAIN}/documents/${id}`);
    return res.data.map(doc => convertToTrueDocument(doc));
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch documents");
  }
};

export const apiCreateDocument = async (
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

export const apiDeleteDocument = async (id: string): Promise<object> => {
  try {
    const res = await axios.delete(`${APP_DOMAIN}/documents/${id}`);
    return res;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to delete document");
  }
};

export const apiVerifyDocument = async (id: string): Promise<object> => {
  try {
    const res = await axios.post(`${APP_DOMAIN}/documents/verify${id}`, {});
    return res;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to verify document");
  }
};


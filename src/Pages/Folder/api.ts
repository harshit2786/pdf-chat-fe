import toast from "react-hot-toast";
import { setBaseUrl } from "../../Utils/api";

export interface SingleFolder {
    id : number,
    name : string,
    description : string,
    color : string,
    pdfs : PdfInterface[]
}

interface PdfInterface {
    id : number,
    fileName : string,
    url : string,
    status : "INQUEUE" | "PROCESSED",
    totalPages : number,
    uploadedAt : number
}

export const fetchSingleFolder = async (
  token: string,
  id : string
): Promise<SingleFolder> => {
  const res = await fetch(setBaseUrl(`/folder/${id}`), {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    toast.error("Failed to fetch folder")
    throw new Error("Failed to fetch folder");
  }

  const data = await res.json();
  return data;
};
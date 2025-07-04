import toast from "react-hot-toast";
import { setBaseUrl } from "../../Utils/api";

export interface SingleFolder {
  id: number;
  name: string;
  description: string;
  color: string;
  pdfs: PdfInterface[];
}

interface PdfInterface {
  id: number;
  fileName: string;
  url: string;
  status: "INQUEUE" | "PROCESSED";
  totalPages: number;
  uploadedAt: number;
}

export const fetchSingleFolder = async (
  token: string,
  id: string
): Promise<SingleFolder> => {
  const res = await fetch(setBaseUrl(`/folder/${id}`), {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    toast.error("Failed to fetch folder");
    throw new Error("Failed to fetch folder");
  }

  const data = await res.json();
  return data;
};

export const deletePdf = async (token: string, pdfId: number) => {
  try {
    const res = await fetch(setBaseUrl(`/pdf/${pdfId}`), {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error("Failed to delete PDF");
    }

    toast.success("PDF deleted successfully.");
  } catch (err) {
    console.error("Error deleting PDF:", err);
    toast.error("Failed to delete PDF.");
  }
};

export const downloadPdf = async (token: string, pdfId: number) => {
  try {
    const res = await fetch(setBaseUrl(`/pdf/${pdfId}`), {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error("Failed to download PDF");
    }

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `pdf-${pdfId}.pdf`; // or get from response headers if needed
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
  } catch (err) {
    console.error("Error downloading PDF:", err);
    alert("Failed to download PDF.");
  }
};

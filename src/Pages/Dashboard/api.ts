import toast from "react-hot-toast";
import { setBaseUrl } from "../../Utils/api";

export interface FoldersList {
  id: number;
  name: string;
  description: string;
  createdAt: number;
  color: string;
  pdfNum: number;
}

export interface FinalListResponse {
  currentPage: number;
  folders: FoldersList[];
  totalPages: number;
}

export const fetchFolderList = async (
  token: string,
  page = 1,
  query = ""
): Promise<FinalListResponse> => {
  const res = await fetch(setBaseUrl(`/folder?page=${page}&query=${query}`), {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch folders");
  }

  const data = await res.json();
  return data;
};

export const createFolder = async (
  token: string,
  name: string,
  description: string,
  color: string
): Promise<void> => {
  toast.loading("Creating folder...");
  const res = await fetch(setBaseUrl(`/folder`), {
    method: "POST",
    body: JSON.stringify({ name, description, color }),
    headers: {
      Authorization: `Bearer ${token}`,
      "content-type": "application/json",
    },
  });

  if (!res.ok) {
    toast.error("Failed to create folder");
    throw new Error("Failed to create folder");
  }
  return;
};

export const updateFolder = async (
  token: string,
  name: string,
  description: string,
  color: string,
  id: number
): Promise<void> => {
  toast.loading("Updating folder...");
  const res = await fetch(setBaseUrl(`/folder/${id}`), {
    method: "PUT",
    body: JSON.stringify({ name, description, color }),
    headers: {
      Authorization: `Bearer ${token}`,
      "content-type": "application/json",
    },
  });

  if (!res.ok) {
    toast.error("Failed to update folder");
    throw new Error("Failed to update folder");
  }
  return;
};

export const deleteFolder = async (
  token: string,
  id: number
): Promise<void> => {
  toast.loading("Deleting folder...");
  const res = await fetch(setBaseUrl(`/folder/${id}`), {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    toast.error("Failed to delete folder");
    throw new Error("Failed to delete folder");
  }
  return;
};

export const updateAvatar = async (
  token: string,
  avatar: string,
): Promise<void> => {
  toast.loading("Updating folder...");
  const res = await fetch(setBaseUrl(`/auth/avatar`), {
    method: "PUT",
    body: JSON.stringify({ avatar}),
    headers: {
      Authorization: `Bearer ${token}`,
      "content-type": "application/json",
    },
  });

  if (!res.ok) {
    toast.error("Failed to update avatar");
    throw new Error("Failed to update folder");
  }
  return;
};
import { VolumeData } from "./types";

const ROOT_URL = "https://www.googleapis.com/books/v1";

export const getVolumes = async (
  query: string,
  startIndex: number = 0,
  maxResults: number = 10,
  subjects: string[] = ["action"]
): Promise<VolumeData[] | undefined> => {
  const queryString = subjects.length
    ? `${query}+subject:${subjects.join("+")}`
    : query;

  const params = new URLSearchParams({
    startIndex: startIndex.toString(),
    maxResults: maxResults.toString(),
    q: queryString,
  });

  const response = await fetch(`${ROOT_URL}/volumes?${params.toString()}`);

  if (!response.ok) {
    const errorMessage = await response.text();
    return Promise.reject(new Error(errorMessage));
  }

  return await response.json();
};

export const getVolumeDetails = async (
  id: number
): Promise<VolumeData | undefined> => {
  const response = await fetch(`${ROOT_URL}/volumes/${id}`);

  if (!response.ok) {
    const errorMessage = await response.text();
    return Promise.reject(new Error(errorMessage));
  }

  return await response.json();
};

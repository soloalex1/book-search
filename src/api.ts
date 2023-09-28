import { VolumeData, JSONResponse } from "./types";

const ROOT_URL = "https://www.googleapis.com/books/v1";

export const getVolumes = async (
  query: string,
  startIndex: number = 0,
  maxResults: number = 10
): Promise<VolumeData[]> => {
  const params = new URLSearchParams({
    startIndex: startIndex.toString(),
    maxResults: maxResults.toString(),
    q: query,
  });

  const response = await fetch(`${ROOT_URL}/volumes?${params.toString()}`);

  if (!response.ok) {
    const errorMessage = await response.text();
    return Promise.reject(new Error(errorMessage));
  }

  const { items }: JSONResponse = await response.json();
  return items;
};

export const getSubjects = async (subjects: string[]) => {
  const allResponses = subjects.map(async (subject) => {
    const params = new URLSearchParams({
      q: `subject:${subject}`,
    });

    const response = await fetch(`${ROOT_URL}/volumes?${params.toString()}`);

    if (!response.ok) {
      const errorMessage = await response.text();
      return Promise.reject(new Error(errorMessage));
    }

    const { items }: JSONResponse = await response.json();
    return { subject, items };
  });

  return Promise.all(allResponses);
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

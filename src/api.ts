const ROOT_URL = "https://www.googleapis.com/books/v1";

export const getVolumes = async (
  query: string,
  startIndex: number = 0,
  maxResults: number = 10
): Promise<unknown[] | undefined> => {
  try {
    const params = new URLSearchParams({
      q: query,
      startIndex: startIndex.toString(),
      maxResults: maxResults.toString(),
    });

    const response = await fetch(`${ROOT_URL}/volumes?${params.toString()}`);

    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    throw new Error(
      "Ocorreu um erro na sua consulta. Tente novamente mais tarde. "
    );
  }
};

export const getVolumeDetails = async (id: number): Promise<unknown> => {
  try {
    const response = await fetch(`${ROOT_URL}/volumes/${id}`);

    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    throw new Error(
      "Ocorreu um erro ao obter os dados do livro. Tente novamente mais tarde. "
    );
  }
};

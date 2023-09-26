const ROOT_URL = "https://www.googleapis.com/books/v1";

export const getVolumeDetails = async (query: string) => {
  try {
    const response = await fetch(`${ROOT_URL}/volumes?q=${query}`);

    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    throw new Error(
      "Ocorreu um erro na sua consulta. Tente novamente mais tarde. "
    );
  }
};

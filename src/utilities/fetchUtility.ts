export const fetchFromApi = async (offset: number = 0, pageSize: number = 12) => {
  try {
    const response = await fetch(
      `https://api.spacexdata.com/v5/launches`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch data from the SpaceX API');
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const convertUTCToLocalDateTime = (utcTime: string): string => {
  const date = new Date(utcTime);

  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based
  const year = date.getFullYear().toString();

  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');

  const formattedDateTime = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  return formattedDateTime;
}
export default async function FetchData(day, month, year) {
    try {
        const response = await fetch(
            `${import.meta.env.VITE_API_URL}/api/content?day=${day}&month=${month + 1}&year=${year}`,
            { credentials: 'include' }
        );

        const text = await response.text();
        const data = text ? JSON.parse(text) : [];

        if (response.ok) {
            return data;
        } else {
            console.error('FetchData error:', data.message);
            return [];
        }
    } catch (error) {
        console.error('Error in FetchData utility:', error);
        return [];
    }
}
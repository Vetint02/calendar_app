export default async function FetchData(day, month, year) {
    try {
        const response = await fetch('https://calendar-app-backend-q3hl.onrender.com/api/content/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ day, month, year }),
            credentials: 'include' 
        });

        if (!response.ok) {
            console.log("api request failed")
            return null
        }

        const data = await response.json();
        return data; 

    } catch (error) {
        console.error("Error in FetchData utility:", error.message);
        return null;
    }
}
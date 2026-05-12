
export async function getRecommendation(userData, watchLength) {
    const response = await fetch('http://localhost:3000/api/recommendation', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userData, watchLength })
        });
    return response.json();
}
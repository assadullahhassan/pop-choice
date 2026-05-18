
export async function getRecommendation(userData, watchLength) {
    try {
        const response = await fetch('http://localhost:3000/api/recommendation', {
            method: 'POST',
            headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userData, watchLength })
            });
        return response.json();
    } catch (error) {
        console.error('Error fetching recommendation:', error);
        return null;
    }
    
}

export async function getPoster(tvSeriesId) {
    const response = await fetch(`http://localhost:3000/api/poster?tvSeriesId=${tvSeriesId}`);
    return response.json();
}
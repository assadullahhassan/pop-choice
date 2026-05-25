
export async function getRecommendation(userData, watchLength, oldRecommendation) {
    try {
        const response = await fetch('https://pop-choice-mm29.onrender.com/api/recommendation', {
            method: 'POST',
            headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userData, watchLength, oldRecommendation })
            });
        return response.json();
    } catch (error) {
        console.error('Error fetching recommendation:', error);
        return null;
    }
    
}

export async function getPoster(tvSeriesId) {
    const response = await fetch(`https://pop-choice-mm29.onrender.com/api/poster?tvSeriesId=${tvSeriesId}`);
    return response.json();
}
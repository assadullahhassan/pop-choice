// import { openai, supabase } from './config.js';
// import { get } from "http";
import { getRecommendation, getPoster } from "./apicall.js";

const firstForm = document.querySelector('#first-form');
const secondForm = document.querySelector('#second-form');
const resultsSection = document.querySelector('#results');
const moodButtons = document.querySelectorAll('#mood-btn');
const otherMoodButtons = document.querySelectorAll('#othermood-btn');
const firstFormContainer = document.querySelector('.first-form-container');
const secondFormContainer = document.querySelector('.second-form-container');
const personCount = document.querySelector('#person-count');
const loader = document.querySelector('#loader');
const errorHand = document.querySelector('#error')

let userData = {};
let person = 1;
let userDataArray = [];
let initialPerson = 1;
let watchLength = '';
const posterPlaceholder = `./assets/image/poster_placeholder.png`;


firstForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(firstForm);
    person = formData.get('peoplenum');
    watchLength = formData.get('time');
    personCount.textContent = initialPerson;
    firstFormContainer.style.display = 'none';
    secondFormContainer.style.display = 'block';
    // getPosterImg();
});

secondForm.addEventListener('submit', async (e) => {
    e.preventDefault();
   
    if (person > 1) {
         userData.person = initialPerson;
        initialPerson++;
        const formData = new FormData(secondForm);
        userData.favorite_movie = formData.get('favorite_movie');
        userData.famous_person = formData.get('famous_person');
        userDataArray.push(userData);
        console.log(userDataArray);
        userData = {};
        clearMoodSelection();
        secondForm.reset();
        personCount.textContent = initialPerson;
        if (initialPerson > person) {
            secondFormContainer.style.display = 'none';
            loadRecommendation(userDataArray, watchLength);
        }
    } else {
        const formData = new FormData(secondForm);
        userData.favorite_movie = formData.get('favorite_movie');
        userData.famous_person = formData.get('famous_person');
        secondFormContainer.style.display = 'none';
            // resultsSection.innerHTML = resultsHTML;

        loadRecommendation(userData, watchLength);
    }
});

moodButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        if (e.target.id === 'mood-btn') {
            const selectedValue = e.target.getAttribute('data-value');  
            moodButtons.forEach(btn => btn.classList.remove('selected'));
            e.target.classList.add('selected');
            userData.mood = selectedValue;
            console.log(userData);
        }
    });
});

otherMoodButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        if (e.target.id === 'othermood-btn') {
            const selectedValue = e.target.getAttribute('data-value');  
            otherMoodButtons.forEach(btn => btn.classList.remove('selected'));
            e.target.classList.add('selected');
            userData.other_mood = selectedValue;
            console.log(userData);
        }
    });
});

function clearMoodSelection() {
    moodButtons.forEach(btn => btn.classList.remove('selected'));
    otherMoodButtons.forEach(btn => btn.classList.remove('selected'));
}

 function getPosterImg(title, description) {

const API_KEY = '';

const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(title)}`;
const imageBaseUrl = 'https://image.tmdb.org/t/p/w500';


 fetch(url)
  .then(response => response.json())
  .then(data => {
  
    if (data.results && data.results.length > 0) {
      const firstMovie = data.results[0];
      const posterPath = firstMovie.poster_path;

      if (posterPath) {
        const fullPosterUrl = `${imageBaseUrl}${posterPath}`;
        console.log(`Movie Title: ${firstMovie.title}`);
        console.log(`Poster URL: ${fullPosterUrl}`);
        // return fullPosterUrl;
         renderResults(title, description, fullPosterUrl);
      } else {
        renderResults(title, description, posterPlaceholder);
      }
    } else {
      console.log('No movies found matching that title.');
    renderResults(title, description, posterPlaceholder);
    }
  })
  .catch(error => {
    console.error('Error fetching data:', error)
    loader.style.display = 'none';
  });
  
}

function renderResults(title, description, posterUrl) {
    resultsSection.innerHTML = `
            <p>Based on your answers, we recommend</p>
            <h1>${title}</h1>
             <img src="${posterUrl}" alt="${title} poster">
             <p>${description}</p>
             <div class="btn">
            <button class="btn-next" onclick="fetchRecommendation()">Next movie</button>
            </div>
        `;
        loader.style.display = 'none';
}

function fetchRecommendation() {
    resultsSection.innerHTML = ``;
    if (initialPerson > 1) {
        loadRecommendation(userDataArray, watchLength);
    } else {
        loadRecommendation(userData, watchLength);
    }
}

async function loadRecommendation(userData, watchLength) {
     loader.style.display = 'block';
    const recommendation = await getRecommendation(userData, watchLength);
        if (recommendation === null) {
            console.error("Failed to fetch recommendation.");
            loader.style.display = 'none';
            errorHand.innerHTML = `<p>Sorry, we couldn't fetch a recommendation at this time. Please try again later.</p>
            <div class="btn">
            <button class="btn-next" onclick="location.reload()">Try Again</button>
            </div>`;
            return;
        }
        console.log("Received recommendation:", recommendation);
        const parsedRecommendation = JSON.parse(recommendation);
        getPosterImg(parsedRecommendation.title, parsedRecommendation.description);
}
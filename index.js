// import { openai, supabase } from './config.js';
const firstForm = document.querySelector('#first-form');
const secondForm = document.querySelector('#second-form');
const resultsSection = document.querySelector('#results');
const moodButtons = document.querySelectorAll('#mood-btn');
const otherMoodButtons = document.querySelectorAll('#othermood-btn');
const firstFormContainer = document.querySelector('.first-form-container');
const secondFormContainer = document.querySelector('.second-form-container');


let main = document.querySelector('#main-section');

let userData = {};
let person = 1;

firstForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(firstForm);
    userData.peoplenum = formData.get('peoplenum');
    person = userData.peoplenum;
    userData.time = formData.get('time');
    firstFormContainer.style.display = 'none';
    secondFormContainer.style.display = 'block';
});

secondForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(secondForm);
    userData.favorite_movie = formData.get('favorite_movie');
    userData.famous_person = formData.get('famous_person');
        console.log(userData);
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

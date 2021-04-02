'use strict';

const inputQuestion = document.querySelector('#input-q');
const inputAnswer = document.querySelector('#input-a');
const btnAdd = document.querySelector('#btn-add');
const cardContainer = document.querySelector('#card-cont');
const popup = document.querySelector('#popup');
const popupQuestion = document.querySelector('#popup-q');
const popupAnswer = document.querySelector('#popup-a');

let randomNum;
let generatedId = 0;
let currentQuestionIdEdit;
let currentAnswerIdEdit;

/*selection of image url via random last number in url file name*/
const generateRandomNum = () => {
    /*images in './res' numbered from 1 to 10*/
    randomNum = Math.round(Math.random() * 10 + 1);

    if(randomNum > 10){
        randomNum = 10;
    }
}

btnAdd.addEventListener('click', (e) => {
    if(inputQuestion.value && inputAnswer.value){
        cardContainer.insertAdjacentHTML('beforeend', 
            `
                <div class="card round-border">
                    <div class="card__side card__front center transition-slow round-border">
                        <h2 class="h2" id="card-q-${generatedId}">${inputQuestion.value}</h2>
                    </div>

                    <div class="card__side card__back column transition-slow round-border">
                        <h2 class="h2 h2-white" id="card-a-${generatedId}">${inputAnswer.value}</h2>

                        <div class="card__row row">
                            <button class="btn btn-short btn-short--edit center transition round-border">Edit</button>

                            <button class="btn btn-short btn-short--delete center transition round-border">Delete</button>
                        </div>
                    </div>
                </div>
            `
        );

        /*incrementally generate unique ids for each card's h2 elements*/
        generatedId += 1;

        /*clear input fields*/
        inputQuestion.value = '';
        inputAnswer.value = ''; 

        generateRandomNum();

        cardContainer.lastElementChild.lastElementChild.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('./res/card-background-${randomNum}.jpg')`; 
    } else {
        popup.classList.remove('hidden');
        popup.firstElementChild.classList.remove('hidden');
    }
});

cardContainer.addEventListener('click', (e) => {
    /*card deleted button clicked*/
    if(e.target.classList.contains('btn-short--delete')) e.target.closest('.card').remove();

    /*card edit button clicked*/
    if(e.target.classList.contains('btn-short--edit')) {
        /*pulling the specific card question and answer values, into the edit input fields*/
        popupQuestion.value = e.target.parentElement.parentElement.previousElementSibling.firstElementChild.textContent;
        popupAnswer.value = e.target.parentElement.previousElementSibling.textContent;

        /*set the current answer and question ids so I can change the textContent through the popup edit via .getElementById()*/
        currentQuestionIdEdit = e.target.parentElement.parentElement.previousElementSibling.firstElementChild.id;
        currentAnswerIdEdit = e.target.parentElement.previousElementSibling.id;
        console.log(currentQuestionIdEdit, currentAnswerIdEdit);
        
        popup.classList.remove('hidden');
        popup.lastElementChild.classList.remove('hidden');
    }
});

popup.addEventListener('click', (e) => {
    /*error popup 'okay' button clicked; only clicking 'okay' button removes 'error' popup*/
    if(e.target.parentElement.classList.contains('popup__error')){
        popup.classList.add('hidden');
        e.target.closest('.popup__error').classList.add('hidden');
        return;
    }

    /*edit popup 'confirm' button clicked*/
    if(e.target.parentElement.classList.contains('popup__edit')){
        if(currentQuestionIdEdit && currentAnswerIdEdit){
            document.getElementById(`${currentQuestionIdEdit}`).textContent = popupQuestion.value;
            document.getElementById(`${currentAnswerIdEdit}`).textContent = popupAnswer.value;
        }

        popup.classList.add('hidden');
        e.target.closest('.popup__edit').classList.add('hidden');
        return;
    }
});
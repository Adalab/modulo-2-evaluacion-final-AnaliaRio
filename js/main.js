"use strict";

// C - Input
const input = document.querySelector(".js-input");
// C- Search Button
const searchBtn = document.querySelector(".js-search");
// C - Reset Btn
const resetBtn = document.querySelector(".js-reset");
// C - List
const renderizedList = document.querySelector(".js-list");
// C - Input Value
const inputValue = input.value;


// FETCH
let drinksList = [];

function getData () {
const inputValue = input.value;

 fetch(
     `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputValue}`)
  .then(response => response.json())
  .then(data => {
    drinksList = data.drinks;
    renderList(drinksList);
  }); 
}

// RENDER DRINK LIST IN HTML
function renderList (listDrinks) {
    for (const drink of listDrinks) {
        renderizedList.innerHTML +=  `<li><h2>${drink.strDrink}</h2><img src=${drink.strDrinkThumb} class="img" alt="cocktail"></li>`;
    }
};

function handleSearchBtnClick(event) {
    event.preventDefault();
    getData();
}

searchBtn.addEventListener("click",handleSearchBtnClick);


// RESET RENDERIZED DRINK LIST
function resetList () {
    drinksList = [];
    renderizedList.innerHTML = "";
};

function handleResetBtnClick(event) {
    event.preventDefault();
    resetList();
}

resetBtn.addEventListener("click",handleResetBtnClick);












"use strict";

// CONSTANTS
const input = document.querySelector(".js-input");
const searchBtn = document.querySelector(".js-search");
const resetBtn = document.querySelector(".js-reset");
const renderedList = document.querySelector(".js-list");
const renderedFavoritesList = document.querySelector(".js-favorites");
const inputValue = input.value;
const SERVER_URL = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s="

// FETCH DATA FROM API
let drinksList = [];

function getData () {
const inputValue = input.value;

 fetch(`${SERVER_URL}${inputValue}`)
  .then(response => response.json())
  .then(data => {
    drinksList = data.drinks;
    renderList(drinksList);
  }); 
}

// RENDER SEARCH RESULT IN HTML
function renderList (listDrinks) {
    for (const drink of listDrinks) {
        
        const favoriteFoundIndex = favorites.findIndex(fav=>{
            return fav.idDrink !== -1;
            // Find variable that says if drink is favorite or not.
        }); 
    
        if( favoriteFoundIndex === -1){ // Not in favorites.
            renderedList.innerHTML += `<li class="li liDrink" id=${drink.idDrink} ><h2 class="drink-name">${drink.strDrink}</h2><img src=${drink.strDrinkThumb} class="img" alt="cocktail"></li>`;
        }

        else { // In favorites.
            renderedList.innerHTML += `<li class="li favorite liDrink" id=${drink.idDrink}><h2 class="drink-name">${drink.strDrink}</h2><img src=${drink.strDrinkThumb} class="img" alt="cocktail"></li>`;
        }

    }
    
    const liDrinks = document.querySelectorAll(".liDrink");

    for (const li of liDrinks) {
    li.addEventListener("click", handleClickOnDrink);
    };

};

function handleSearchBtnClick(event) {
    event.preventDefault();
    getData();
}

searchBtn.addEventListener("click",handleSearchBtnClick);

// RESET RENDERED DRINK LIST & EMPTY THE ARRAY WITH THE DATA
function resetList () {
    drinksList = [];
    renderedList.innerHTML = "";
};

function handleResetBtnClick(event) {
    event.preventDefault();
    resetList();
}

resetBtn.addEventListener("click",handleResetBtnClick);

// FILLER IMAGE
function fillerImage(data) {
    for (const drink of listDrinks) {
      if (drink.strDrinkThumb === null) {
        drink.strDrinkThumb = `https://via.placeholder.com/150x160/ffffff/666666/?text=COCKTAIL`;
        renderList(data);
      }
    }
;}

// SELECT FAVORITE DRINKS
let favorites = [];

function handleClickOnDrink (event) {
    
    // Obtain which drink I'm clicking on:
    const idSelectedDrink = event.currentTarget.id; 

    const foundDrink = drinksList.find(clickedDrink=>{
        return clickedDrink.idDrink === idSelectedDrink;
    });

    // Check if drink I get as a parameter is in favorites:
    const favoriteFoundIndex = favorites.findIndex(fav=>{
        return fav.idDrink === idSelectedDrink; 
    }); 

    if(favoriteFoundIndex === -1){ // Didn't find it.
        favorites.push(foundDrink);  
    }
    else {
    // Remove from favorites list.
        favorites.splice(favoriteFoundIndex,1); 
    }

    localStorage.setItem("lsFavorites", JSON.stringify(favorites));
    renderFavorites(favorites);

  console.log(favorites); 

};

// RENDER FAVORITE DRINKS IN HTML
function renderFavorites (favorites) {

    renderedFavoritesList.innerHTML = "";

    for (const favoriteDrink of favorites) {
        renderedFavoritesList.innerHTML +=  `<li class="li liDrink" id=${favoriteDrink.idDrink}><h2 class="drink-name">${favoriteDrink.strDrink}</h2><img src=${favoriteDrink.strDrinkThumb} class="img" alt="cocktail"></li>`;
    }
 
};

// LOCAL STORAGE
const localStorageFavorites = JSON.parse(localStorage.getItem("lsFavorites"));

// Validate data.
// If it's the first time I open the page:

if(localStorageFavorites !== null){
    favorites= localStorageFavorites; 
    renderFavorites(favorites);
}

// localStorage.setItem("lsFavorites", JSON.stringify(favorites));
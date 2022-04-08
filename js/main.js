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
const renderizedFavoritesList = document.querySelector(".js-favorites");

const inputValue = input.value;

// const SERVER_URL = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita"

// FETCH DATA FROM API
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
        renderizedList.innerHTML +=  `<li class="liDrink" id=${drink.idDrink}><h2 class="drink-name">${drink.strDrink}</h2><img src=${drink.strDrinkThumb} class="img" alt="cocktail"></li>`;
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


// RESET RENDERIZED DRINK LIST & EMPTY THE ARRAY WITH THE DATA
function resetList () {
    drinksList = [];
    renderizedList.innerHTML = "";
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

// FAVORITE DRINKS

let favorites = [];

function handleClickOnDrink (event) {
    
    // Obtener sobre qué bebida hago click
    const idSelectedDrink = event.currentTarget.id; 

    const foundDrink = drinksList.find(clickedDrink=>{
        return clickedDrink.idDrink === idSelectedDrink;
    });

    // Compruebo si la bebida que recibo por parámetro está en los favoritos
    const favoriteFoundIndex = favorites.findIndex(fav=>{
        return fav.idDrink === idSelectedDrink; 
     }); 

    if(favoriteFoundIndex === -1){ //No lo encontró
        favorites.push(foundDrink);  
    }
    else {
    //eliminar de la lista de favoritos
        favorites.splice(favoriteFoundIndex,1); 
    }

    renderFavorites(favorites);

  console.log(favorites); 

};

// RENDER FAVORITE DRINKS IN HTML

function renderFavorites (favorites) {

    renderizedFavoritesList.innerHTML = "";

    for (const favoriteDrink of favorites) {
        renderizedFavoritesList.innerHTML +=  `<li class="liDrink" id=${favoriteDrink.idDrink}><h2 class="drink-name">${favoriteDrink.strDrink}</h2><img src=${favoriteDrink.strDrinkThumb} class="img" alt="cocktail"></li>`;
    }
 
};






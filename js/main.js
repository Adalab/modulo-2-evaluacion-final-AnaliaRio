"use strict";

// CONSTANTS
const input = document.querySelector(".js-input");
const searchBtn = document.querySelector(".js-search");
const resetBtn = document.querySelector(".js-reset");
const renderedList = document.querySelector(".js-list");
const renderedFavoritesList = document.querySelector(".js-favorites");
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

// RENDER SEARCH RESULT IN HTML !!!!!!!!!!!
function renderList (listDrinks) {
    for (const drink of listDrinks) {
        
        const favoriteFoundIndex = favorites.findIndex(fav=>{
            return fav.idDrink !== -1;
            // Encontrar variable que dice si drink es favorito o no
        }); 
    
        if( favoriteFoundIndex === -1){ // No está en favoritos
            renderedList.innerHTML += `<li class="li liDrink" id=${drink.idDrink} ><h2 class="drink-name">${drink.strDrink}</h2><img src=${drink.strDrinkThumb} class="img" alt="cocktail"></li>`;
        }

        else { //Está en favoritos
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

// SELECT FAVORITE DRINKS !!!!!!!!!!
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

    renderedFavoritesList.innerHTML = "";

    for (const favoriteDrink of favorites) {
        renderedFavoritesList.innerHTML +=  `<li class="li liDrink" id=${favoriteDrink.idDrink}><h2 class="drink-name">${favoriteDrink.strDrink}</h2><img src=${favoriteDrink.strDrinkThumb} class="img" alt="cocktail"></li>`;
    }
 
};

// LOCAL STORAGE
localStorage.setItem("favorites", "lsFavorites");
const localStorageFavorites = JSON.parse(localStorage.getItem("lsFavorites"));

// Validar si datos son válidos
// Si es la primera vez que entro en la página:
if(localStorageFavorites !== null){
    favorites= localStorageFavorites; 
    renderFavorites(favorites);
  }
  else{
  // No tengo datos en el local storage
  // Fetch favorites form server
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputValue}`)
  .then(response => response.json())
  .then(data => {
      // Guardar en variable global de favoritos
      favorites = data.favorites; 
      // sí tengo datos en el local storage, así lo parseo a un array 
      localStorage.setItem("lsFavorites", JSON.stringify(favorites));
      //Paint/renderizar HTML
      // cada vez que modifico los arrays de favoritos vuelvo pintar y a escuchar eventos
      renderFavorites(favorites); 
  });
};
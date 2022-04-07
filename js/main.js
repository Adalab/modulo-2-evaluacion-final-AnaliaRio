"use strict";

// HTML elements
const input = document.querySelector(".js-input");
const searchBtn = document.querySelector(".js-search");
const resetBtn = document.querySelector(".reset");
const list = document.querySelector(".js-list");

// User value
const inputValue = input.value;

// Data source
const urlServer = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita";

// Fetch data
fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita")
  .then(response => response.json())
  .then(data => document.body.innerHTML = data.result.value);



  searchBtn.addEventListener.apply("click",handleSearchBtnClick);
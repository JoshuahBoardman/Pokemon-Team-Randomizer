const btn = document.getElementById('btn');
const display = document.getElementById("display");
const games = document.getElementById("pokemon-games");

let pokedex;
let pokemon;

btn.addEventListener("click", e => {
    e.preventDefault();
    getGamePokedex();
    generatePokemon();
})

function generatePokemon() {
    display.innerHTML = '';
    for(let i = 0; i < 6; i++) {
        getRandomPokemon();
    }
}

async function getRandomPokemon() {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokedex/${pokedex}`);
        if (response.status === 200) {
            const data = await response.json();
            const pokeId = generatePokemonId(data);
            const pokeName = data.pokemon_entries[pokeId].pokemon_species.name
            getPokemonData(pokeName);
            
        }
    } catch (error) {
        console.error(error);
    }
}

async function getPokemonData(name) {
    try {
        console.log(name);
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        if (response.status === 200) {
            const data = await response.json();
            displayPokemonData(data);
        }
    } catch (error) {
        console.error(error);
    }
}

function displayPokemonData(data) {
    const formatedName = formatName(data.name);
        display.innerHTML += ` 
        <div class="pokemon">
            <div class="pokemon-img-wrapper">
                <img class="pokemon-img" src="${data.sprites.other["official-artwork"].front_default}">
            </div> 
            <div class="pokemon-name-wrapper">
                <h2 class="pokemon-name">${formatedName}</h2>
            </div>
        </div>
    `
}

function generatePokemonId(data) {
    return Math.floor(Math.random() * data.pokemon_entries.length + 1);
}

function getGamePokedex() {
    const gameSelected = getPokemonGame();
    const gameDex = gameSelected .split('&');
    const dexSelected = Math.floor(Math.random() * gameDex.length);
    pokedex = gameDex[dexSelected];
}

function getPokemonGame() {
    const gameSelected = games.value;
    return gameSelected;
}

function formatName(name) {
    const formatedName = `${name.charAt(0).toUpperCase()}${name.slice(1)}`;
    return formatedName;
}

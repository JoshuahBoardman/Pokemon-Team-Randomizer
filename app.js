const btn = document.getElementById('btn');
const display = document.getElementById("display");

let pokemonId;

btn.addEventListener("click", e => {
    e.preventDefault();
    console.log(pokemonId);
    
    getPokemonData();
    
})

async function getPokemonData() {
    display.innerHTML = '';
    for(let i = 0; i < 6; i++) {
        pokemonId = generatePokemonId();
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
            if (response.status === 200) {
                const data = await response.json();
                displayPokemonData(data);
            }
        } catch (error) {
            console.log(error);
        }
    }
}

function displayPokemonData(data) {
    console.log(data); 
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

function generatePokemonId() {
    return Math.floor(Math.random() * 151 + 1);
}

function formatName(name) {
    const formatedName = `${name.charAt(0).toUpperCase()}${name.slice(1)}`;
    return formatedName;
}

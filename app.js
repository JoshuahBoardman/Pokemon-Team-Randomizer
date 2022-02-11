const btn = document.getElementById('btn');
const display = document.getElementById("display");

const pokemonId = generatePokemonId();

btn.addEventListener("click", () => {
    
    console.log(pokemonId);
    getPokemonData();
    
})

function generatePokemonId() {
    return Math.floor(Math.random() * 151 + 1);
}

async function getPokemonData() {
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

function displayPokemonData(data) {
    display.innerText = data.name
}


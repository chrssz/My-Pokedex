const poke_container = document.getElementById('poke-container');
const pokemon_count = 152;
const colors = {
    fire: '#FDDFDF',
    grass: '#DEFDEO',
    electric: '#FCF7DE',
    water: '#DEF3FD',
    ground: '#f4e7da',
    rock: '#d5d5d4',
    fairy: '#fceaff',
    poison: '#98d7a5',
    bug: '#f8d5a3',
    dragon: '#97b3e6',
    psychic: '#eaeda1',
    flying: '#F5F5F5',
    fighting: '#E6E0D4',
    normal: '#F5F5F5',
};
const main_types = Object.keys(colors);

//async makes a function return a promise
async function getPokemon(id)
{
    //Reference api: https://pokemonapi.co/api/v2/pokemon/{id}
    let URL = 'https://pokeapi.co/api/v2/pokemon/' + id
    //fetch acceps url, await, waits for url to return  complete or failed.
    const response = await fetch(URL);
    const data = await response.json();

    createPokemonCard(data);

}
async function fetchPokemons()
{
    //Start at i = 1; Pokemon numbers start at 1 
    for(let i = 1; i < pokemon_count; i++)
    {
        await getPokemon(i);
    }
}

function createPokemonCard(data)
{
    //This variable is set to a html element called div.
    const pokemonElement = document.createElement('div');
    //adds pokemon class to pokemonElement
    pokemonElement.classList.add('poke-container');

    
    const pokemonName = data.name[0].toUpperCase() + data.name.slice(1);
    const pokemonID = data.id;
    const pokemonType = data.types[0].type.name;
    //change color of card
    const color = colors[pokemonType];
    
    //Stores the div class for containing the pokemon card in html
    const pokemonInnerHTML = `
    <div class="poke-container" id="poke-container">
        <div class="pokemon" style="background-color: ${color}">
            <div class="img-container">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonID}.png" alt="">
            </div>
            <div class="info">
                <span class="number">#${pokemonID}</span>
                <h3 class="name">${pokemonName}</h3>
                <small class="type">Type: <span>${pokemonType}</span></small>
            </div>
        </div>
    </div>`;
    pokemonElement.innerHTML = pokemonInnerHTML;


    poke_container.appendChild(pokemonElement);


}


fetchPokemons();
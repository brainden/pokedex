const pokedex = document.getElementById("pokedex");

console.log(pokedex);

const fetchPokemon = () => {
	const promises = [];

	for (let i = 1; i <= 151; i++) {
		const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
		promises.push(
			fetch(url).then(res => {
				return res.json();
			})
		);
	}
	Promise.all(promises).then(results => {
		const pokemon = results.map(data => ({
			name: data.name,
			id: data.id,
			image: data.sprites["front_default"],
			type: data.types.map(type => type.type.name).join(", ")
		}));
		displayPokemon(pokemon);
	});
};

const displayPokemon = pokemon => {
	console.log(pokemon);
	const pokemonHTMLString = pokemon.map(
		poke => `
  <li>
  <img src="${poke.image}" />
  <h2>${poke.id}. ${poke.name}</h2>
  <p>${poke.type}</p>
  </li>
  `
	);
	pokedex.innerHTML = pokemonHTMLString;
};

fetchPokemon();

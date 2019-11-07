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
};

fetchPokemon();

export default {
    template: `
    <div>
        <h2>Pokémons</h2>
        <div v-if="pokemon">
            <img :src="pokemon.sprites.front_default" alt="Image" width="150" />
            <h3>{{ pokemon.name }}</h3>
            <p><strong>Altura:</strong> {{ pokemon.height }}</p>
            <p><strong>Peso:</strong> {{ pokemon.weight }}</p>
        </div>
        <button @click="anterior" :disabled="pokemonId === 1">Anterior</button>
        <button @click="proximo">Próximo</button>
    </div>
    `,
    data() {
        return {
            pokemon: null,
            pokemonId: 1
        };
    },
    methods: {
        async buscaPokemon() {
            try {
                const response = await fetch(
                    `https://pokeapi.co/api/v2/pokemon/${this.pokemonId}`
                );
                this.pokemon = await response.json();
                console.log(this.pokemon)
            } catch (error) {
                console.log(error)
            }
        },
        proximo() {
            this.pokemonId++;
            this.buscaPokemon();
        },
        anterior() {
            if (this.pokemonId > 1) {
                this.pokemonId--;
                this.buscaPokemon();
            }
        },
        mounted() {
            this.buscaPokemon();
        },
    },
};
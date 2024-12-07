export default {
  template: `
    <div>
      <h2>Consumindo API do Pokémon</h2>
      <br>
      <input 
        v-model="pokemonName" 
        @blur="pesquisaPokemon(pokemonName)" 
        placeholder="Digite o nome do Pokémon" 
      />
      <br>
      <img 
        v-if="pokemon.sprites.front_default" 
        :src="pokemon.sprites.front_default" 
        alt="Imagem do Pokémon" 
        width="150" 
      />
      <br>
      <div v-if="altura || peso">
        <p><strong>Altura:</strong> {{ altura }} M</p><br>
        <p><strong>Peso:</strong> {{ peso }} KG</p><br>
                <p><strong>Tipo:</strong> {{ tipo }}</p>

      </div>
      <br>
      <button @click="pesquisaPokemon(pokemonName)">Buscar Pokemon</button>
    </div>
  `,

  data() {
    return {
      pokemon: {
        sprites: {
          front_default: ''
        }
      },
      pokemonName: '',
      altura: '',
      peso: '',
      tipo:''
    };
  },

  methods: {
    limpaFormularioPokemon() {
      this.pokemon = {
        sprites: {
          front_default: ''
        }
      };
      this.altura = '';
      this.peso = '';
      this.tipo = '';
    },

    async pesquisaPokemon(valor) {
      const nomePokemon = valor.toLowerCase().trim();

      if (nomePokemon) {
        try {
          const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${nomePokemon}`);
          if (!response.ok) throw new Error("Pokémon não encontrado");
          
          const conteudo = await response.json();

          this.pokemon = conteudo;
          this.altura = conteudo.height / 10; 
          this.peso = conteudo.weight / 10; 
          this.tipo = conteudo.types.map(typeInfo => typeInfo.type.name).join(", ")

          const dataConsol = {
            name:this.pokemonName,
            peso:this.peso,
            altura:this.altura,
            tipo:this.tipo,
            imagem: conteudo.sprites.front_default
          }

          console.log(dataConsol);
        } catch (error) {
          this.limpaFormularioPokemon();
          alert("Pokémon não encontrado. Tente novamente.");
        }
      } else {
        this.limpaFormularioPokemon();
      }
    }
  }
};


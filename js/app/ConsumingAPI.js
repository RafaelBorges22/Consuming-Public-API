export default {
  template: `
    <div>
      <h2>Consumindo API do Pokemon e ViaCep</h2>
      <br><input v-model="pokemonName" @blur="pesquisaPokemon(pokemonName)" placeholder="Digite o nome do Pokémon" />
      <br><input v-model="altura" placeholder="Altura" disabled />
      <br><input v-model="peso" placeholder="Peso" disabled />
      <img :src="pokemon.sprites.front_default" alt="" width="150" />

      <br><button @click="classPeso" :disabled="!peso">Result</button>

      <br><p v-if="pesoTag">Classificação de Peso: {{ pesoTag }}</p>
      <br><p v-if="peso === ''"></p>
      <br><p v-if="peso && isNaN(peso)">Peso não é um número válido!</p>
      <br><p v-if="peso && !isNaN(peso)">Peso{{ peso }}</p>
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
      pesoTag: '', 
    };
  },

  methods: {
    limpaFormularioPokemon() {
      this.pokemonName = "";
      this.altura = "";
      this.peso = "";
      this.pesoTag = ""; 
    },

    async pesquisaPokemon(valor) {
      const nomePokemon = valor.toLowerCase().trim();

      if (nomePokemon) {
        this.limpaFormularioPokemon();

        try {
          const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${nomePokemon}`);
          const conteudo = await response.json();

          this.pokemonName = conteudo.name.charAt(0).toUpperCase() + conteudo.name.slice(1);
          this.altura = conteudo.height;
          this.peso = conteudo.weight; 
          this.pokemon = conteudo;
          console.log("Dados do Pokémon:", this.pokemon);
          console.log("Peso carregado:", this.peso); 
        } 
        catch (error) {
          this.limpaFormularioPokemon();
          alert("Pokémon não encontrado. Tente novamente.");
        }
      } else {
        this.limpaFormularioPokemon();
      }
    },

    classPeso() {
      const peso = parseInt(this.peso.trim(), 10);

      console.log("Peso antes da conversão:", this.peso); 
      console.log("Peso após conversão:", peso); 

     
      if (isNaN(peso) || peso <= 0) {
        console.log("Peso inválido ou menor que zero");
        this.pesoTag = ''; 
        alert("Peso inválido! Por favor, tente novamente.");
        return;
      }

      console.log("Peso válido:", peso);
      this.pesoTag = ''; 

      if (peso < 50) {
        this.pesoTag = "Leve";
      } 
      else if (peso >= 50 && peso < 200) {
        this.pesoTag = "Peso médio";
      } 
      else if (peso >= 200) {
        this.pesoTag = "Pesado";
      }

      console.log("Classificação de Peso: " + this.pesoTag);
    }
  },
};

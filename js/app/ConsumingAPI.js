export default {
    template: `
      <div>
        <br><input v-model="pokemonName" @blur="pesquisaPokemon(pokemonName)" placeholder="Digite o nome do Pokémon" />
        <br><input v-model="altura" placeholder="Altura" readonly />
        <br><input v-model="peso" placeholder="Peso" readonly />
        <br><input v-model="pesagem" placeholder="Resultado" readonly>
      </div>
    `,
  
    data() {
      return {
        pokemonName: '',
        nome: '',
        altura: '',
        peso: '',
      };
    },
    methods: {
      limpaFormularioPokemon() {
        this.nome = "";
        this.altura = "";
        this.peso = "";
        this.pesagem = "";
      },
      async pesquisaPokemon(valor) {
        const nomePokemon = valor.toLowerCase().trim();
  
        if (nomePokemon) {
          this.limpaFormularioPokemon();
  
          try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${nomePokemon}`);
            const conteudo = await response.json();
  
            this.nome = conteudo.name.charAt(0).toUpperCase() + conteudo.name.slice(1);
            this.altura = conteudo.height;
            this.peso = conteudo.weight;
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
  
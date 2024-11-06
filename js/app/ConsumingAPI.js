export default {
    template: `
      <div>
        <br><input v-model="pokemonName" @blur="pesquisaPokemon(pokemonName)" placeholder="Digite o nome do Pokémon" />
        <br><input v-model="altura" placeholder="Altura" />
        <br><input v-model="peso" placeholder="Peso" />
        <img :src="pokemon.sprites.front_default" alt="Image" width="150" />
        <br><button @click="getPesoTag">Result</button>
        <br><p v-if="pesoTag">Classificação de Peso: {{ pesoTag }}</p>      
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
          pesoTag: ''
      }
      
    },
    
    methods: {
      limpaFormularioPokemon() {
        this.nome = "";
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
  
            this.nome = conteudo.name.charAt(0).toUpperCase() + conteudo.name.slice(1);
            this.altura = conteudo.height;
            this.peso = conteudo.weight;
            this.pokemon = conteudo;
            console.log(this.pokemon.sprites.front_default);
          } catch (error) {
            this.limpaFormularioPokemon();
            alert("Pokémon não encontrado. Tente novamente.");
          }
        } else {
          this.limpaFormularioPokemon();
        }
      },
  
      async getPesoTag() { 
        try {
          const response = await fetch('src/controller/api.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ peso: this.peso, altura: this.altura })
        });
        
          console.log("Resposta", response);
  
          if (response.ok) {
            const data = await response.json();
            if (data.peso_tag) {
              this.pesoTag = data.peso_tag; 
            } else if (data.error) {
              console.error("Erro:", data.error);
              this.pesoTag = ''; 
            }
          } else {
            console.error("Erro na resposta do servidor.");
          }
        } catch (error) {
          console.error("Erro na solicitação:", error);
        }
      },
  
      async pesagem(altura,peso) {
        const imc = peso / (altura * altura); 
        return {
            imc: parseFloat(imc.toFixed(2)), 
            classificacao: classificarIMC(imc) 
        };
      },
      async classificarIMC(imc) {
        if (imc < 18.5) {
            return "Abaixo do peso";
        } else if (imc >= 18.5 && imc < 24.9) {
            return "Peso normal";
        } else if (imc >= 25 && imc < 29.9) {
            return "Sobrepeso";
        } else {
            return "Obesidade";
        }
    }
    },
  };
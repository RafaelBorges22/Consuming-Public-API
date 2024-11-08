export default {
    template: `
      <div>
        <input v-model="cep" placeholder="Digite o CEP" />
        <input v-model="pokemon" placeholder="Digite o nome do Pokémon" />
        <button @click="fetchData">Buscar</button>
  
        <div v-if="successMessage" class="success-message">
          {{ successMessage }}
        </div>
        
        <div v-if="cepData">
          <h3>Informações do CEP</h3>
          <p><strong>Rua:</strong> {{ cepData.logradouro }}</p>
          <p><strong>Bairro:</strong> {{ cepData.bairro }}</p>
          <p><strong>Cidade:</strong> {{ cepData.localidade }}</p>
          <p><strong>Estado:</strong> {{ cepData.uf }}</p>
        </div>
  
        <div v-if="pokemonData">
          <h3>Informações do Pokémon</h3>
          <p><strong>Nome:</strong> {{ pokemonData.name }}</p>
          <p><strong>Altura:</strong> {{ pokemonData.height }}</p>
          <p><strong>Peso:</strong> {{ pokemonData.weight }}</p>
          <p><strong>Classificação do Peso:</strong> {{ pokemonData.peso_classificacao }}</p>
          <p><strong>Descrição:</strong> {{ pokemonData.peso_tag }}</p>
          <p v-if="pokemonData.peso_classificacao === 'Pesado'" class="warning">
            Atenção: Esse Pokémon não pode ser cadastrado acima do peso!
          </p>
        </div>
      </div>
    `,
    data() {
      return {
        cep: '',
        pokemon: '',
        cepData: null,
        pokemonData: null,
        successMessage: '',
      };
    },
    methods: {
      async fetchData() {
        try {
          const response = await fetch("http://localhost:8080/", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              peso: this.peso,
              altura: this.altura
            })
          });
  
          const data = await response.json();
  
          if (data.cepData.error) {
            alert(data.cepData.error);
            this.cepData = null;
          } else {
            this.cepData = data.cepData;
          }
  
          if (data.pokemonData.error) {
            alert(data.pokemonData.error);
            this.pokemonData = null;
          } else {
            this.pokemonData = data.pokemonData;
            this.successMessage = "Dados recebidos com sucesso!";
          }
  
        } catch (error) {
          console.error("Erro na requisição:", error);
        }
      }
    }
  };
  
      
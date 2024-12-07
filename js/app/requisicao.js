export default {
    template: `
      <div>
       
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
  
      
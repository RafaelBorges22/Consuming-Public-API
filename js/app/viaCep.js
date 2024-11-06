export default {
    template:`
  <div>
    <br><input v-model="cep" @blur="pesquisacep(cep)" placeholder="Digite o CEP" />
    <br><input v-model="rua" placeholder="Rua" readonly />
    <br><input v-model="bairro" placeholder="Bairro" readonly />
    <br><input v-model="cidade" placeholder="Cidade" readonly />
    <br><input v-model="uf" placeholder="UF" readonly />
    <br><input v-model="ibge" placeholder="IBGE" readonly />
  </div>
  `,

  data() {
    return {
      cep: '',
      rua: '',
      bairro: '',
      cidade: '',
      uf: '',
      ibge: '',
    };
  },
    methods: {
        limpaFormularioCep() {
          this.rua = "";
          this.bairro = "";
          this.cidade = "";
          this.uf = "";
          this.ibge = "";
        },
        async pesquisacep(valor) {
          const cep = valor.replace(/\D/g, '');
          const validacep = /^[0-9]{8}$/;
    
          if (cep) {
            if (validacep.test(cep)) {
              this.rua = this.bairro = this.cidade = this.uf = this.ibge = "...";
    
              try {
                const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
                const conteudo = await response.json();
    
                if (!conteudo.erro) {
                  this.rua = conteudo.logradouro;
                  this.bairro = conteudo.bairro;
                  this.cidade = conteudo.localidade;
                  this.uf = conteudo.uf;
                  this.ibge = conteudo.ibge;
                } else {
                  this.limpaFormularioCep();
                  alert("CEP não encontrado.");
                }
              } catch (error) {
                this.limpaFormularioCep();
                alert("Erro ao buscar CEP. Tente novamente.");
              }
            } else {
              this.limpaFormularioCep();
              alert("Formato de CEP inválido.");
            }
          } else {
            this.limpaFormularioCep();
          }
        }
      }
    }


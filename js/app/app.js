import Pokemon from './pokemon.js'
import ViaCep from './viaCep.js'
import Requisicao from './requisicao.js'
import Consuming from './ConsumingAPI.js'
const app = Vue.createApp({
    components: {
        Pokemon,
        ViaCep,
        Requisicao,
        Consuming
    },
    template:`
        <Consuming />

        <Pokemon />

        <ViaCep/>
    `, 
});

app.mount('#app');
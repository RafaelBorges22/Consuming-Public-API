import Pokemon from "./pokemon.js";

const app = Vue.createApp({
    components: {
        Pokemon
    },
    template:`
    <div>
        <Pokemon />
    </div>
    `, 
});

app.mount('#app');
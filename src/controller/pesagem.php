<?php
function classificarPeso($peso) {
    if ($peso < 50) {
        return ["classificacao" => "Leve", "tag" => "Esse Pokémon é super ágil!"];
    } elseif ($peso >= 50 && $peso < 200) {
        return ["classificacao" => "Peso Médio", "tag" => "Esse Pokémon tem uma boa resistência."];
    } else {
        return ["classificacao" => "Pesado", "tag" => "Esse Pokémon é bastante robusto!"];
    }
}




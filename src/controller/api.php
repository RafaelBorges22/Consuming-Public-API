<?php
header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);

$response = [];

if (isset($data['pokemon'])) {
    
    $pokemonApiUrl = "https://pokeapi.co/api/v2/pokemon/" . $pokemonName;
    $pokemonResponse = file_get_contents($pokemonApiUrl);
    
    if ($pokemonResponse !== false) {
        $pokemonData = json_decode($pokemonResponse, true);
        
        $peso = $pokemonData['peso'];
        $peso_classificacao = '';
        $peso_tag = $pesagem($peso);

        $response['pokemonData'] = [
            'name' => $pokemonData['name'],
            'altura' => $pokemonData['altura'],
            'peso' => $pokemonData['peso'],
            'types' => $pokemonData['types'],
            'tag' => $pokemonPesagem['PesoTag']
        ];
    } else {
        $response['pokemonData']['error'] = 'Erro ao buscar informações do Pokémon.';
    }
    function pesagem($peso,$altura){
            $imc =  $peso / $altura;
            if ($imc < 50 ) {
                echo "Leve";
            }elseif($imc>= 50 || $imc == 200){
                echo "Peso Médio";
            }else{
                echo "Pesado";
            }
        };
    }






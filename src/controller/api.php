<?php
header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);

$response = [];

if (isset($data['pokemon'])) {
    $pokemonName = strtolower(trim($data['pokemon']));
    
    $pokemonApiUrl = "https://pokeapi.co/api/v2/pokemon/" . $pokemonName;
    $pokemonResponse = file_get_contents($pokemonApiUrl);
    
    if ($pokemonResponse !== false) {
        $pokemonData = json_decode($pokemonResponse, true);
        
        $peso = $pokemonData['weight'];
        $peso_classificacao = '';
        $peso_tag = '';

        if ($peso < 500) {
            $peso_classificacao = 'Leve';
            $peso_tag = 'Esse Pokémon é considerado leve.';
        } elseif ($peso >= 500 && $peso <= 2000) {
            $peso_classificacao = 'Peso Médio';
            $peso_tag = 'Esse Pokémon tem um peso médio.';
        } else {
            $peso_classificacao = 'Pesado';
            $peso_tag = 'Esse Pokémon é considerado pesado.';
        }

        $response['pokemonData'] = [
            'name' => $pokemonData['name'],
            'height' => $pokemonData['height'],
            'weight' => $peso,
            'types' => $pokemonData['types'],
            'peso_classificacao' => $peso_classificacao,
            'peso_tag' => $peso_tag
        ];
    } else {
        $response['pokemonData']['error'] = 'Erro ao buscar informações do Pokémon.';
    }
}

if (isset($data['cep'])) {
    $cep = preg_replace('/\D/', '', $data['cep']);
    
    $viaCepUrl = "https://viacep.com.br/ws/" . $cep . "/json/";
    $cepResponse = file_get_contents($viaCepUrl);
    
    if ($cepResponse !== false) {
        $cepData = json_decode($cepResponse, true);
        
        if (!isset($cepData['erro'])) {
            $response['cepData'] = [
                'logradouro' => $cepData['logradouro'],
                'bairro' => $cepData['bairro'],
                'localidade' => $cepData['localidade'],
                'uf' => $cepData['uf'],
                'ibge' => $cepData['ibge']
            ];
        } else {
            $response['cepData']['error'] = 'CEP não encontrado.';
        }
    } else {
        $response['cepData']['error'] = 'Erro ao buscar informações do CEP.';
    }
}

echo json_encode($response);



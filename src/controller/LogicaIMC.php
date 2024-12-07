
Lógica IMC não implementada

<!-- 
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");


$data = json_decode(file_get_contents("php://input"), true);

function pesagem($peso, $altura) {
    $imc = $peso / $altura;
    if ($imc < 50) {
        return "Leve";
    } elseif ($imc >= 50 && $imc <= 200) {
        return "Peso Médio";
    } else {
        return "Pesado";
    }
}

$response = [];

if (isset($data['peso']) && isset($data['altura'])) {
    $peso = $data['peso'];
    $altura = $data['altura'];
    $response['peso_tag'] = pesagem($peso, $altura);
} else {
    $response['error'] = "Dados insuficientes para calcular o peso.";
}

echo json_encode($response);




 -->


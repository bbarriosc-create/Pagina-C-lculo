function iniciarViajeCosmico(){

    let numero = parseFloat(document.getElementById("numeroInput").value);

    if(isNaN(numero)) return;

    let resultado = (2 * numero) + 5;

    // ELEMENTOS

    let entrada = document.getElementById("entradaNumero");

    let salida = document.getElementById("resultadoNumero");

    let estrellaEntrada = document.getElementById("estrellaEntrada");

    let estrellaSalida = document.getElementById("estrellaSalida");

    let agujero = document.getElementById("agujeroNegro");

    let op1 = document.getElementById("op1");

    let op2 = document.getElementById("op2");

    // RESET

    estrellaEntrada.classList.remove("viajar");

    estrellaSalida.classList.remove("viajar");

    agujero.classList.remove("nucleo-activo");

    op1.classList.remove("activa");

    op2.classList.remove("activa");

    salida.classList.remove("resultado-final");

    void estrellaEntrada.offsetWidth;

    // INPUT

    entrada.innerHTML = numero;

    salida.innerHTML = "?";

    // VIAJE ENTRADA

    estrellaEntrada.classList.add("viajar");

    // ACTIVAR NUCLEO

    setTimeout(() => {

        agujero.classList.add("nucleo-activo");

        op1.classList.add("activa");

    }, 2500);

    // SEGUNDA OPERACION

    setTimeout(() => {

        op2.classList.add("activa");

    }, 4000);

    // VIAJE SALIDA

    setTimeout(() => {

        estrellaSalida.classList.add("viajar");

    }, 5500);

    // RESULTADO FINAL

    setTimeout(() => {

        salida.innerHTML = resultado;

        salida.classList.add("resultado-final");

    }, 8000);

}
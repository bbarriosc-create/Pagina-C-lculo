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
/* =========================================
   GRAFICA TIENE QUE QUEDAR BIEN INT 10000
========================================= */
// Función global para dibujar el plano cartesiano y la cuadrícula en un Canvas
function drawCartesianPlane(canvas, ctx, xMin, xMax, yMin, yMax) {
    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    const toPixelX = (x) => ((x - xMin) / (xMax - xMin)) * width;
    const toPixelY = (y) => height - ((y - yMin) / (yMax - yMin)) * height;

    // 1. Cuadrícula Secundaria
    ctx.strokeStyle = '#f1f5f9';
    ctx.lineWidth = 1;
    for (let x = Math.ceil(xMin); x <= Math.floor(xMax); x++) {
        ctx.beginPath();
        ctx.moveTo(toPixelX(x), 0);
        ctx.lineTo(toPixelX(x), height);
        ctx.stroke();
    }
    for (let y = Math.ceil(yMin); y <= Math.floor(yMax); y++) {
        ctx.beginPath();
        ctx.moveTo(0, toPixelY(y));
        ctx.lineTo(width, toPixelY(y));
        ctx.stroke();
    }

    // 2. Ejes Principales
    ctx.strokeStyle = '#64748b';
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.moveTo(0, toPixelY(0));
    ctx.lineTo(width, toPixelY(0));
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(toPixelX(0), 0);
    ctx.lineTo(toPixelX(0), height);
    ctx.stroke();

    // 3. Números y marcas
    ctx.fillStyle = '#94a3b8';
    ctx.font = '10px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';

    for (let x = Math.ceil(xMin); x <= Math.floor(xMax); x++) {
        if (x === 0) continue;
        ctx.fillText(x, toPixelX(x), toPixelY(0) + 4);
    }

    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    for (let y = Math.ceil(yMin); y <= Math.floor(yMax); y++) {
        if (y === 0) continue;
        ctx.fillText(y, toPixelX(0) - 6, toPixelY(y));
    }

    return { toPixelX, toPixelY };
}

// ==== 1. LÓGICA FUNCIÓN LINEAL ====
const inputALineal = document.getElementById('input-a-lineal');
const inputBLineal = document.getElementById('input-b-lineal');
const inputXValLineal = document.getElementById('input-xval-lineal');
const textALineal = document.getElementById('text-a-lineal');
const textBLineal = document.getElementById('text-b-lineal');
const resultYLineal = document.getElementById('result-y-lineal');
const canvasLineal = document.getElementById('canvas-lineal');
const ctxLineal = canvasLineal.getContext('2d');

function drawLineal() {
    const a = parseFloat(inputALineal.value) || 0;
    const b = parseFloat(inputBLineal.value) || 0;
    const xValor = parseFloat(inputXValLineal.value) || 0;
    
    textALineal.innerText = a;
    textBLineal.innerText = b >= 0 ? ` + ${b}` : ` - ${Math.abs(b)}`;

    // Realizar la operación matemática real con X
    const resultadoY = a * xValor + b;
    resultYLineal.innerText = resultadoY;

    const { toPixelX, toPixelY } = drawCartesianPlane(canvasLineal, ctxLineal, -10, 10, -10, 10);

    ctxLineal.strokeStyle = '#3b82f6';
    ctxLineal.lineWidth = 3;
    ctxLineal.beginPath();

    for (let i = 0; i <= canvasLineal.width; i++) {
        const xMat = -10 + (i / canvasLineal.width) * 20;
        const yMat = a * xMat + b;

        if (i === 0) {
            ctxLineal.moveTo(i, toPixelY(yMat));
        } else {
            ctxLineal.lineTo(i, toPixelY(yMat));
        }
    }
    ctxLineal.stroke();
}

// ==== 2. LÓGICA FUNCIÓN CUADRÁTICA ====
const inputAQuad = document.getElementById('input-a-quad');
const inputBQuad = document.getElementById('input-b-quad');
const inputCQuad = document.getElementById('input-c-quad');
const inputXValQuad = document.getElementById('input-xval-quad');
const textAQuad = document.getElementById('text-a-quad');
const textBQuad = document.getElementById('text-b-quad');
const textCQuad = document.getElementById('text-c-quad');
const resultYQuad = document.getElementById('result-y-quad');
const canvasQuad = document.getElementById('canvas-quad');
const ctxQuad = canvasQuad.getContext('2d');

function drawQuad() {
    const a = parseFloat(inputAQuad.value) || 0;
    const b = parseFloat(inputBQuad.value) || 0;
    const c = parseFloat(inputCQuad.value) || 0;
    const xValor = parseFloat(inputXValQuad.value) || 0;

    textAQuad.innerText = a;
    textBQuad.innerText = b >= 0 ? `+ ${b}` : `- ${Math.abs(b)}`;
    textCQuad.innerText = c >= 0 ? `+ ${c}` : `- ${Math.abs(c)}`;

    // Realizar la operación matemática real con X
    const resultadoY = a * (xValor * xValor) + b * xValor + c;
    resultYQuad.innerText = resultadoY;

    const { toPixelX, toPixelY } = drawCartesianPlane(canvasQuad, ctxQuad, -10, 10, -10, 10);

    ctxQuad.strokeStyle = '#10b981';
    ctxQuad.lineWidth = 3;
    ctxQuad.beginPath();

    for (let i = 0; i <= canvasQuad.width; i++) {
        const xMat = -10 + (i / canvasQuad.width) * 20;
        const yMat = a * (xMat * xMat) + b * xMat + c;

        if (i === 0) {
            ctxQuad.moveTo(i, toPixelY(yMat));
        } else {
            ctxQuad.lineTo(i, toPixelY(yMat));
        }
    }
    ctxQuad.stroke();
}

// ==== 3. LÓGICA FUNCIÓN EXPONENCIAL ====
const inputAExp = document.getElementById('input-a-exp');
const inputXValExp = document.getElementById('input-xval-exp');
const textAExp = document.getElementById('text-a-exp');
const resultYExp = document.getElementById('result-y-exp');
const canvasExp = document.getElementById('canvas-exp');
const ctxExp = canvasExp.getContext('2d');

function drawExp() {
    const a = parseFloat(inputAExp.value) || 1;
    const xValor = parseFloat(inputXValExp.value) || 0;
    textAExp.innerText = a;

    // Realizar la operación matemática real con X
    const resultadoY = Math.pow(a, xValor);
    resultYExp.innerText = isNaN(resultadoY) ? "No definido" : resultadoY;

    const { toPixelX, toPixelY } = drawCartesianPlane(canvasExp, ctxExp, -5, 5, -2, 10);

    ctxExp.strokeStyle = '#ec4899';
    ctxExp.lineWidth = 3;
    ctxExp.beginPath();

    for (let i = 0; i <= canvasExp.width; i++) {
        const xMat = -5 + (i / canvasExp.width) * 10;
        const yMat = Math.pow(a, xMat);

        if (i === 0) {
            ctxExp.moveTo(i, toPixelY(yMat));
        } else {
            ctxExp.lineTo(i, toPixelY(yMat));
        }
    }
    ctxExp.stroke();
}

// Detectar los eventos de escritura de datos
inputALineal.addEventListener('input', drawLineal);
inputBLineal.addEventListener('input', drawLineal);
inputXValLineal.addEventListener('input', drawLineal);

inputAQuad.addEventListener('input', drawQuad);
inputBQuad.addEventListener('input', drawQuad);
inputCQuad.addEventListener('input', drawQuad);
inputXValQuad.addEventListener('input', drawQuad);

inputAExp.addEventListener('input', drawExp);
inputXValExp.addEventListener('input', drawExp);

// Ejecutar el dibujado inicial al abrir la página
drawLineal();
drawQuad();
drawExp();

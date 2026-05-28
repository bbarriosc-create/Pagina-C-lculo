document.addEventListener('DOMContentLoaded', () => {
    let currentLevel = 1; 
    let score = 0;
    let currentExercise = {};
    let chartInstance = null;

    const equationText = document.getElementById('equation-text');
    const questionText = document.getElementById('question-text');
    const userAnswer = document.getElementById('user-answer');
    const btnVerify = document.getElementById('btn-verify');
    const btnNext = document.getElementById('btn-next');
    const feedbackPanel = document.getElementById('feedback-panel');
    const feedbackMessage = document.getElementById('feedback-message');
    const currentScoreTxt = document.getElementById('current-score');
    const challengeTitle = document.getElementById('challenge-title');

    const successMessages = [
        "¡Cálculo exacto! El vector se ha alineado correctamente. Avanzando.",
        "Telemetría verificada. Margen de error: 0.0%. Excelente precisión.",
        "¡Sistemas alineados con éxito! Coordenadas de trayectoria confirmadas."
    ];

    const errorMessages = [
        "Desviación crítica en el eje orbital. La trayectoria colisionó. Intente de nuevo.",
        "Error de aproximación. Los motores fallaron por diferencia de unidades.",
        "Coordenadas incorrectas. Trayectoria matemática inestable. Recalcule."
    ];

    function generateExercise() {
        userAnswer.value = "";
        userAnswer.disabled = false;
        btnVerify.classList.remove('hidden');
        btnNext.classList.add('hidden');
        feedbackPanel.className = "feedback-box hidden";
        
        let x = Math.floor(Math.random() * 3) + 1; // X entre 1 y 3
        let htmlStr = "";
        let ans = 0;

        if (currentLevel === 1) { // 1. LINEAL: ax + b
            let a = Math.floor(Math.random() * 4) + 2;
            let b = Math.floor(Math.random() * 5) + 1;
            htmlStr = `f(x) = ${a}x + ${b}`;
            ans = a * x + b;
            currentExercise = { type: 'linear', a, b, x, ans };
        } 
        else if (currentLevel === 2) { // 2. CUADRÁTICA REAL: ax² + b
            let a = Math.floor(Math.random() * 2) + 1; // Coeficiente 1 o 2
            let b = Math.floor(Math.random() * 5) - 2; // Término independiente
            
            // Renderizado ultra limpio usando <sup> para el cuadrado flotante
            if (b === 0) {
                htmlStr = `f(x) = ${a === 1 ? '' : a}x<sup>2</sup>`;
            } else {
                let sign = b > 0 ? '+' : '-';
                htmlStr = `f(x) = ${a === 1 ? '' : a}x<sup>2</sup> ${sign} ${Math.abs(b)}`;
            }
            // Operación matemática real de la cuadrática: a * (x * x) + b
            ans = a * (x * x) + b;
            currentExercise = { type: 'quadratic', a, b, x, ans };
        } 
        else if (currentLevel === 3) { // 3. EXPONENCIAL REAL: a^x + b
            let a = Math.floor(Math.random() * 2) + 2; // Base grande 2 o 3
            let b = Math.floor(Math.random() * 5) - 2; 
            
            if (b === 0) {
                htmlStr = `f(x) = ${a}<sup>x</sup>`;
            } else {
                let sign = b > 0 ? '+' : '-';
                htmlStr = `f(x) = ${a}<sup>x</sup> ${sign} ${Math.abs(b)}`;
            }
            // Operación matemática real: a elevado a la x, más b
            ans = Math.pow(a, x) + b;
            currentExercise = { type: 'exponential', a, b, x, ans };
        } 
        else if (currentLevel === 4) { // 4. COMPUESTA: g(f(x))
            let b = Math.floor(Math.random() * 5) + 2;
            htmlStr = `f(x) = 2x, g(x) = x + ${b}. <br> Halle: (g ∘ f)(${x})`;
            ans = (2 * x) + b;
            currentExercise = { type: 'composite', b, x, ans };
        }

        equationText.innerHTML = htmlStr;
        questionText.innerHTML = currentLevel === 4 ? `Calcule el valor del sistema compuesto:` : `Calcule el valor de f(${x}):`;
        
        drawGraph(false);
    }

    btnVerify.addEventListener('click', () => {
        const inputVal = parseInt(userAnswer.value);
        if (isNaN(inputVal)) return;

        userAnswer.disabled = true;
        btnVerify.classList.add('hidden');
        btnNext.classList.remove('hidden');
        feedbackPanel.classList.remove('hidden');

        if (inputVal === currentExercise.ans) {
            score++;
            currentScoreTxt.innerText = score;
            feedbackPanel.className = "feedback-box success";
            feedbackMessage.innerText = successMessages[Math.floor(Math.random() * successMessages.length)];
            drawGraph(true);
        } else {
            feedbackPanel.className = "feedback-box error";
            feedbackMessage.innerText = errorMessages[Math.floor(Math.random() * errorMessages.length)];
        }
    });

    btnNext.addEventListener('click', () => {
        if (score >= 2) {
            score = 0;
            currentScoreTxt.innerText = score;
            currentLevel++;
            
            if (currentLevel > 4) {
                alert("¡Felicidades, “Simulación Finalizada. Ha resuelto la ecuación que unifica la gravedad cuántica.!RECUERDA, SI PUEDES IMAGINARLO PUEDES PROGRAMARLO.");
                currentLevel = 1;
            }
            updateTabs();
        }
        generateExercise();
    });

    function updateTabs() {
        const tabs = {
            1: { id: 'tab-linear', title: "Función Lineal" },
            2: { id: 'tab-quadratic', title: "Función Cuadrática" },
            3: { id: 'tab-exponential', title: "Función Exponencial" },
            4: { id: 'tab-composite', title: "Función Compuesta" }
        };

        Object.keys(tabs).forEach(lvl => {
            const el = document.getElementById(tabs[lvl].id);
            if (parseInt(lvl) === currentLevel) {
                el.className = "level-tab active";
                challengeTitle.innerText = tabs[lvl].title;
            } else if (parseInt(lvl) < currentLevel) {
                el.className = "level-tab unlocked";
                el.innerText = "✓ " + tabs[lvl].title.toUpperCase();
            } else {
                el.className = "level-tab locked";
            }
        });
    }

    function drawGraph(showFunction) {
        const ctx = document.getElementById('mathGraph').getContext('2d');
        if (chartInstance) chartInstance.destroy();

        let labels = [];
        let data = [];

        for (let i = -2; i <= 6; i++) {
            labels.push(i);
            if (showFunction) {
                if (currentExercise.type === 'linear') data.push(currentExercise.a * i + currentExercise.b);
                if (currentExercise.type === 'quadratic') data.push(currentExercise.a * (i * i) + currentExercise.b);
                if (currentExercise.type === 'exponential') data.push(Math.pow(currentExercise.a, i) + currentExercise.b);
                if (currentExercise.type === 'composite') data.push((2 * i) + currentExercise.b);
            } else {
                data.push(null);
            }
        }

        chartInstance = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Trayectoria f(x)',
                    data: data,
                    borderColor: '#2563eb',
                    borderWidth: 3,
                    pointBackgroundColor: '#0f172a',
                    tension: 0.1,
                    fill: false
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: { grid: { color: '#e2e8f0' } },
                    y: { grid: { color: '#e2e8f0' } }
                }
            }
        });
    }

    generateExercise();
});

window.onload = () => {
    document.getElementById('mailErrorMessage').style.display = "none";
    document.getElementById('urlErrorMessage').style.display = "none";
    document.getElementById('quizCanvas').style.display = "none";
    document.getElementById('resultButton').style.display = "none";
    //document.forms.mathQuizForm.addEventListener("change", validateForm);
}

let blockX;
let blockY;
let clicks = 1;
let questions = [];
let results = [];
let binds = 0;

function validateMail(mail) {
    if (/[A-Za-z0-9\._-]+@(gmail|yahoo)+\.com/.test(mail)) {
        document.getElementById('mailErrorMessage').style.display = "none";
        return true;
    };
    if (mail !== "") {
        document.getElementById('mailErrorMessage').style.display = "block";
    }
}

function validateUrl(url) {
    if (/^(http|https):\/\/[A-Za-z0-9_\-]+\.[A-Za-z0-9_\-]+\.[A-Za-z0-9_\-]+/.test(url)) {
        document.getElementById('urlErrorMessage').style.display = "none";
        return true;
    }
    if (url !== "") {
        document.getElementById('urlErrorMessage').style.display = "block";
    }
}

function validateForm() {
    let mail = validateMail(document.forms.mathQuizForm.email.value);
    let lastName = document.forms.mathQuizForm.lastName.validity.valid;
    let firstName = document.forms.mathQuizForm.firstName.validity.valid;
    let url = validateUrl(document.forms.mathQuizForm.favoriteWebPage.value);
    if (lastName && firstName && mail && url) {
        document.getElementById('submitButton').disabled = false;
    }
    else {
        document.getElementById('submitButton').disabled = true;
    }
}

function lastModified() {
    document.getElementById('lastModified').innerText = `Last modified: ${document.lastModified}`;
}

function startQuiz() {
    generateQuestions();
    console.log(generatedQestions);
    document.getElementById('quizCanvas').style.display = "inline-block";
    let canvas = document.getElementById('quizCanvas');
    let quizCanvas2d = document.getElementById('quizCanvas').getContext('2d');
    let questionCount = document.getElementById('questionCount').value;
    quizCanvas2d.fillStyle = 'white';
    quizCanvas2d.fillRect(200, 0, 600, 500);

    let blockSize = canvas.height / questionCount

    for (let i = 0; i < questionCount; i++) {
        quizCanvas2d.fillRect(0, (i + 1) * blockSize, 200, 2);
        quizCanvas2d.font = '1em Arial';
        quizCanvas2d.fillText(generatedQestions[i][1], 70, i * blockSize + blockSize / 2 + 10);
        quizCanvas2d.fillRect(800, (i + 1) * blockSize, 200, 2);
        quizCanvas2d.fillText(String(generatedQestions[i][0]), 890, i * blockSize + blockSize / 2 + 10);
    }
}

function RNG(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}

let generatedQestions = [];
let onlyGeneratedResults = [];

function generateQuestions() {
    let operator = document.getElementById('aritmOperation').value;
    let questionCount = document.getElementById('questionCount').value;

    if (operator === 'addition') {
        for(i = 0; i < questionCount; i++) {
            let a = RNG(1, 50);
            let b = RNG(1, 50);
            let c = a + b;
            generatedQestions[i] = [c, `${a} + ${b}`];
        }
    }
    if (operator === 'substraction') {
        for(i = 0; i < questionCount; i++) {
            let a = RNG(50, 100);
            let b = RNG(0, 50);
            let c = a - b;
            generatedQestions[i] = [c, `${a} - ${b}`];
        }
    }
    if (operator === 'multiplication') {
        for(i = 0; i < questionCount; i++) {
            let a = RNG(1, 10);
            let b = RNG(1, 10);
            let c = a * b;
            generatedQestions[i] = [c, `${a} * ${b}`];
        }
    }
    if (operator === 'division') {
        for(i = 0; i < questionCount; i++) {
            let a = RNG(1, 100);
            let b = RNG(1, 10);
            let c = a / b;
            generatedQestions[i] = [c, `${a} / ${b}`];
        }
    }
}

function makeSelection(event) {
    let questionCount = document.getElementById('questionCount').value;
    let canvas = document.getElementById('quizCanvas');
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    let quizCanvas2d = canvas.getContext('2d');
    let blockSize = canvas.height / questionCount

    quizCanvas2d.fillStyle = '#e65c00';
    if (x < 200) {
        blockX = Math.floor(y / blockSize);
        if (!questions[blockX]) {
            quizCanvas2d.beginPath();
            quizCanvas2d.rect(1, blockX * blockSize + 1, 197, blockSize - 3);
            quizCanvas2d.stroke();
            questions[blockX] = 1;
            clicks = clicks + 1;
        }
        else {
            ok = false;
        }        
    }

    if (x > 600) {
        blockY = Math.floor(y / blockSize);
        if (!results[blockY]) {
            quizCanvas2d.fillRect(0, blockX * blockSize, 200, blockSize);
            quizCanvas2d.fillRect(800, blockY * blockSize, 200, blockSize);

            quizCanvas2d.fillStyle = 'white';
            
            quizCanvas2d.fillRect(0, blockX * blockSize, 200, 2);
            quizCanvas2d.fillRect(800, blockY * blockSize, 200, 2);
            results[blockY] = 1;
            clicks = clicks + 1;
        }
    }

    quizCanvas2d.fillStyle = 'white';
    quizCanvas2d.font = '1em Arial';
    quizCanvas2d.fillStyle = 'white';
    quizCanvas2d.fillText(String(generatedQestions[blockY][0]), 890, blockY * blockSize + blockSize / 2 + 10);
    quizCanvas2d.fillText(generatedQestions[blockX][1], 70, blockX * blockSize + blockSize / 2 + 10);

    quizCanvas2d.beginPath();
    quizCanvas2d.moveTo(200, (blockSize * blockX) + blockSize / 2);
    quizCanvas2d.lineTo(800, (blockSize * blockY) + blockSize / 2);
    if (clicks % 2) {
        quizCanvas2d.strokeStyle = 'blue';
        quizCanvas2d.stroke();
        binds = binds + 1;
        if (String(binds) === questionCount) {
            document.getElementById('resultButton').style.display = "block";
        }
    }
    
}
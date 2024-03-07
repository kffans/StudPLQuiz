var answerIndex = [];
var quizId = '';
const questionsPerQuiz = 10;

function quizInterpret() {
    let content = document.getElementById('quizContent').innerHTML;
    if (content=="") { return 0; }
    let quiz    = document.getElementById('quizForm');
    content     = content.replace(/[\r\n]/gm, '');                /* removes line-breaking characters */
    document.getElementById('quizContent').innerHTML = "";
    
    let contentSplit      = content.split('\\');
    quizId                = contentSplit[0];
    let quizName          = contentSplit[1];
    let quizQuestionCount = parseInt( contentSplit[2] );
    let iterator = 3;

    let questionArray = [];
    let questionText = [];
    let photoUrl = [];
    let answerCount = [];
    
    for(let i = 0; i < quizQuestionCount; i++){
        questionText[i] = contentSplit[iterator];                 /* text of question */
        photoUrl[i]     = contentSplit[iterator + 1];             /* optional url of photo */
        answerCount[i]  = parseInt( contentSplit[iterator + 2] ); /* number of possible answers */
        iterator += 3;
        
        let answerArray = [];                                     /* answers */
        for (let j = 0; j < answerCount[i]; j++) {
            answerArray[j] = contentSplit[iterator];
            iterator++;
        }
        
        let correctAnswer = answerArray[0];                       /* first answer is correct */
        questionArray[i] = shuffle(answerArray);                  /* shuffling the answers */
        for (let j = 0; j < answerCount[i]; j++) {
            if (questionArray[i][j]==correctAnswer)
                answerIndex[i] = j;
        }
    }

    let transformVector = [];
    for (let i = 0; i < quizQuestionCount; i++) {
       transformVector.push(i);
    }
    transformVector = shuffle(transformVector);
    
    /* change the order of indices in these arrays according to the randomized transform vector */
    questionArray = transformArr(transformVector, quizQuestionCount, questionArray);
    questionText  = transformArr(transformVector, quizQuestionCount, questionText);
    photoUrl      = transformArr(transformVector, quizQuestionCount, photoUrl);
    answerCount   = transformArr(transformVector, quizQuestionCount, answerCount);
    answerIndex   = transformArr(transformVector, quizQuestionCount, answerIndex);
    
    let maxQuestionCount;
    if (quizQuestionCount < questionsPerQuiz) { maxQuestionCount = quizQuestionCount; }
    else { maxQuestionCount = questionsPerQuiz; }
    answerIndex = answerIndex.slice(0, maxQuestionCount);
    
    /* building block */
    quiz.innerHTML = "<br><h1>" + quizName + "</h1><br>";
    quiz.innerHTML += '<button onclick="quizHome();">Powrót do wyboru quizu</button>';
    for (let i = 0; i < maxQuestionCount; i++) {
        let nameId = String(quizId) + '_' + String(i);
        quiz.innerHTML += '<br><a id="' + nameId + '"><b>{' + (i+1) + '} ' + questionText[i] + "</b></a>";
        if(photoUrl[i] != "")
            quiz.innerHTML += photoUrl[i];
            //quiz.innerHTML += "<img src='img/" + photoUrl[i] + "'/>";
        quiz.innerHTML += "<br>";
        for (let j = 0; j < answerCount[i]; j++) {
            quiz.innerHTML += '<label class="answer"' + 
                              ' id="label_' + nameId + '_' + j + 
                              '"><input class="answer" type="radio"' + 
                              ' name="' + nameId + 
                              '" id="' + nameId + '_' + j + 
                              '" value="' + j + 
                              '" /> ' + questionArray[i][j] + '</label><br>';
        }
    }
    quiz.innerHTML += '<button onclick="quizCheckAnswers();">Wynik</button><br>';
    
    return 1;
}

function quizLoad(quizName) {
    $("#quizContent").load("quiz/" + quizName + ".txt", function(responseTxt, statusTxt, xhr) {
        if (statusTxt == "success") {
            document.getElementById('quizSelect').style.display = "none";
            document.getElementById('quizForm').style.display = "block";
            quizInterpret();
        }
        if (statusTxt == "error")
            console.log("Error: " + xhr.status + ": " + xhr.statusText);
    });
}

function quizHome() {
    document.getElementById('quizSelect').style.display = "flex";
    document.getElementById('quizForm').style.display = "none";
}

function quizCheckAnswers() {
    let N = answerIndex.length;
    let points = 0;
    
    /* reset the styling of answers */
    for (let i = 0; i < N; i++) {
        let answerName = quizId + '_' + i;
        let radioButtons = document.getElementsByName(answerName);
        let j = 0;
        for (let radio of radioButtons) {
            document.getElementById('label_' + answerName + '_' + j).style.opacity = "100%";
            document.getElementById('label_' + answerName + '_' + j).style.fontWeight = "normal";
            j++;
        }
    }
    
    /* style the answers according to their rightness */
    for (let i = 0; i < N; i++) {
        let answerName = quizId + '_' + i;
        let radioButtons = document.getElementsByName(answerName);
        let isAnyRadioChecked = false;
        for (let radio of radioButtons) {
            if (radio.checked) {
                isAnyRadioChecked = true;
                break;
            }
        }
        if (isAnyRadioChecked) {
            let j = 0;
            for (let radio of radioButtons) {
                if (answerIndex[i] == j) {                    /* right answer */
                    document.getElementById('label_' + answerName + '_' + j).style.fontWeight = "bold";
                    points++;
                }
                if (radio.checked && answerIndex[i] != j) {   /* wrong answer */
                    document.getElementById('label_' + answerName + '_' + j).style.opacity = "40%";
                }
                j++;
            }
        }
    }
}

function transformArr(vector, N, arr) {
    let newArr = [];
    for (let i = 0; i < N; i++) {
        newArr[i] = arr[parseInt(vector[i])];
    }
    return newArr;
}

function shuffle(array) {
    let arr = [];
    for (let i = 0; i < array.length; i++) { arr[i] = array[i]; }
    let currentIndex = arr.length, randomIndex;
    while (currentIndex > 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [arr[currentIndex], arr[randomIndex]] = [arr[randomIndex], arr[currentIndex]];
    }
    return arr;
}

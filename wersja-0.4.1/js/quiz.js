var answerIndex = [];
var quizId = '';
function quizLoad(quizName) {
	$("#quizContent").load("quiz/"+quizName+".txt", function(responseTxt, statusTxt, xhr) {
		if (statusTxt == "success")
			quizInterpret();
		if (statusTxt == "error")
			console.log("Error: " + xhr.status + ": " + xhr.statusText);
	});
}
function quizInterpret(){
	let content = document.getElementById('quizContent').innerHTML;
	let quiz    = document.getElementById('quiz');
	content     = content.replace(/[\r\n]/gm, '');                /* removes line-breaking characters */
	document.getElementById('quizContent').innerHTML = "";
	
	let contentSplit      = content.split('\\');
	quizId                = contentSplit[0];
	let quizName          = contentSplit[1];
	let quizQuestionCount = parseInt( contentSplit[2] );
	let iterator = 3;
	
	quiz.innerHTML = "<h1>" + quizName + "</h1><br><br>";

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
		questionArray[i] = answerArray
						   .map(value => ({ value, sort: Math.random() }))
						   .sort((a, b) => a.sort - b.sort)
						   .map(({ value }) => value);            /* shuffling the answers */
		for (let j = 0; j < answerCount[i]; j++) {
			if(questionArray[i][j]==correctAnswer)
				answerIndex[i] = j;
		}
	}

	let transformVector = [];
    for (let i = 0; i < quizQuestionCount; i++) {
	   transformVector.push(i);
	}
	transformVector = transformVector
					  .map(value => ({ value, sort: Math.random() }))
					  .sort((a, b) => a.sort - b.sort)
					  .map(({ value }) => value);
	
	
	/* change the order of indices in these arrays according to the randomized transform vector */
	questionArray      = transformArr(transformVector, quizQuestionCount, questionArray);
	questionText       = transformArr(transformVector, quizQuestionCount, questionText);
	photoUrl           = transformArr(transformVector, quizQuestionCount, photoUrl);
	answerCount        = transformArr(transformVector, quizQuestionCount, answerCount);
	answerIndex        = transformArr(transformVector, quizQuestionCount, answerIndex);
	
	
	/* building block */
	for(let i = 0; i < quizQuestionCount; i++){
		quiz.innerHTML += "<br><i>" + questionText[i] + "</i>";
		if(photoUrl[i] != "")
			quiz.innerHTML += photoUrl[i];
			//quiz.innerHTML += "<img src='img/" + photoUrl[i] + "'/>";
		quiz.innerHTML += "<br>";
		for (let j = 0; j < answerCount[i]; j++){
			//quiz.innerHTML += questionArray[i][j] + "<br>";
			nameId = String(quizId) + '_' + String(i);
			quiz.innerHTML += '<input type="radio" name="' + nameId + '" id="' + nameId + '_' + j + '" value="' + j + '" />';
			quiz.innerHTML += questionArray[i][j] + "<br>";
		}
	}
}
function transformArr(vector, N, arr){
	let newArr = [];
	for(let i = 0; i < N; i++){
		newArr[i] = arr[ parseInt(vector[i]) ];
	}
	return newArr;
}
function checkAnswers(){
	let N = answerIndex.length;
	let points = 0;
	for(let i = 0; i < N; i++){
		let answerName = quizId + '_' + i;
		if(document.getElementById(answerName + '_' + answerIndex[i]).checked == true)
			points++;
	}
	console.log(points);
	
	
	/*let radioButtons = document.getElementsByName('radio');
	for (let radio of radioButtons) {
		if (radio.checked) {
			output.innerHTML = "The radio button is selected and it's value is " + radio.value;
		}
	}*/
}


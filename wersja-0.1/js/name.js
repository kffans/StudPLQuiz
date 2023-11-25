
function sendName(){
	let name = document.getElementById("nameInput").value;
	
	if(name!="" && name.length<20){
		setCookie("name", name);
	}
	
	setWelcome();
}

function setWelcome(){
	if(cookieExists("name")){
		document.getElementById("hide").style.display = "none";
		
		let name = valueFromCookie("name");
		if(name==""){
			document.getElementById("nameField").innerHTML = "<h1>Cześć!</h1>";
		} else {
			document.getElementById("nameField").innerHTML = "<h1>Cześć " + valueFromCookie("name") + "!</h1>";
		}
	} else {
		document.getElementById("hide").style.display = "block";
	}
}


setWelcome();


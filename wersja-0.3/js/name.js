
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
			document.getElementById("nameField").innerHTML = "Cześć!";
		} else {
			document.getElementById("nameField").innerHTML = "Cześć " + valueFromCookie("name") + "!";
		}
	} else {
		document.getElementById("hide").style.display = "block";
	}
}


setWelcome();


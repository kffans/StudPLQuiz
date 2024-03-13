var input = document.getElementById("nameInput");

function sendName() {
    let name = input.value;
    
    if (name != "" && name.length < 50) {
        name = name[0].toUpperCase() + name.slice(1);
        setCookie("name", name);
    }
    
    setWelcome();
}

input.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        sendName();
    }
});

function setWelcome() {
    if (cookieExists("name")) {
        document.getElementById("hide").style.display = "none";
        
        let name = valueFromCookie("name");
        if (name == "") {
            document.getElementById("nameField").innerHTML = "<h4 style='font-weight: bold;'>Cześć!</h4>";
        } else {
            document.getElementById("nameField").innerHTML = "<h4 style='font-weight: bold;'>Cześć, " + valueFromCookie("name") + "!</h4>";
        }
    } else {
        document.getElementById("hide").style.display = "block";
    }
}

setWelcome();

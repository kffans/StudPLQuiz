function setCookie(cookieName, cookieValue) { //, daysToExpire
    //let expireSeconds = daysToExpire*24*60*60;
    document.cookie = encodeURIComponent(cookieName) + "=" + encodeURIComponent(cookieValue); //+ "; Max-Age=" + expireSeconds
}

function deleteCookie(cookieName){
    document.cookie = cookieName + "=; Max-Age=0";
}

function valueFromCookie(cookieName){
    let cookie = document.cookie;
    if(cookie != ""){
        let cookieValues = cookie.split("; ");
        for(let i=0; i<cookieValues.length; i++){
            let cookieValuesName = cookieValues[i].split('=');
            if(cookieValuesName[0] == cookieName){
                return decodeURIComponent(cookieValuesName[1]);
            }
        }
    }
    return "";
}

function deleteAllCookies(){
    let cookie = document.cookie;
    if(cookie != ""){
        let cookieValues = cookie.split("; ");
        for(let i=0; i<cookieValues.length; i++){
            let cookieValuesName = cookieValues[i].split('=');
            document.cookie = cookieValuesName[0] + "=; Max-Age=0";
        }
    }
}

function cookieExists(cookieName){
    let cookie = document.cookie;
    if(cookie != ""){
        let cookieValues = cookie.split("; ");
        for(let i=0; i<cookieValues.length; i++){
            let cookieValuesName = cookieValues[i].split('=');
            if(cookieValuesName[0] == cookieName){
                return true;
            }
        }
    }
    return false;
}

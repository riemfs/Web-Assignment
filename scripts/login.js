let form = document.getElementsByClassName("login-form")[0];

if(isLoggedIn()){
    let actions = document.getElementsByClassName("action");
    let loginButton = actions[0];

    loginButton.innerText = "Logged in as " + localStorage.getItem("login");
}

form.addEventListener('submit', function(event){
    event.preventDefault();
    let inputFields = document.getElementsByClassName("input-field");
    let username = inputFields[0].getElementsByTagName("input")[0].value;

    let actions = document.getElementsByClassName("action");
    let loginButton = actions[0];

    loginButton.innerText = "Logged in as " + username;
    localStorage.setItem("login" , username)
});

function isLoggedIn(){
    return !(localStorage.getItem("login") === null);
}
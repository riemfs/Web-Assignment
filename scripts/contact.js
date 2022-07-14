var submitbutton = document.getElementById("submit-btn");

console.log(submitbutton)
submitbutton.addEventListener("click", function(event){
    let fname = document.getElementById("name").value;
    let contact = document.getElementById("contactnumber").value;
    let email = document.getElementById("email").value;
    let message = document.getElementById("message").value;
    if(fname == null || fname === ''){
        window.alert("Fill in First Name");
        return;
    }

    if(contact == null || contact === ''){
        window.alert("Fill in Contact Number");
        return;
    }

    if(email == null || email === ''){
        window.alert("Fill in Email");
        return;
    }

    if(message == null || message === ''){
        window.alert("Fill in Message");
        return;
    }
    submitbutton.innerText = "Thank you";
    window.alert("Submitted")
});
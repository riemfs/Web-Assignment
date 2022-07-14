var submitbutton = document.getElementById("submit-btn");

console.log(submitbutton)
submitbutton.addEventListener("click", function(event){
    submitbutton.innerText = "Thank you";
});
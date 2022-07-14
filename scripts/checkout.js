var checkoutButton = document.getElementById("checkout-btn");
var fnameInput = document.getElementById("fname");
var lnameInput = document.getElementById("lname");
var emailInput = document.getElementById("email");
var contactInput = document.getElementById("contactnumber");
var addressInput = document.getElementById("address");

checkoutButton.addEventListener("click", function(event){
    let fname = fnameInput.value;
    let lname = lnameInput.value;
    let email = emailInput.value;
    let contact = contactInput.value;
    let address = addressInput.value;

    let fnamelabel = document.getElementById("fnamelabel");
    let lnamelabel = document.getElementById("lnamelabel");
    let emaillabel = document.getElementById("emaillabel");
    let contactlabel = document.getElementById("contactnumberlabel");
    let addresslabel = document.getElementById("addresslabel");

    let flag = false;
    if(fname === '' || fname == null){
        flag = true;
        fnamelabel.innerText = "First Name* This field is required";
    } else {
        fnamelabel.innerText = "First Name*";
    }

    if(lname === '' || lname == null){
        flag = true;
        lnamelabel.innerText = "Last Name* This field is required";
    } else {
        lnamelabel.innerText = "Last Name*";
    }

    if(email === '' || email == null){
        flag = true;
        emaillabel.innerText = "Email* This field is required";
    } else {
        if(!email.includes("@")){
            flag = true;
            emaillabel.innerText = "Email* Enter a valid email";
        } else {
            emaillabel.innerText = "Email*";
        }
    }

    if(contact === '' || contact == null){
        flag = true;
        contactlabel.innerText = "Contact Number* This field is required";
    } else {
        contactlabel.innerText = "Contact Number*"
    }

    if(address === '' || address == null){
        flag = true;
        addresslabel.innerText = "Delivery Address* This field is required";
    } else {
        addresslabel.innerText = "Delivery Address*"
    }

    if(flag){
        return;
    }

    checkoutButton.innerHTML = "Sucessful";
    localStorage.clear();
    updateCart1();

});

function getTotalCost1(){
    if(localStorage.getItem("item") == null){
        return 0.00;
    }

    let array = JSON.parse(localStorage.getItem("item"))
    console.log("here")
    if (array == null){
        console.log(1)
        return 0.00;
    } 

    var total = 0;
    for(let i = 0; i < array.length; i++){
        let json = array[i];
        total += json.amount * parseFloat(json.price);
    }

    return total.toFixed(2);
}

function updateCart1(){
    let array = JSON.parse(localStorage.getItem("item"));
    var productContainer = document.getElementsByClassName("product-container")[0];
    if(productContainer){
        productContainer.innerHTML = '';
        if(array){
            Object.values(array).map(z => {
                productContainer.innerHTML += `
                    <div>
                        <a href="${z.html}">
                            <img width = 160 height = 160 src="${z.imgsrc}"> 
                            <h4>${z.name}</h4>
                        </a>
                        <h5>RM ${z.price}</h5>
                        <input type = "text" id = "count" class = "count" name = "count" value = "${z.amount}">
                        <button class="delete-btn">Delete</button>
                    </div>
                `
            });
        }
    }

    var totalDiv = document.getElementsByClassName("total")[0];
    if(totalDiv){
        totalDiv.innerHTML = `
        <br>
        <h4>Total: RM ${getTotalCost1()}</h4>
        `
    }
}
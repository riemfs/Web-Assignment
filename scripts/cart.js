const addToCartButtons = document.querySelectorAll('.addToCart');
if(addToCartButtons){
    for (let i = 0; i < addToCartButtons.length; i++){
        addToCartButtons[i].addEventListener('click', function(event){
            let button = event.target;
            let a = button.parentElement.getElementsByTagName("a");
            if(a.length != 0){
                a = a[0];
                let pList = a.getElementsByTagName("p");
                let img = a.getElementsByTagName("img")[0];
                let name = pList[0].innerText;
                let price = pList[1].innerText.slice(3);
                let imgsrc = img.getAttribute("src");
                let html = a.getAttribute("href");
                saveToLocal(name, price, imgsrc, html);
                return;
            }

            let div = document.getElementsByClassName("product")[0];
            let name = div.getElementsByTagName("h1")[0].innerText;
            let price = div.getElementsByTagName("h2")[0].innerText.slice(3);
            let imgsrc = div.getElementsByTagName("img")[0].getAttribute("src");
            let html = window.location.pathname;
            console.log(html);
            saveToLocal(name, price, imgsrc, html);
        });
    }
}

updateCart();

function addInputUpdateEvent(){
    const countInputs = document.getElementsByClassName("count");
    if(countInputs){
        for(let i = 0 ; i < countInputs.length; i++){
            let input = countInputs[i];
            input.addEventListener("keypress", function(event){
                if (event.key === "Enter") {
                    let parent = input.parentElement;
                    let a = parent.getElementsByTagName("a")[0];
                    let name = a.getElementsByTagName("h4")[0].innerText;
                    let price = parent.getElementsByTagName("h5")[0].innerText.slice(3);
                    let imgsrc = a.getElementsByTagName("img")[0].getAttribute("src");
                    let html = a.getAttribute("href")[0];
                    saveToLocalWithAmount(name, price, imgsrc, html, input.value);
                    updateCart();
                }
            })
        }
    }
}

function addDeleteEvent(){
    const deleteButton = document.getElementsByClassName("delete-btn");
    if(deleteButton){
        for (let i = 0; i < deleteButton.length; i++){
            deleteButton[i].addEventListener('click', function(event){
                let button = event.target;
                let parent = button.parentElement;
                let a = parent.getElementsByTagName("a")[0];
                let name = a.getElementsByTagName("h4")[0].innerText;
                removeFromStorage(name);
                updateCart();
            });
        }
    }
}

function saveToLocal(name, price, imgsrc, html){
    let amount = 1;
    let array = JSON.parse(localStorage.getItem("item"));
    if (array == null){
        array = [];
    } else {
        var flag = false;
        for(let i = 0; i < array.length; i++){
            let json = array[i];
            if(json.name == name){
                flag = true;
                json.amount = json.amount + 1;
                break;
            }
        }
    }

    if(!flag){
        array.push({name: name, price: price, amount: amount, imgsrc: imgsrc, html: html});
    }

    localStorage.setItem("item", JSON.stringify(array));
}

function saveToLocalWithAmount(name, price, imgsrc, html, amount){
    let array = JSON.parse(localStorage.getItem("item"));
    if (array == null){
        array = [];
    } else {
        var flag = false;
        for(let i = 0; i < array.length; i++){
            let json = array[i];
            if(json.name == name){
                flag = true;
                json.amount = amount;
                break;
            }
        }
    }

    if(!flag){
        array.push({name: name, price: price, amount: amount, imgsrc: imgsrc, html: html});
    }

    localStorage.setItem("item", JSON.stringify(array));
}

function removeFromStorage(name){
    let array = JSON.parse(localStorage.getItem("item"));
    if (array == null){
        array = [];
    } else {
        for(let i = 0; i < array.length; i++){
            let json = array[i];
            if(json.name == name){
                array.splice(i, 1);
                break;
            }
        }
    }

    localStorage.setItem("item", JSON.stringify(array));
}

function updateAmount(name, amount){
    let array = JSON.parse(localStorage.getItem("item"));
    if (array == null){
        return;
    } 

    for(let i = 0; i < array.length; i++){
        let json = array[i];
        if(json.name == name){
            json.amount = amount;
            break;
        }
    }

    localStorage.setItem("item", JSON.stringify(array))
}

function getTotalCost(){
    let array = JSON.parse(localStorage.getItem("item"))
    if (array == null){
        return 0;
    } 

    var total = 0;
    for(let i = 0; i < array.length; i++){
        let json = array[i];
        total += json.amount * parseFloat(json.price);
    }

    return total.toFixed(2);
}

function updateCart(){
    let array = JSON.parse(localStorage.getItem("item"));
    var productContainer = document.getElementsByClassName("product-container")[0];
    if(array && productContainer){
        productContainer.innerHTML = '';
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

    var totalDiv = document.getElementsByClassName("total")[0];
    if(totalDiv){
        totalDiv.innerHTML = `
        <br>
        <h4>Total: RM ${getTotalCost()}</h4>
        `
    }

    addDeleteEvent();
    addInputUpdateEvent();
}



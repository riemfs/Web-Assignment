
window.onload = () =>{
    var searchbar = document.getElementById("searchbar");
    if(searchbar){
        searchbar.addEventListener("keyup", function(event){
            updateProductListings(searchbar.value);
        });
    }
}

function updateProductListings(name){
    name = name.toLowerCase();
    let searchedProduct = [];
    for(let i = 0; i < products.length; i++){
        let product = products[i];
        let productName = product.name.toLowerCase();
        if(productName.includes(name)){
            searchedProduct.push(product)
        }
    }

    let amount = 0;
    let producttables = document.getElementById("product-tables");
    if (!producttables){
        return;
    }

    let htmlString = '';
    Object.values(searchedProduct).map(z =>{
        amount++;
        if (amount == 1){
            htmlString += `
            <tr>
                <td style="word-wrap: break-word">
                    <a href = "${z.html}">
                        <img width = "160" height = "160" src="${z.imgsrc}">
                        <p><b>${z.name}</b></p>
                        <p><b>RM ${z.price}</b></p>
                    </a>
                    <button class="addToCart">Add To Cart</button>
                </td>
            `
        } else if(amount == 3){
            htmlString += `
                <td style="word-wrap: break-word;">
                    <a href = "${z.html}">
                        <img width = "160" height = "160" src="${z.imgsrc}">
                        <p><b>${z.name}</b></p>
                        <p><b>RM ${z.price}</b></p>
                    </a>
                    <button class="addToCart">Add To Cart</button>
                </td>
            </tr>
            `
            amount = 0;
        } else {
            htmlString += `
                <td style="word-wrap: break-word">
                    <a href = "${z.html}">
                        <img width = "160" height = "160" src="${z.imgsrc}">
                        <p><b>${z.name}</b></p>
                        <p><b>RM ${z.price}</b></p>
                    </a>
                    <button class="addToCart">Add To Cart</button>
                </td>
                `
        }
    });
    if (amount != 0){
        htmlString += "</tr>";
    }
    producttables.innerHTML = htmlString;

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
                let price = div.getElementsByTagName("h2")[1].innerText;
                let imgsrc = div.getElementsByTagName("img")[0].getAttribute("src");
                let html = window.location.pathname;
                console.log(html);
                saveToLocal(name, price, imgsrc, html);
            });
        }
    }
}


var products = 
[
    {
        name: "Apple AirPods Pro",
        price: 858.00,
        imgsrc: "img/airpods_pro.jpg",
        html: "airpodspro.html"
    },
    {
        name: "Beats Fit Pro True Wireless Earbuds",
        price: 899.00,
        imgsrc: "img/beats_fit_pro.jpg",
        html: "beatsfitpro.html"
    },
    {
        name: "Huawei Freebuds Studio",
        price: 1199.00,
        imgsrc: "img/HuaweiFreeBudsStudio.jpg",
        html: "huaweifreebudsstudio.html"
    },
    {
        name: "Logitech G213 Prodigy Gaming Keyboard",
        price: 149.00,
        imgsrc: "img/Logitech-G213.jpg",
        html: "logitechg213.html"
    },
    {
        name: "Logitech G413 Carbon Mechanical Backlit Gaming Keyboard",
        price: 209.00,
        imgsrc: "img/Logitech-G413.png",
        html: "logitechg413.html"
    },
    {
        name: "G Pro X Superlight Wireless",
        price: 649.00,
        imgsrc: "img/LogitechSuperlight.jpg",
        html: "gprosuperlight.html"
    },
];
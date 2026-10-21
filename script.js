// ==========================================
// AI'RAF BABY STORE LIMITED
// SHOP & ORDER SYSTEM
// ==========================================


// ==========================================
// ORDER DATA
// ==========================================

let order = [];


// ==========================================
// ELEMENTS
// ==========================================

const productCards =
    document.querySelectorAll(".product-card");

const cartCount =
    document.getElementById("cart-count");

const viewOrderButton =
    document.getElementById("view-order-btn");

const orderModal =
    document.getElementById("order-modal");

const closeOrderButton =
    document.getElementById("close-order");

const continueShoppingButton =
    document.getElementById("continue-shopping");

const orderList =
    document.getElementById("order-list");

const placeOrderButton =
    document.getElementById("place-order");


// ==========================================
// REQUEST PRODUCT ELEMENTS
// ==========================================

const requestProductButton =
    document.getElementById("request-product-btn");

const requestProductModal =
    document.getElementById("product-request-modal");

const closeRequestProductButton =
    document.getElementById("close-request-product");

const requestedProductInput =
    document.getElementById("requested-product");

const requestedQuantityInput =
    document.getElementById("requested-quantity");

const requestedDetailsInput =
    document.getElementById("requested-details");

const addRequestedProductButton =
    document.getElementById("add-requested-product");


// ==========================================
// QUANTITY CONTROLS
// ==========================================

document.querySelectorAll(".product-card").forEach(function(card) {

    const minusButton =
        card.querySelector(".quantity-minus");

    const plusButton =
        card.querySelector(".quantity-plus");

    const quantityDisplay =
        card.querySelector(".quantity");


    if (minusButton) {

        minusButton.addEventListener("click", function() {

            let quantity =
                parseInt(quantityDisplay.textContent);

            if (quantity > 1) {
                quantity--;
            }

            quantityDisplay.textContent = quantity;

        });

    }


    if (plusButton) {

        plusButton.addEventListener("click", function() {

            let quantity =
                parseInt(quantityDisplay.textContent);

            quantity++;

            quantityDisplay.textContent = quantity;

        });

    }

});


// ==========================================
// ADD NORMAL PRODUCTS TO ORDER
// ==========================================

document.querySelectorAll(".add-order-btn").forEach(function(button) {

    button.addEventListener("click", function() {

        const productName =
            button.getAttribute("data-product");

        const card =
            button.closest(".product-card");

        const quantityDisplay =
            card.querySelector(".quantity");

        const quantity =
            parseInt(quantityDisplay.textContent);


        const existingProduct =
            order.find(function(item) {

                return (
                    item.name === productName &&
                    !item.requested
                );

            });


        if (existingProduct) {

            existingProduct.quantity += quantity;

        } else {

            order.push({

                name: productName,

                quantity: quantity,

                requested: false

            });

        }


        updateCartCount();


        // Reset quantity back to 1

        quantityDisplay.textContent = "1";


        // Small confirmation

        button.textContent = "Added ✓";

        setTimeout(function() {

            button.textContent = "Add to Order";

        }, 1200);

    });

});


// ==========================================
// UPDATE CART COUNT
// ==========================================

function updateCartCount() {

    if (!cartCount) {
        return;
    }


    let totalItems = 0;


    order.forEach(function(item) {

        totalItems += item.quantity;

    });


    cartCount.textContent =
        totalItems + (totalItems === 1 ? " item" : " items");

}


// ==========================================
// OPEN MY ORDER
// ==========================================

if (viewOrderButton) {

    viewOrderButton.addEventListener("click", function() {

        renderOrder();

        orderModal.style.display = "flex";

    });

}


// ==========================================
// CLOSE MY ORDER
// ==========================================

if (closeOrderButton) {

    closeOrderButton.addEventListener("click", function() {

        orderModal.style.display = "none";

    });

}


if (continueShoppingButton) {

    continueShoppingButton.addEventListener("click", function() {

        orderModal.style.display = "none";

    });

}


// Close order modal by clicking outside

if (orderModal) {

    orderModal.addEventListener("click", function(event) {

        if (event.target === orderModal) {

            orderModal.style.display = "none";

        }

    });

}


// ==========================================
// RENDER ORDER
// ==========================================

function renderOrder() {

    if (!orderList) {
        return;
    }


    orderList.innerHTML = "";


    if (order.length === 0) {

        orderList.innerHTML = `
            <p class="empty-order">
                Your order is currently empty.
            </p>
        `;

        return;

    }


    order.forEach(function(item, index) {

        const orderItem =
            document.createElement("div");

        orderItem.className = "order-item";


        const details =
            item.requested && item.details
                ? `<small>Details: ${item.details}</small>`
                : "";


        const requestedLabel =
            item.requested
                ? `<span class="requested-label">Requested Product</span>`
                : "";


        orderItem.innerHTML = `

            <div class="order-item-info">

                <strong>
                    ${item.name}
                </strong>

                ${requestedLabel}

                <span>
                    Quantity: ${item.quantity}
                </span>

                ${details}

            </div>


            <button
                class="remove-order-item"
                data-index="${index}">

                Remove

            </button>

        `;


        orderList.appendChild(orderItem);

    });


    // Remove buttons

    document
        .querySelectorAll(".remove-order-item")
        .forEach(function(button) {

            button.addEventListener("click", function() {

                const index =
                    parseInt(button.getAttribute("data-index"));

                order.splice(index, 1);

                updateCartCount();

                renderOrder();

            });

        });

}


// ==========================================
// REQUEST A PRODUCT
// ==========================================

if (requestProductButton) {

    requestProductButton.addEventListener("click", function() {

        requestProductModal.style.display = "flex";

    });

}


// ==========================================
// CLOSE REQUEST PRODUCT MODAL
// ==========================================

if (closeRequestProductButton) {

    closeRequestProductButton.addEventListener("click", function() {

        requestProductModal.style.display = "none";

    });

}


// Close request modal by clicking outside

if (requestProductModal) {

    requestProductModal.addEventListener("click", function(event) {

        if (event.target === requestProductModal) {

            requestProductModal.style.display = "none";

        }

    });

}


// ==========================================
// ADD REQUESTED PRODUCT TO ORDER
// ==========================================

if (addRequestedProductButton) {

    addRequestedProductButton.addEventListener("click", function() {

        const productName =
            requestedProductInput.value.trim();

        const quantity =
            parseInt(requestedQuantityInput.value) || 1;

        const details =
            requestedDetailsInput.value.trim();


        // Check product name

        if (productName === "") {

            alert("Please enter the product you are looking for.");

            requestedProductInput.focus();

            return;

        }


        // Add requested product

        order.push({

            name: productName,

            quantity: quantity < 1 ? 1 : quantity,

            details: details,

            requested: true

        });


        updateCartCount();


        // Clear form

        requestedProductInput.value = "";

        requestedQuantityInput.value = "1";

        requestedDetailsInput.value = "";


        // Close request modal

        requestProductModal.style.display = "none";


        // Open My Order automatically

        renderOrder();

        orderModal.style.display = "flex";

    });

}


// ==========================================
// PLACE ORDER THROUGH WHATSAPP
// ==========================================

if (placeOrderButton) {

    placeOrderButton.addEventListener("click", function() {

        if (order.length === 0) {

            alert("Your order is currently empty.");

            return;

        }


        let message =
            "Hello Ai'raf Baby Store Limited,%0A%0A";

        message +=
            "I would like to make the following order:%0A%0A";


        order.forEach(function(item, index) {

            message +=
                (index + 1) +
                ". " +
                item.name +
                " — Quantity: " +
                item.quantity;


            if (item.requested) {

                message +=
                    "%0A   Product request: Please confirm availability and current price.";


                if (item.details) {

                    message +=
                        "%0A   Details: " +
                        encodeURIComponent(item.details);

                }

            }


            message += "%0A%0A";

        });


        message +=
            "Please confirm availability and provide the current price for each product.%0A%0A";

        message +=
            "Thank you.";


        // Replace this with the store's real WhatsApp number later

        const whatsappNumber =
             "2347033004900";


        const whatsappURL =
            "https://wa.me/" +
            whatsappNumber +
            "?text=" +
            message;


        window.open(
            whatsappURL,
            "_blank"
        );

    });

}


// ==========================================
// CATEGORY FILTERING
// ==========================================

const filterButtons =
    document.querySelectorAll(".category-filter");


function showCategory(category) {

    productCards.forEach(function(card) {

        const cardCategory =
            card.getAttribute("data-category");


        if (
            category === "all" ||
            cardCategory === category
        ) {

            card.style.display = "";

        } else {

            card.style.display = "none";

        }

    });


    filterButtons.forEach(function(button) {

        button.classList.remove("active");


        if (
            button.getAttribute("data-filter") === category
        ) {

            button.classList.add("active");

        }

    });

}


// Filter buttons

filterButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        const category =
            button.getAttribute("data-filter");

        showCategory(category);

    });

});


// ==========================================
// CATEGORY FROM HOMEPAGE URL
// ==========================================

const urlParams =
    new URLSearchParams(window.location.search);

const categoryFromURL =
    urlParams.get("category");


if (
    categoryFromURL &&
    productCards.length > 0
) {

    showCategory(categoryFromURL);

}


// ==========================================
// INITIAL CART COUNT
// ==========================================

updateCartCount();

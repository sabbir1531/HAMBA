// ================= MOBILE MENU =================

const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");

menuToggle.addEventListener("click", () => {

    mobileMenu.classList.toggle("open");

    menuToggle.textContent =
        mobileMenu.classList.contains("open")
            ? "✕"
            : "☰";

});


// ================= CART DATA =================

let cart = JSON.parse(
    localStorage.getItem("hambaCart")
) || [];


// ================= ELEMENTS =================

const cartButton =
    document.getElementById("cartButton");

const cartSidebar =
    document.getElementById("cartSidebar");

const cartOverlay =
    document.getElementById("cartOverlay");

const closeCart =
    document.getElementById("closeCart");
    const checkoutButton =
    document.querySelector(".checkout-btn");

checkoutButton.addEventListener("click", () => {

    if (cart.length === 0) {

        alert("Your cart is empty!");

        return;
    }

    window.location.href = "checkout.html";

});

const cartItems =
    document.getElementById("cartItems");

const cartCount =
    document.getElementById("cartCount");

const cartTotal =
    document.getElementById("cartTotal");


// ================= OPEN CART =================

cartButton.addEventListener("click", () => {

    cartSidebar.classList.add("open");

    cartOverlay.classList.add("show");

});


// ================= CLOSE CART =================

function closeCartSidebar() {

    cartSidebar.classList.remove("open");

    cartOverlay.classList.remove("show");

}

closeCart.addEventListener(
    "click",
    closeCartSidebar
);

cartOverlay.addEventListener(
    "click",
    closeCartSidebar
);


// ================= PRODUCT CARDS =================

const productCards =
    document.querySelectorAll(".beef-product-card");


productCards.forEach(card => {

    const price =
        Number(card.dataset.price);

    const name =
        card.dataset.name;

    const image =
        card.dataset.image;

    const quantityInput =
        card.querySelector(".quantity-input");

    const totalPrice =
        card.querySelector(".total-price");

    const quickButtons =
        card.querySelectorAll(
            ".quick-quantity button"
        );

    const addButton =
        card.querySelector(".add-cart-btn");


    // ================= UPDATE PRICE =================

    function updatePrice() {

        let quantity =
            Number(quantityInput.value);

        if (
            !quantity ||
            quantity < 0.1
        ) {
            quantity = 0.1;

            quantityInput.value =
                quantity;
        }

        if (quantity > 100) {

            quantity = 100;

            quantityInput.value =
                quantity;
        }

        const total =
            price * quantity;

        totalPrice.textContent =
            `৳${total.toFixed(2)}`;

    }


    // ================= QUICK QUANTITY =================

    quickButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                quickButtons.forEach(btn =>
                    btn.classList.remove(
                        "active"
                    )
                );

                button.classList.add(
                    "active"
                );

                quantityInput.value =
                    button.dataset.quantity;

                updatePrice();

            }
        );

    });


    // ================= CUSTOM QUANTITY =================

    quantityInput.addEventListener(
        "input",
        () => {

            quickButtons.forEach(btn =>
                btn.classList.remove(
                    "active"
                )
            );

            updatePrice();

        }
    );


    // ================= ADD TO CART =================

    addButton.addEventListener(
        "click",
        () => {

            const quantity =
                Number(
                    quantityInput.value
                );

            if (
                quantity < 0.1 ||
                quantity > 100
            ) {

                alert(
                    "Please select between 0.1 KG and 100 KG."
                );

                return;
            }


            const existingItem =
                cart.find(item =>
                    item.name === name
                );


            // যদি একই product আগে থাকে

            if (existingItem) {

                existingItem.quantity +=
                    quantity;

                // সর্বোচ্চ 100 KG

                if (
                    existingItem.quantity >
                    100
                ) {

                    existingItem.quantity =
                        100;

                }

            } else {

                cart.push({

                    name: name,

                    price: price,

                    quantity: quantity,

                    image: image

                });

            }


            // LocalStorage Save

            localStorage.setItem(
                "hambaCart",
                JSON.stringify(cart)
            );


            updateCartUI();


            // ছোট notification

            addButton.textContent =
                "Added ✓";

            setTimeout(() => {

                addButton.textContent =
                    "Add to Cart";

            }, 1200);

        }
    );

});


// ================= UPDATE CART UI =================

function updateCartUI() {

    cartItems.innerHTML = "";

    let totalAmount = 0;

    let totalItems = 0;


    if (cart.length === 0) {

        cartItems.innerHTML = `

            <p class="empty-cart">

                Your cart is empty.

            </p>

        `;

    }


    cart.forEach((item, index) => {

        const itemTotal =
            item.price *
            item.quantity;

        totalAmount +=
            itemTotal;

        totalItems++;


        const cartItem =
            document.createElement("div");

        cartItem.className =
            "cart-item";


        cartItem.innerHTML = `

            <img
                src="${item.image}"
                alt="${item.name}"
            >

            <div>

                <h4>
                    ${item.name}
                </h4>

                <p>
                    ${item.quantity} KG ×
                    ৳${item.price}
                </p>

                <strong>
                    ৳${itemTotal.toFixed(2)}
                </strong>

            </div>

            <button
                class="remove-item"
                data-index="${index}"
            >

                ✕
            </button>

        `;


        cartItems.appendChild(
            cartItem
        );

    });


    // Cart Count

    cartCount.textContent =
        totalItems;


    // Total

    cartTotal.textContent =
        `৳${totalAmount.toFixed(2)}`;


    // Save Again

    localStorage.setItem(
        "hambaCart",
        JSON.stringify(cart)
    );


    // Remove Buttons

    const removeButtons =
        document.querySelectorAll(
            ".remove-item"
        );


    removeButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const index =
                    Number(
                        button.dataset.index
                    );

                cart.splice(
                    index,
                    1
                );

                updateCartUI();

            }
        );

    });

}


// ================= INITIAL LOAD =================

updateCartUI();
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


// ================= CART =================

let cart = JSON.parse(
    localStorage.getItem("hambaCart")
) || [];

const checkoutItems =
    document.getElementById("checkoutItems");

const checkoutSubtotal =
    document.getElementById("checkoutSubtotal");

const deliveryChargeElement =
    document.getElementById("deliveryCharge");

const checkoutTotal =
    document.getElementById("checkoutTotal");

const deliveryMethod =
    document.getElementById("deliveryMethod");


// ================= RENDER CHECKOUT =================

function renderCheckout() {

    checkoutItems.innerHTML = "";

    let subtotal = 0;


    if (cart.length === 0) {

        checkoutItems.innerHTML = `
            <p style="color:#777;">
                Your cart is empty.
            </p>
        `;

    }


    cart.forEach(item => {

        const itemTotal =
            item.price * item.quantity;

        subtotal += itemTotal;


        const itemElement =
            document.createElement("div");

        itemElement.className =
            "checkout-item";


        itemElement.innerHTML = `

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

            </div>

            <strong>
                ৳${itemTotal.toFixed(2)}
            </strong>

        `;


        checkoutItems.appendChild(
            itemElement
        );

    });


    // DELIVERY CHARGE

    let deliveryCharge = 0;

    if (
        deliveryMethod.value === "home" &&
        cart.length > 0
    ) {

        deliveryCharge = 100;

    }


    const total =
        subtotal + deliveryCharge;


    checkoutSubtotal.textContent =
        `৳${subtotal.toFixed(2)}`;

    deliveryChargeElement.textContent =
        `৳${deliveryCharge.toFixed(2)}`;

    checkoutTotal.textContent =
        `৳${total.toFixed(2)}`;

}


// ================= DELIVERY CHANGE =================

deliveryMethod.addEventListener(
    "change",
    renderCheckout
);


// ================= PLACE ORDER =================

const checkoutForm =
    document.getElementById("checkoutForm");

const orderModal =
    document.getElementById("orderModal");

const orderMessage =
    document.getElementById("orderMessage");


checkoutForm.addEventListener(
    "submit",
    event => {

        event.preventDefault();


        if (cart.length === 0) {

            alert(
                "Your cart is empty!"
            );

            return;

        }


        const name =
            document.getElementById(
                "customerName"
            ).value;


        // Temporary Order ID

        const orderId =
            "HAMBA-" +
            Date.now()
                .toString()
                .slice(-6);


        // Order Save

        const order = {

            orderId: orderId,

            customerName: name,

            phone:
                document.getElementById(
                    "customerPhone"
                ).value,

            address:
                document.getElementById(
                    "customerAddress"
                ).value,

            city:
                document.getElementById(
                    "customerCity"
                ).value,

            area:
                document.getElementById(
                    "customerArea"
                ).value,

            deliveryMethod:
                deliveryMethod.value,

            paymentMethod:
                document.getElementById(
                    "paymentMethod"
                ).value,

            items: cart,

            orderDate:
                new Date().toLocaleString()

        };


        // LocalStorage Order Save

        let orders = JSON.parse(
            localStorage.getItem("hambaOrders")
        ) || [];


        orders.push(order);


        localStorage.setItem(
            "hambaOrders",
            JSON.stringify(orders)
        );


        // Clear Cart

        localStorage.removeItem(
            "hambaCart"
        );

        cart = [];


        // Show Success

        orderMessage.textContent =
            `Thank you ${name}! Your order ID is ${orderId}.`;

        orderModal.classList.add("show");

    }
);


// ================= INITIAL LOAD =================

renderCheckout();
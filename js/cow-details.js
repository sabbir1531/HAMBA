// ===================================
// HAMBA - COW DETAILS PAGE
// ===================================


// ===============================
// DEMO COW DATA
// একই data এখানে রাখা হচ্ছে
// ===============================

const demoCows = [

    {
        id: "DEMO-1",
        name: "Deshi Premium Cow",
        breed: "Deshi",
        age: 3,
        weight: 350,
        price: 280000,
        location: "Savar, Dhaka",
        description:
            "Healthy Deshi cow raised in a clean and well maintained farm.",
        phone: "01700000001",
        image:
            "https://images.unsplash.com/photo-1546445317-29f4545e9d53",
        status: "Available"
    },

    {
        id: "DEMO-2",
        name: "Sahiwal Cow",
        breed: "Sahiwal",
        age: 4,
        weight: 420,
        price: 350000,
        location: "Gazipur, Dhaka",
        description:
            "Healthy Sahiwal cow with excellent body condition.",
        phone: "01700000002",
        image:
            "https://images.unsplash.com/photo-1596733430284-f7437764b1a9",
        status: "Available"
    },

    {
        id: "DEMO-3",
        name: "Red Chittagong Cow",
        breed: "RCC",
        age: 3,
        weight: 300,
        price: 250000,
        location: "Chattogram",
        description:
            "Well maintained Red Chittagong Cow from a local farm.",
        phone: "01700000003",
        image:
            "https://images.unsplash.com/photo-1570042225831-d98fa7577b8e",
        status: "Available"
    },

    {
        id: "DEMO-4",
        name: "Holstein Cow",
        breed: "Holstein",
        age: 5,
        weight: 500,
        price: 450000,
        location: "Narayanganj",
        description:
            "Large and healthy Holstein cow suitable for dairy and breeding.",
        phone: "01700000004",
        image:
            "https://images.unsplash.com/photo-1516467508483-a7212febe31a",
        status: "Available"
    }

];


// ===============================
// GET SELECTED COW
// ===============================

const selectedCow =

    JSON.parse(

        localStorage.getItem(
            "selectedCow"
        )

    );


// ===============================
// GET SELLER COWS
// ===============================

const sellerCows =

    JSON.parse(

        localStorage.getItem(
            "hambaLiveCows"
        )

    )

    || [];


// ALL COWS

const allCows = [

    ...sellerCows,

    ...demoCows

];


// ===============================
// REDIRECT IF NO COW
// ===============================

if (!selectedCow) {

    window.location.href =
        "live-cows.html";

}


// ===============================
// DISPLAY DETAILS
// ===============================

function displayCowDetails() {

    const container =

        document.getElementById(
            "cowDetails"
        );


    container.innerHTML = `

        <div class="details-card">


            <!-- IMAGE -->

            <div class="details-image">

                <img
                    src="${selectedCow.image}"
                    alt="${selectedCow.name}"
                >

                <span class="details-status">

                    ${selectedCow.status}

                </span>

            </div>


            <!-- INFO -->

            <div class="details-info">


                <h1>

                    ${selectedCow.name}

                </h1>


                <p class="details-breed">

                    Breed:
                    ${selectedCow.breed}

                </p>


                <div class="details-price">

                    ৳ ${Number(
                        selectedCow.price
                    ).toLocaleString()}

                </div>


                <!-- DETAILS GRID -->

                <div class="details-grid">


                    <div class="info-box">

                        <div class="info-label">

                            Age

                        </div>

                        <div class="info-value">

                            ${selectedCow.age} Years

                        </div>

                    </div>


                    <div class="info-box">

                        <div class="info-label">

                            Weight

                        </div>

                        <div class="info-value">

                            ${selectedCow.weight} KG

                        </div>

                    </div>


                    <div class="info-box">

                        <div class="info-label">

                            Location

                        </div>

                        <div class="info-value">

                            ${selectedCow.location}

                        </div>

                    </div>


                    <div class="info-box">

                        <div class="info-label">

                            Status

                        </div>

                        <div class="info-value">

                            ${selectedCow.status}

                        </div>

                    </div>


                </div>


                <!-- DESCRIPTION -->

                <div class="details-description">

                    <h3>

                        Description

                    </h3>

                    <p>

                        ${selectedCow.description ||
                          "No additional description available."}

                    </p>

                </div>


                <!-- SELLER INFO -->

                <div class="seller-info">

                    <h3>

                        Seller Information

                    </h3>

                    <p>

                        📍 ${selectedCow.location}

                    </p>

                    <p>

                        📞 ${selectedCow.phone ||
                            "Contact available after request"}

                    </p>

                </div>


                <!-- ACTIONS -->

                <div class="details-actions">


                    <button
                        class="buy-request-btn"
                        id="openRequestModal"
                    >

                        Send Buy Request

                    </button>


                    <a
                        href="tel:${selectedCow.phone}"
                        class="call-seller-btn"
                    >

                        Call Seller

                    </a>


                </div>


            </div>


        </div>

    `;


    // Modal Button

    document
        .getElementById(
            "openRequestModal"
        )
        .addEventListener(

            "click",

            () => {

                document
                    .getElementById(
                        "requestModal"
                    )
                    .classList
                    .add(
                        "show"
                    );

            }

        );

}


// ===============================
// SIMILAR COWS
// ===============================

function displaySimilarCows() {

    const container =

        document.getElementById(
            "similarCowGrid"
        );


    const similarCows =

        allCows

        .filter(

            cow =>

                cow.id !==
                selectedCow.id

        )

        .slice(0, 3);


    if (similarCows.length === 0) {

        container.innerHTML =

            "<p>No similar cows available.</p>";

        return;

    }


    container.innerHTML = "";


    similarCows.forEach(

        cow => {

            const card =

                document.createElement(
                    "div"
                );


            card.className =
                "similar-card";


            card.innerHTML = `

                <img
                    src="${cow.image}"
                    alt="${cow.name}"
                >


                <div class="similar-card-content">


                    <h3>

                        ${cow.name}

                    </h3>


                    <p>

                        ${cow.breed}

                    </p>


                    <div class="similar-price">

                        ৳ ${Number(
                            cow.price
                        ).toLocaleString()}

                    </div>


                    <button
                        class="similar-btn"
                        onclick="openSimilarCow('${cow.id}')"
                    >

                        View Details

                    </button>


                </div>

            `;


            container.appendChild(
                card
            );

        }

    );

}


// ===============================
// OPEN SIMILAR COW
// ===============================

function openSimilarCow(id) {

    const cow =

        allCows.find(

            item =>
                item.id === id

        );


    localStorage.setItem(

        "selectedCow",

        JSON.stringify(
            cow
        )

    );


    location.reload();

}


// ===============================
// MODAL
// ===============================

const requestModal =

    document.getElementById(
        "requestModal"
    );


const closeModal =

    document.getElementById(
        "closeModal"
    );


closeModal.addEventListener(

    "click",

    () => {

        requestModal
            .classList
            .remove(
                "show"
            );

    }

);


// বাইরে click করলে বন্ধ হবে

requestModal.addEventListener(

    "click",

    function (event) {

        if (
            event.target ===
            requestModal
        ) {

            requestModal
                .classList
                .remove(
                    "show"
                );

        }

    }

);


// ===============================
// BUY REQUEST SUBMIT
// ===============================

const buyRequestForm =
    document.getElementById(
        "buyRequestForm"
    );


buyRequestForm.addEventListener(

    "submit",

    function (event) {

        event.preventDefault();


        // ===============================
        // GET EXISTING REQUESTS
        // ===============================

        let requests =
            JSON.parse(
                localStorage.getItem(
                    "hambaBuyRequests"
                )
            ) || [];


        // ===============================
        // CREATE NEW REQUEST
        // ===============================

        const request = {

            requestId:
                "REQ-" +
                Date.now(),


            cowId:
                selectedCow.id,


            cowName:
                selectedCow.name,


            cowPrice:
                selectedCow.price,


            sellerPhone:
                selectedCow.phone || "",


            buyerName:
                document
                    .getElementById(
                        "buyerName"
                    )
                    .value
                    .trim(),


            buyerPhone:
                document
                    .getElementById(
                        "buyerPhone"
                    )
                    .value
                    .trim(),


            buyerLocation:
                document
                    .getElementById(
                        "buyerLocation"
                    )
                    .value
                    .trim(),


            message:
                document
                    .getElementById(
                        "buyerMessage"
                    )
                    .value
                    .trim(),


            status:
                "Pending",


            requestDate:
                new Date()
                    .toLocaleString()

        };


        // ===============================
        // ADD NEW REQUEST
        // ===============================

        requests.push(
            request
        );


        // ===============================
        // SAVE TO LOCAL STORAGE
        // ===============================

        localStorage.setItem(

            "hambaBuyRequests",

            JSON.stringify(
                requests
            )

        );


        // ===============================
        // CHECK SAVE
        // ===============================

        console.log(
            "HAMBA BUY REQUEST SAVED:",
            request
        );


        console.log(
            "ALL REQUESTS:",
            requests
        );


        // ===============================
        // SUCCESS MESSAGE
        // ===============================

        alert(
            "Buy Request Sent Successfully!"
        );


        // Reset form

        buyRequestForm.reset();


        // Close modal

        requestModal
            .classList
            .remove(
                "show"
            );


        // ===============================
        // REDIRECT TO DASHBOARD
        // ===============================

        window.location.href =
            "requests-dashboard.html";

    }

);

// ===============================
// INITIAL LOAD
// ===============================

displayCowDetails();

displaySimilarCows();
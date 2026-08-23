// ===================================
// HAMBA - LIVE COWS MARKET
// ===================================


// ===============================
// DEMO COW DATA
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

        image:
            "https://images.unsplash.com/photo-1546445317-29f4545e9d53",

        status:
            "Available"
    },

    {
        id: "DEMO-2",

        name: "Sahiwal Cow",

        breed: "Sahiwal",

        age: 4,

        weight: 420,

        price: 350000,

        location: "Gazipur, Dhaka",

        image:
            "https://images.unsplash.com/photo-1596733430284-f7437764b1a9",

        status:
            "Available"
    },

    {
        id: "DEMO-3",

        name: "Red Chittagong Cow",

        breed: "RCC",

        age: 3,

        weight: 300,

        price: 250000,

        location: "Chattogram",

        image:
            "https://images.unsplash.com/photo-1570042225831-d98fa7577b8e",

        status:
            "Available"
    },

    {
        id: "DEMO-4",

        name: "Holstein Cow",

        breed: "Holstein",

        age: 5,

        weight: 500,

        price: 450000,

        location: "Narayanganj",

        image:
            "https://images.unsplash.com/photo-1516467508483-a7212febe31a",

        status:
            "Available"
    }

];


// ===============================
// GET SELLER COWS
// ===============================

let sellerCows =
    JSON.parse(

        localStorage.getItem(
            "hambaLiveCows"
        )

    )
    || [];


// ===============================
// COMBINE ALL COWS
// ===============================

let allCows = [

    ...sellerCows,

    ...demoCows

];
allCows = allCows.filter(
    cow => cow.status === "Available"
);

// ===============================
// DOM ELEMENTS
// ===============================

const cowGrid =
    document.getElementById(
        "cowGrid"
    );


const searchInput =
    document.getElementById(
        "searchInput"
    );


const breedFilter =
    document.getElementById(
        "breedFilter"
    );


const priceFilter =
    document.getElementById(
        "priceFilter"
    );


const cowCount =
    document.getElementById(
        "cowCount"
    );


const emptyMessage =
    document.getElementById(
        "emptyMessage"
    );


// ===============================
// CREATE BREED FILTER
// ===============================

function loadBreeds() {

    const breeds = [

        ...new Set(

            allCows.map(
                cow => cow.breed
            )

        )

    ];


    breeds.forEach(
        breed => {

            const option =
                document.createElement(
                    "option"
                );


            option.value =
                breed.toLowerCase();


            option.textContent =
                breed;


            breedFilter.appendChild(
                option
            );

        }

    );

}


// ===============================
// DISPLAY COWS
// ===============================

function displayCows(cows) {

    cowGrid.innerHTML = "";


    cowCount.textContent =

        `${cows.length} Cows Found`;



    if (cows.length === 0) {

        emptyMessage.style.display =
            "block";

        return;

    }


    emptyMessage.style.display =
        "none";


    cows.forEach(
        cow => {

            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "cow-card";


            card.innerHTML = `

                <div class="cow-image">

                    <img
                        src="${cow.image}"
                        alt="${cow.name}"
                    >

                    <span class="cow-status">

                        ${cow.status}

                    </span>

                </div>


                <div class="cow-content">

                    <h3>

                        ${cow.name}

                    </h3>


                    <p class="cow-breed">

                        ${cow.breed}

                    </p>


                    <div class="cow-details">


                        <div class="detail">

                            Age:
                            ${cow.age} Years

                        </div>


                        <div class="detail">

                            Weight:
                            ${cow.weight} KG

                        </div>


                    </div>


                    <p class="cow-location">

                        📍 ${cow.location}

                    </p>


                    <div class="cow-price">

                        ৳ ${Number(
                            cow.price
                        ).toLocaleString()}

                    </div>


                    <button
                        class="view-details-btn"
                        onclick="viewCowDetails('${cow.id}')"
                    >

                        View Details

                    </button>


                </div>

            `;


            cowGrid.appendChild(
                card
            );

        }

    );

}


// ===============================
// FILTER COWS
// ===============================

function filterCows() {

    const searchText =

        searchInput.value
        .toLowerCase()
        .trim();


    const selectedBreed =

        breedFilter.value;


    const selectedPrice =

        priceFilter.value;



    let filteredCows =

        allCows.filter(
            cow => {


                const matchesSearch =

                    cow.name
                    .toLowerCase()
                    .includes(
                        searchText
                    )

                    ||

                    cow.breed
                    .toLowerCase()
                    .includes(
                        searchText
                    )

                    ||

                    cow.location
                    .toLowerCase()
                    .includes(
                        searchText
                    );



                const matchesBreed =

                    selectedBreed ===
                    "all"

                    ||

                    cow.breed
                    .toLowerCase()

                    ===

                    selectedBreed;



                return

                    matchesSearch

                    &&

                    matchesBreed;

            }

        );



    // ===============================
    // PRICE SORT
    // ===============================

    if (
        selectedPrice ===
        "low"
    ) {

        filteredCows.sort(
            (a, b) =>
                a.price -
                b.price
        );

    }


    if (
        selectedPrice ===
        "high"
    ) {

        filteredCows.sort(
            (a, b) =>
                b.price -
                a.price
        );

    }



    displayCows(
        filteredCows
    );

}


// ===============================
// EVENT LISTENERS
// ===============================

searchInput.addEventListener(

    "input",

    filterCows

);


breedFilter.addEventListener(

    "change",

    filterCows

);


priceFilter.addEventListener(

    "change",

    filterCows

);


// ===============================
// VIEW DETAILS
// ===============================

function viewCowDetails(id) {

    const selectedCow =

        allCows.find(
            cow =>
                cow.id === id
        );


    if (!selectedCow) {

        alert(
            "Cow information not found!"
        );

        return;

    }


    // LocalStorage এ temporarily save

    localStorage.setItem(

        "selectedCow",

        JSON.stringify(
            selectedCow
        )

    );


    // Detail Page

    window.location.href =
        "cow-details.html";

}


// ===============================
// INITIAL LOAD
// ===============================

loadBreeds();

displayCows(
    allCows
);
// ===============================
// HAMBA QURBANI SHARE DATA
// ===============================

let userLocation = null;
let selectedGroup = null;


// Demo Qurbani Groups

let qurbaniGroups = [

    {
        id: 1,

        cowName: "Premium Deshi Cow",

        image:
            "../assets/images/cow-1.jpg",

        weight: "380 KG",

        totalPrice: 210000,

        totalMembers: 7,

        joinedMembers: 4,

        location: {
            lat: 23.8103,
            lng: 90.4125
        }

    },


    {
        id: 2,

        cowName: "Australian Brahman",

        image:
            "../assets/images/cow-2.jpg",

        weight: "450 KG",

        totalPrice: 280000,

        totalMembers: 5,

        joinedMembers: 2,

        location: {
            lat: 23.8200,
            lng: 90.4250
        }

    },


    {
        id: 3,

        cowName: "Local Farm Cow",

        image:
            "../assets/images/cow-3.jpg",

        weight: "320 KG",

        totalPrice: 175000,

        totalMembers: 3,

        joinedMembers: 1,

        location: {
            lat: 23.8050,
            lng: 90.4000
        }

    }

];


// ===============================
// DOM
// ===============================

const qurbaniGrid =
    document.getElementById("qurbaniGrid");

const getLocationBtn =
    document.getElementById("getLocationBtn");

const locationStatus =
    document.getElementById("locationStatus");

const joinModal =
    document.getElementById("joinModal");

const closeModal =
    document.getElementById("closeModal");

const selectedGroupInfo =
    document.getElementById(
        "selectedGroupInfo"
    );

const joinForm =
    document.getElementById("joinForm");

const distanceStatus =
    document.getElementById(
        "distanceStatus"
    );

const successModal =
    document.getElementById(
        "successModal"
    );

const successMessage =
    document.getElementById(
        "successMessage"
    );

const successCloseBtn =
    document.getElementById(
        "successCloseBtn"
    );


// ===============================
// RENDER GROUPS
// ===============================

function renderGroups() {

    qurbaniGrid.innerHTML = "";


    qurbaniGroups.forEach(group => {

        const remainingMembers =
            group.totalMembers -
            group.joinedMembers;


        const sharePrice =
            group.totalPrice /
            group.totalMembers;


        const progress =
            (group.joinedMembers /
                group.totalMembers) * 100;


        const card =
            document.createElement("div");

        card.className =
            "qurbani-card";


        card.innerHTML = `

            <img
                src="${group.image}"
                alt="${group.cowName}"
            >


            <div class="qurbani-content">


                <div class="qurbani-top">

                    <h3>
                        ${group.cowName}
                    </h3>

                    <span class="status-badge">
                        ${remainingMembers} Slots Left
                    </span>

                </div>


                <div class="qurbani-details">


                    <div class="detail-item">

                        <span>
                            Weight
                        </span>

                        <strong>
                            ${group.weight}
                        </strong>

                    </div>


                    <div class="detail-item">

                        <span>
                            Share Plan
                        </span>

                        <strong>
                            ${group.totalMembers} People
                        </strong>

                    </div>


                    <div class="detail-item">

                        <span>
                            Price Per Share
                        </span>

                        <strong>
                            ৳${sharePrice.toFixed(0)}
                        </strong>

                    </div>


                    <div class="detail-item">

                        <span>
                            Total Price
                        </span>

                        <strong>
                            ৳${group.totalPrice}
                        </strong>

                    </div>


                </div>


                <div class="member-progress">

                    <span>

                        ${group.joinedMembers}
                        /
                        ${group.totalMembers}
                        Members Joined

                    </span>


                    <div class="progress-bar">

                        <div
                            class="progress"
                            style="width:${progress}%"
                        ></div>

                    </div>

                </div>


                <button
                    class="join-group-btn"
                    data-id="${group.id}"
                >

                    Join This Group

                </button>


            </div>

        `;


        qurbaniGrid.appendChild(
            card
        );

    });

}


// ===============================
// GET USER LOCATION
// ===============================

getLocationBtn.addEventListener(
    "click",
    () => {

        if (
            !navigator.geolocation
        ) {

            locationStatus.textContent =
                "Geolocation is not supported by your browser.";

            return;

        }


        locationStatus.textContent =
            "Getting your location...";


        navigator.geolocation.getCurrentPosition(

            position => {

                userLocation = {

                    lat:
                        position.coords.latitude,

                    lng:
                        position.coords.longitude

                };


                locationStatus.textContent =
                    "Location verified successfully ✓";


                getLocationBtn.textContent =
                    "Location Verified";


                getLocationBtn.disabled =
                    true;

            },


            error => {

                locationStatus.textContent =
                    "Location permission denied.";

            }

        );

    }
);


// ===============================
// DISTANCE CALCULATION
// HAVERSINE FORMULA
// ===============================

function calculateDistance(
    lat1,
    lon1,
    lat2,
    lon2
) {

    const R = 6371;


    const dLat =
        (lat2 - lat1) *
        Math.PI / 180;


    const dLon =
        (lon2 - lon1) *
        Math.PI / 180;


    const a =

        Math.sin(dLat / 2) *
        Math.sin(dLat / 2)

        +

        Math.cos(
            lat1 *
            Math.PI / 180
        )

        *

        Math.cos(
            lat2 *
            Math.PI / 180
        )

        *

        Math.sin(dLon / 2)

        *

        Math.sin(dLon / 2);


    const c =
        2 *
        Math.atan2(
            Math.sqrt(a),
            Math.sqrt(1 - a)
        );


    return R * c;

}


// ===============================
// JOIN GROUP BUTTON
// ===============================

document.addEventListener(
    "click",
    event => {

        if (
            event.target.classList.contains(
                "join-group-btn"
            )
        ) {

            const groupId =
                Number(
                    event.target.dataset.id
                );


            selectedGroup =
                qurbaniGroups.find(
                    group =>
                        group.id === groupId
                );


            if (!userLocation) {

                alert(
                    "Please verify your location first!"
                );

                return;

            }


            const distance =
                calculateDistance(

                    userLocation.lat,
                    userLocation.lng,

                    selectedGroup.location.lat,
                    selectedGroup.location.lng

                );


            if (distance > 5) {

                alert(
                    `You are ${distance.toFixed(2)}
                    KM away from this group.
                    Maximum allowed distance is 5 KM.`
                );

                return;

            }


            openJoinModal(
                selectedGroup,
                distance
            );

        }

    }
);


// ===============================
// OPEN JOIN MODAL
// ===============================

function openJoinModal(
    group,
    distance
) {

    const sharePrice =
        group.totalPrice /
        group.totalMembers;


    selectedGroupInfo.innerHTML = `

        <div class="selected-group">

            <h3>
                ${group.cowName}
            </h3>

            <p>
                Share Plan:
                ${group.totalMembers} People
            </p>

            <p>
                Your Share:
                ৳${sharePrice.toFixed(0)}
            </p>

        </div>

    `;


    distanceStatus.textContent =
        `✓ You are only
        ${distance.toFixed(2)}
        KM away from this group.`;


    joinModal.classList.add(
        "show"
    );

}


// ===============================
// CLOSE MODAL
// ===============================

closeModal.addEventListener(
    "click",
    () => {

        joinModal.classList.remove(
            "show"
        );

    }
);


// ===============================
// JOIN FORM
// ===============================

joinForm.addEventListener(
    "submit",
    event => {

        event.preventDefault();


        const memberName =
            document.getElementById(
                "memberName"
            ).value;


        const memberPhone =
            document.getElementById(
                "memberPhone"
            ).value;


        if (
            selectedGroup.joinedMembers >=
            selectedGroup.totalMembers
        ) {

            alert(
                "This group is already full!"
            );

            return;

        }


        // TEMPORARY MEMBER SAVE

        const member = {

            name: memberName,

            phone: memberPhone,

            groupId:
                selectedGroup.id,

            joinedDate:
                new Date().toLocaleString()

        };


        let qurbaniMembers = JSON.parse(
            localStorage.getItem(
                "hambaQurbaniMembers"
            )
        ) || [];


        qurbaniMembers.push(
            member
        );


        localStorage.setItem(

            "hambaQurbaniMembers",

            JSON.stringify(
                qurbaniMembers
            )

        );


        // UPDATE GROUP MEMBER

        selectedGroup.joinedMembers++;


        // SAVE UPDATED GROUP

        localStorage.setItem(

            "hambaQurbaniGroups",

            JSON.stringify(
                qurbaniGroups
            )

        );


        // CLOSE JOIN MODAL

        joinModal.classList.remove(
            "show"
        );


        // UPDATE UI

        renderGroups();


        // SHOW SUCCESS

        successMessage.textContent =

            `Congratulations ${memberName}!
            You have successfully joined
            the ${selectedGroup.cowName}
            Qurbani group.`;


        successModal.classList.add(
            "show"
        );


        joinForm.reset();

    }
);


// ===============================
// CLOSE SUCCESS
// ===============================

successCloseBtn.addEventListener(
    "click",
    () => {

        successModal.classList.remove(
            "show"
        );

    }
);


// ===============================
// INITIAL LOAD
// ===============================

const savedGroups =
    JSON.parse(
        localStorage.getItem(
            "hambaQurbaniGroups"
        )
    );


if (savedGroups) {

    qurbaniGroups =
        savedGroups;

}


renderGroups();
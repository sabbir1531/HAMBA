// ===================================
// HAMBA - REQUESTS DASHBOARD
// ===================================


// ===============================
// GET DATA
// ===============================

function getRequests() {

    return JSON.parse(
        localStorage.getItem(
            "hambaBuyRequests"
        )
    ) || [];

}


function getCows() {

    return JSON.parse(
        localStorage.getItem(
            "hambaLiveCows"
        )
    ) || [];

}


// ===============================
// SAVE DATA
// ===============================

function saveRequests(requests) {

    localStorage.setItem(
        "hambaBuyRequests",
        JSON.stringify(requests)
    );

}


function saveCows(cows) {

    localStorage.setItem(
        "hambaLiveCows",
        JSON.stringify(cows)
    );

}


// ===============================
// GET MY COW IDS
// ===============================

function getMyCowIds() {

    const cows = getCows();

    return cows.map(
        cow => cow.id
    );

}


// ===============================
// DISPLAY BUYER REQUESTS
// ===============================

function displayBuyerRequests() {

    const grid =
        document.getElementById(
            "buyerRequestGrid"
        );

    const empty =
        document.getElementById(
            "buyerEmpty"
        );


    const requests =
        getRequests();


    // বর্তমানে সব request buyer side-এ দেখানো হচ্ছে।
    // পরে Login/User System হলে শুধু logged-in user-এর request দেখাবো।

    if (requests.length === 0) {

        grid.innerHTML = "";

        empty.style.display =
            "block";

        return;

    }


    empty.style.display =
        "none";


    grid.innerHTML = "";


    requests.forEach(
        request => {

            const card =
                document.createElement(
                    "div"
                );

            card.className =
                "request-card";


            card.innerHTML = `

                <div class="request-card-top">

                    <div>

                        <span class="request-id">

                            ${request.requestId}

                        </span>

                        <h3>

                            ${request.cowName}

                        </h3>

                    </div>


                    <span
                        class="request-status ${request.status.toLowerCase()}"
                    >

                        ${request.status}

                    </span>

                </div>


                <div class="request-details">

                    <p>

                        <strong>
                            Price:
                        </strong>

                        ৳ ${Number(
                            request.cowPrice
                        ).toLocaleString()}

                    </p>


                    <p>

                        <strong>
                            Seller Phone:
                        </strong>

                        ${request.sellerPhone || "N/A"}

                    </p>


                    <p>

                        <strong>
                            Request Date:
                        </strong>

                        ${request.requestDate}

                    </p>

                </div>


                <div class="request-message">

                    <strong>
                        Your Message:
                    </strong>

                    <p>

                        ${request.message || "No message"}

                    </p>

                </div>


                <div class="buyer-status-message">

                    ${getBuyerStatusMessage(request.status)}

                </div>

            `;


            grid.appendChild(
                card
            );

        }
    );

}


// ===============================
// BUYER STATUS MESSAGE
// ===============================

function getBuyerStatusMessage(status) {

    if (status === "Pending") {

        return `
            ⏳ Waiting for seller response.
        `;

    }


    if (status === "Accepted") {

        return `
            ✅ Your request has been accepted!
            Please contact the seller.
        `;

    }


    if (status === "Rejected") {

        return `
            ❌ Your request was not accepted.
        `;

    }


    return "";

}


// ===============================
// DISPLAY SELLER REQUESTS
// ===============================

function displaySellerRequests() {

    const grid =
        document.getElementById(
            "sellerRequestGrid"
        );

    const empty =
        document.getElementById(
            "sellerEmpty"
        );


    const requests =
        getRequests();


    const myCowIds =
        getMyCowIds();


    // শুধু আমার cows-এর request

    const sellerRequests =
        requests.filter(

            request =>

                myCowIds.includes(
                    request.cowId
                )

        );


    if (
        sellerRequests.length === 0
    ) {

        grid.innerHTML = "";

        empty.style.display =
            "block";

        return;

    }


    empty.style.display =
        "none";


    grid.innerHTML = "";


    sellerRequests.forEach(
        request => {

            const card =
                document.createElement(
                    "div"
                );

            card.className =
                "request-card";


            card.innerHTML = `

                <div class="request-card-top">

                    <div>

                        <span class="request-id">

                            ${request.requestId}

                        </span>

                        <h3>

                            ${request.cowName}

                        </h3>

                    </div>


                    <span
                        class="request-status ${request.status.toLowerCase()}"
                    >

                        ${request.status}

                    </span>

                </div>


                <div class="request-details">

                    <p>

                        <strong>
                            Cow Price:
                        </strong>

                        ৳ ${Number(
                            request.cowPrice
                        ).toLocaleString()}

                    </p>


                    <p>

                        <strong>
                            Buyer:
                        </strong>

                        ${request.buyerName}

                    </p>


                    <p>

                        <strong>
                            Phone:
                        </strong>

                        ${request.buyerPhone}

                    </p>


                    <p>

                        <strong>
                            Location:
                        </strong>

                        ${request.buyerLocation}

                    </p>


                    <p>

                        <strong>
                            Date:
                        </strong>

                        ${request.requestDate}

                    </p>

                </div>


                <div class="request-message">

                    <strong>
                        Buyer Message:
                    </strong>

                    <p>

                        ${request.message || "No message"}

                    </p>

                </div>


                ${

                    request.status === "Pending"

                    ?

                    `

                        <div class="request-actions">

                            <button
                                class="accept-btn"
                                onclick="acceptRequest('${request.requestId}')"
                            >

                                ✓ Accept

                            </button>


                            <button
                                class="reject-btn"
                                onclick="rejectRequest('${request.requestId}')"
                            >

                                ✕ Reject

                            </button>

                        </div>

                    `

                    :

                    `

                        <div class="request-completed">

                            This request is
                            <strong>
                                ${request.status}
                            </strong>

                        </div>

                    `

                }

            `;


            grid.appendChild(
                card
            );

        }
    );

}


// ===============================
// ACCEPT REQUEST
// ===============================

function acceptRequest(requestId) {

    let requests =
        getRequests();


    const selectedRequest =
        requests.find(
            request =>
                request.requestId ===
                requestId
        );


    if (!selectedRequest) {

        alert(
            "Request not found!"
        );

        return;

    }


    const confirmed =
        confirm(
            `Accept request for ${selectedRequest.cowName}?`
        );


    if (!confirmed) {

        return;

    }


    // একই cow-এর অন্য pending request reject

    requests =
        requests.map(
            request => {

                if (
                    request.requestId ===
                    requestId
                ) {

                    return {
                        ...request,
                        status: "Accepted"
                    };

                }


                if (
                    request.cowId ===
                    selectedRequest.cowId &&
                    request.status ===
                    "Pending"
                ) {

                    return {
                        ...request,
                        status: "Rejected"
                    };

                }


                return request;

            }
        );


    saveRequests(
        requests
    );


    // ===============================
    // UPDATE COW STATUS
    // ===============================

    let cows =
        getCows();


    cows =
        cows.map(
            cow => {

                if (
                    cow.id ===
                    selectedRequest.cowId
                ) {

                    return {
                        ...cow,
                        status: "Sold"
                    };

                }


                return cow;

            }
        );


    saveCows(
        cows
    );


    alert(
        "Request accepted successfully!"
    );


    refreshDashboard();

}


// ===============================
// REJECT REQUEST
// ===============================

function rejectRequest(requestId) {

    let requests =
        getRequests();


    const selectedRequest =
        requests.find(
            request =>
                request.requestId ===
                requestId
        );


    if (!selectedRequest) {

        return;

    }


    const confirmed =
        confirm(
            "Reject this request?"
        );


    if (!confirmed) {

        return;

    }


    requests =
        requests.map(
            request => {

                if (
                    request.requestId ===
                    requestId
                ) {

                    return {
                        ...request,
                        status: "Rejected"
                    };

                }


                return request;

            }
        );


    saveRequests(
        requests
    );


    alert(
        "Request rejected."
    );


    refreshDashboard();

}


// ===============================
// TAB SYSTEM
// ===============================

function initializeTabs() {

    const tabs =
        document.querySelectorAll(
            ".dashboard-tab"
        );


    const tabContents =
        document.querySelectorAll(
            ".tab-content"
        );


    tabs.forEach(
        tab => {

            tab.addEventListener(
                "click",
                function () {

                    const target =
                        this.dataset.tab;


                    tabs.forEach(
                        item =>
                            item.classList.remove(
                                "active"
                            )
                    );


                    tabContents.forEach(
                        content =>
                            content.classList.remove(
                                "active"
                            )
                    );


                    this.classList.add(
                        "active"
                    );


                    if (
                        target === "buyer"
                    ) {

                        document
                            .getElementById(
                                "buyerTab"
                            )
                            .classList
                            .add(
                                "active"
                            );

                    }


                    if (
                        target === "seller"
                    ) {

                        document
                            .getElementById(
                                "sellerTab"
                            )
                            .classList
                            .add(
                                "active"
                            );

                    }

                }
            );

        }
    );

}


// ===============================
// REFRESH DASHBOARD
// ===============================

function refreshDashboard() {

    displayBuyerRequests();

    displaySellerRequests();

}


// ===============================
// INITIAL LOAD
// ===============================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        initializeTabs();

        refreshDashboard();

    }
);
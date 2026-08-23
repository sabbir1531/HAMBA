// ===================================
// HAMBA - COMMON AUTH SYSTEM
// ===================================


// ===============================
// CHECK CURRENT PAGE LOCATION
// ===============================

function isInsidePagesFolder() {

    return window.location.pathname.includes(
        "/pages/"
    );

}


// ===============================
// GET CORRECT PATH
// ===============================

function getPagePath(pageName) {

    if (
        isInsidePagesFolder()
    ) {

        return pageName;

    }


    return "pages/" + pageName;

}


// ===============================
// GET HOME PATH
// ===============================

function getHomePath() {

    if (
        isInsidePagesFolder()
    ) {

        return "../index.html";

    }


    return "index.html";

}


// ===============================
// GET CURRENT USER
// ===============================

function getCurrentUser() {

    try {

        return JSON.parse(

            localStorage.getItem(
                "hambaCurrentUser"
            )

        );

    }

    catch (error) {

        return null;

    }

}


// ===============================
// CHECK LOGIN
// ===============================

function isLoggedIn() {

    const currentUser =
        getCurrentUser();


    return currentUser !== null;

}


// ===============================
// REQUIRE LOGIN
// ===============================

function requireLogin() {

    if (
        !isLoggedIn()
    ) {

        alert(
            "Please login first."
        );


        window.location.href =
            getPagePath(
                "login.html"
            );


        return false;

    }


    return true;

}


// ===============================
// LOGOUT
// ===============================

function logoutUser() {

    localStorage.removeItem(
        "hambaCurrentUser"
    );


    window.location.href =
        getHomePath();

}


// ===============================
// UPDATE NAVBAR
// ===============================

function updateNavbar() {

    const navActions =
        document.querySelector(
            ".nav-actions"
        );


    if (
        !navActions
    ) {

        return;

    }


    const currentUser =
        getCurrentUser();


    // ===============================
    // LOGGED IN USER
    // ===============================

    if (
        currentUser
    ) {

        navActions.innerHTML = `

            <span class="user-name">

                👤 ${currentUser.name}

            </span>


            <button
                class="logout-btn"
                id="logoutBtn"
                type="button"
            >

                Logout

            </button>

        `;


        const logoutBtn =
            document.getElementById(
                "logoutBtn"
            );


        if (
            logoutBtn
        ) {

            logoutBtn.addEventListener(

                "click",

                function () {

                    logoutUser();

                }

            );

        }

    }


    // ===============================
    // LOGGED OUT USER
    // ===============================

    else {

        const loginPath =
            getPagePath(
                "login.html"
            );


        const signupPath =
            getPagePath(
                "signup.html"
            );


        navActions.innerHTML = `

            <a
                href="${loginPath}"
                class="login-btn"
            >

                Login

            </a>


            <a
                href="${signupPath}"
                class="signup-btn"
            >

                Sign Up

            </a>

        `;

    }

}


// ===============================
// INITIAL LOAD
// ===============================

document.addEventListener(

    "DOMContentLoaded",

    function () {

        updateNavbar();

    }

);
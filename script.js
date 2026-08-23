const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");

menuToggle.addEventListener("click", () => {

    mobileMenu.classList.toggle("open");

    if (mobileMenu.classList.contains("open")) {
        menuToggle.textContent = "✕";
    } else {
        menuToggle.textContent = "☰";
    }

});


const mobileLinks = document.querySelectorAll(".mobile-menu a");

mobileLinks.forEach(link => {

    link.addEventListener("click", () => {

        mobileMenu.classList.remove("open");

        menuToggle.textContent = "☰";

    });

});
// ===================================
// HAMBA - DYNAMIC LOGIN NAVBAR
// ===================================


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
// UPDATE NAVBAR
// ===============================

function updateNavbar() {

    const currentUser =
        getCurrentUser();


    const navActions =
        document.querySelector(
            ".nav-actions"
        );


    if (
        !navActions
    ) {

        return;

    }


    // ===============================
    // USER LOGGED IN
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
            >

                Logout

            </button>

        `;


        // ===============================
        // LOGOUT
        // ===============================

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

                    localStorage.removeItem(
                        "hambaCurrentUser"
                    );


                    window.location.href =
                        "index.html";

                }

            );

        }

    }


    // ===============================
    // USER NOT LOGGED IN
    // ===============================

    else {

        navActions.innerHTML = `

            <a
                href="pages/login.html"
                class="login-btn"
            >

                Login

            </a>


            <a
                href="pages/signup.html"
                class="signup-btn"
            >

                Sign Up

            </a>

        `;

    }

}


// ===============================
// LOAD NAVBAR
// ===============================

document.addEventListener(

    "DOMContentLoaded",

    function () {

        updateNavbar();

    }

);
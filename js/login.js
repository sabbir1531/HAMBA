// =================================
// HAMBA - LOGIN SYSTEM
// =================================


// ===============================
// FORM ELEMENTS
// ===============================

const loginForm =
    document.getElementById(
        "loginForm"
    );


// ===============================
// GET USERS
// ===============================

function getUsers() {

    try {

        const users = JSON.parse(

            localStorage.getItem(
                "hambaUsers"
            )

        );

        return users || [];

    }

    catch (error) {

        console.error(
            "Error reading users:",
            error
        );

        return [];

    }

}


// ===============================
// LOGIN SUBMIT
// ===============================

loginForm.addEventListener(

    "submit",

    function (event) {

        event.preventDefault();


        // ===============================
        // GET EMAIL
        // ===============================

        const email =

            document
                .getElementById(
                    "loginEmail"
                )
                .value
                .trim()
                .toLowerCase();


        // ===============================
        // GET PASSWORD
        // ===============================

        const password =

            document
                .getElementById(
                    "loginPassword"
                )
                .value;


        // ===============================
        // GET REMEMBER ME
        // ===============================

        const rememberMe =

            document
                .getElementById(
                    "rememberMe"
                )
                .checked;


        // ===============================
        // VALIDATION
        // ===============================

        if (
            email === ""
        ) {

            alert(
                "Please enter your email."
            );

            return;

        }


        if (
            password === ""
        ) {

            alert(
                "Please enter your password."
            );

            return;

        }


        // ===============================
        // GET ALL USERS
        // ===============================

        const users =
            getUsers();


        // ===============================
        // CHECK USERS
        // ===============================

        if (
            users.length === 0
        ) {

            alert(
                "No account found. Please create an account first."
            );

            return;

        }


        // ===============================
        // FIND USER
        // ===============================

        const user =

            users.find(

                function (item) {

                    return (

                        item.email === email

                        &&

                        item.password === password

                    );

                }

            );


        // ===============================
        // LOGIN FAILED
        // ===============================

        if (
            !user
        ) {

            alert(
                "Invalid email or password!"
            );

            return;

        }


        // ===============================
        // CREATE CURRENT USER
        // ===============================

        const currentUser = {

            userId:
                user.userId,

            name:
                user.name,

            email:
                user.email,

            phone:
                user.phone,

            loginTime:
                new Date()
                    .toLocaleString()

        };


        // ===============================
        // SAVE LOGIN SESSION
        // ===============================

        localStorage.setItem(

            "hambaCurrentUser",

            JSON.stringify(
                currentUser
            )

        );


        // ===============================
        // REMEMBER ME
        // ===============================

        if (
            rememberMe
        ) {

            localStorage.setItem(

                "hambaRememberUser",

                email

            );

        }

        else {

            localStorage.removeItem(
                "hambaRememberUser"
            );

        }


        // ===============================
        // LOGIN SUCCESS
        // ===============================

        alert(
            "Login successful! Welcome " +
            user.name
        );


        // ===============================
        // REDIRECT TO HOME
        // ===============================

        window.location.href =
            "../index.html";

    }

);


// ===============================
// AUTO FILL REMEMBERED EMAIL
// ===============================

document.addEventListener(

    "DOMContentLoaded",

    function () {

        const rememberedEmail =

            localStorage.getItem(
                "hambaRememberUser"
            );


        if (
            rememberedEmail
        ) {

            document
                .getElementById(
                    "loginEmail"
                )
                .value =
                rememberedEmail;


            document
                .getElementById(
                    "rememberMe"
                )
                .checked =
                true;

        }

    }

);
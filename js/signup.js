// ===================================
// HAMBA - SIGNUP SYSTEM
// ===================================


// ===============================
// FORM ELEMENTS
// ===============================

const signupForm =
    document.getElementById(
        "signupForm"
    );


const signupMessage =
    document.getElementById(
        "signupMessage"
    );


// ===============================
// SHOW MESSAGE
// ===============================

function showSignupMessage(
    message,
    type
) {

    signupMessage.textContent =
        message;


    signupMessage.className =
        "form-message " + type;

}


// ===============================
// GET USERS
// ===============================

function getUsers() {

    try {

        const users =

            JSON.parse(

                localStorage.getItem(
                    "hambaUsers"
                )

            );


        return users || [];

    }

    catch (error) {

        return [];

    }

}


// ===============================
// SAVE USERS
// ===============================

function saveUsers(
    users
) {

    localStorage.setItem(

        "hambaUsers",

        JSON.stringify(
            users
        )

    );

}


// ===============================
// SIGNUP SUBMIT
// ===============================

signupForm.addEventListener(

    "submit",

    function (event) {

        event.preventDefault();


        // ===============================
        // GET INPUT VALUES
        // ===============================

        const name =

            document
                .getElementById(
                    "signupName"
                )
                .value
                .trim();


        const email =

            document
                .getElementById(
                    "signupEmail"
                )
                .value
                .trim()
                .toLowerCase();


        const phone =

            document
                .getElementById(
                    "signupPhone"
                )
                .value
                .trim();


        const password =

            document
                .getElementById(
                    "signupPassword"
                )
                .value;


        const confirmPassword =

            document
                .getElementById(
                    "confirmPassword"
                )
                .value;


        // ===============================
        // VALIDATION
        // ===============================

        if (

            !name ||

            !email ||

            !phone ||

            !password ||

            !confirmPassword

        ) {

            showSignupMessage(

                "Please fill in all fields.",

                "error"

            );

            return;

        }


        // ===============================
        // PHONE VALIDATION
        // ===============================

        const phonePattern =

            /^01[3-9]\d{8}$/;


        if (

            !phonePattern.test(
                phone
            )

        ) {

            showSignupMessage(

                "Please enter a valid Bangladeshi phone number.",

                "error"

            );

            return;

        }


        // ===============================
        // PASSWORD LENGTH
        // ===============================

        if (

            password.length < 6

        ) {

            showSignupMessage(

                "Password must be at least 6 characters.",

                "error"

            );

            return;

        }


        // ===============================
        // PASSWORD MATCH
        // ===============================

        if (

            password !==
            confirmPassword

        ) {

            showSignupMessage(

                "Passwords do not match.",

                "error"

            );

            return;

        }


        // ===============================
        // GET EXISTING USERS
        // ===============================

        const users =
            getUsers();


        // ===============================
        // CHECK EMAIL
        // ===============================

        const emailExists =

            users.some(

                function (user) {

                    return (

                        user.email ===
                        email

                    );

                }

            );


        if (

            emailExists

        ) {

            showSignupMessage(

                "An account with this email already exists.",

                "error"

            );

            return;

        }


        // ===============================
        // CHECK PHONE
        // ===============================

        const phoneExists =

            users.some(

                function (user) {

                    return (

                        user.phone ===
                        phone

                    );

                }

            );


        if (

            phoneExists

        ) {

            showSignupMessage(

                "An account with this phone number already exists.",

                "error"

            );

            return;

        }


        // ===============================
        // CREATE NEW USER
        // ===============================

        const newUser = {

            userId:

                "USER-" +
                Date.now(),


            name:

                name,


            email:

                email,


            phone:

                phone,


            password:

                password,


            createdAt:

                new Date()
                    .toLocaleString()

        };


        // ===============================
        // ADD USER
        // ===============================

        users.push(
            newUser
        );


        // ===============================
        // SAVE USERS
        // ===============================

        saveUsers(
            users
        );


        // ===============================
        // SUCCESS MESSAGE
        // ===============================

        showSignupMessage(

            "Account created successfully! Redirecting to login...",

            "success"

        );


        // ===============================
        // RESET FORM
        // ===============================

        signupForm.reset();


        // ===============================
        // REDIRECT TO LOGIN
        // ===============================

        setTimeout(

            function () {

                window.location.href =
                    "login.html";

            },

            1500

        );

    }

);
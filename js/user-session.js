// ===================================
// HAMBA - DEMO USER SESSION
// ===================================


// ===============================
// DEMO USERS
// ===============================

const demoUsers = [

    {
        userId: "USER-SELLER-1",

        name: "Rahim Farm",

        phone: "01711111111",

        role: "seller"
    },

    {
        userId: "USER-BUYER-1",

        name: "Karim Buyer",

        phone: "01811111111",

        role: "buyer"
    },

    {
        userId: "USER-BUYER-2",

        name: "Sakib Buyer",

        phone: "01911111111",

        role: "buyer"
    }

];


// ===============================
// GET CURRENT USER
// ===============================

function getCurrentUser() {

    return JSON.parse(
        localStorage.getItem(
            "hambaCurrentUser"
        )
    );

}


// ===============================
// SET CURRENT USER
// ===============================

function setCurrentUser(user) {

    localStorage.setItem(

        "hambaCurrentUser",

        JSON.stringify(user)

    );

}


// ===============================
// INITIAL USER
// ===============================

function initializeDemoUser() {

    let currentUser =
        getCurrentUser();


    if (!currentUser) {

        setCurrentUser(
            demoUsers[0]
        );

    }

}


// ===============================
// SWITCH USER
// ===============================

function switchUser(userId) {

    const user =
        demoUsers.find(

            item =>
                item.userId === userId

        );


    if (!user) {

        return;

    }


    setCurrentUser(user);


    window.location.reload();

}


// ===============================
// INITIALIZE
// ===============================

initializeDemoUser();
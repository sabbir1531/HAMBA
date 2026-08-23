// ==============================
// HAMBA - SELL YOUR COW
// ==============================

const sellCowForm =
    document.getElementById("sellCowForm");

const cowImageInput =
    document.getElementById("cowImage");

const imagePreview =
    document.getElementById("imagePreview");

const successModal =
    document.getElementById("successModal");

const successMessage =
    document.getElementById("successMessage");


// ==============================
// IMAGE PREVIEW
// ==============================

let selectedImage = "";


cowImageInput.addEventListener(
    "change",
    function () {

        const file =
            this.files[0];


        if (!file) {

            return;

        }


        const reader =
            new FileReader();


        reader.onload =
            function (event) {

                selectedImage =
                    event.target.result;


                imagePreview.innerHTML = `

                    <img
                        src="${selectedImage}"
                        alt="Cow Preview"
                    >

                `;

            };


        reader.readAsDataURL(
            file
        );

    }
);


// ==============================
// FORM SUBMIT
// ==============================

sellCowForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        const newCow = {

            id:
                "COW-" +
                Date.now(),

            name:
                document.getElementById(
                    "cowName"
                ).value,

            breed:
                document.getElementById(
                    "cowBreed"
                ).value,

            age:
                document.getElementById(
                    "cowAge"
                ).value,

            weight:
                document.getElementById(
                    "cowWeight"
                ).value,

            price:
                Number(
                    document.getElementById(
                        "cowPrice"
                    ).value
                ),

            description:
                document.getElementById(
                    "cowDescription"
                ).value,

            location:
                document.getElementById(
                    "cowLocation"
                ).value,

            phone:
                document.getElementById(
                    "sellerPhone"
                ).value,

            image:
                selectedImage,

            status:
                "Available",

            postedDate:
                new Date().toLocaleString()

        };


        // ==============================
        // GET OLD COWS
        // ==============================

        let liveCows =
            JSON.parse(
                localStorage.getItem(
                    "hambaLiveCows"
                )
            )
            || [];


        // ==============================
        // ADD NEW COW
        // ==============================

        liveCows.push(
            newCow
        );


        // ==============================
        // SAVE
        // ==============================

        localStorage.setItem(

            "hambaLiveCows",

            JSON.stringify(
                liveCows
            )

        );


        // ==============================
        // SUCCESS
        // ==============================

        successMessage.textContent =

            `${newCow.name}
            has been successfully listed
            on Hamba Live Cows Market.`;


        successModal.classList.add(
            "show"
        );


        // RESET FORM

        sellCowForm.reset();


        imagePreview.innerHTML =

            `<span>
                Image Preview
            </span>`;


        selectedImage = "";

    }
);
/* =========================================================
   BULDHANA NAGAR PARISHAD
   MAIN JAVASCRIPT
========================================================= */
/* =========================================================
   BULDHANA NAGAR PARISHAD
   PWA INSTALL POPUP
========================================================= */

let deferredPrompt = null;


/* =========================================================
   GET BROWSER INSTALL PROMPT
========================================================= */

window.addEventListener("beforeinstallprompt", function (event) {

    console.log("beforeinstallprompt received");

    event.preventDefault();

    deferredPrompt = event;

});


/* =========================================================
   SHOW INSTALL POPUP
========================================================= */

function showInstallPopup() {

    // Mobile / responsive view only
    if (window.innerWidth > 768) {
        return;
    }

    // Do not show if already installed
    if (
        window.matchMedia("(display-mode: standalone)").matches ||
        window.navigator.standalone === true
    ) {
        return;
    }

    // Do not create duplicate popup
    if (document.getElementById("installPopup")) {
        return;
    }

    const popup = document.createElement("div");

    popup.id = "installPopup";

    popup.innerHTML = `
        <div class="install-overlay">

            <div class="install-box">

                <button
                    class="install-close"
                    id="installCloseButton">
                    ×
                </button>

                <div class="install-icon">
                    <img
                        src="icons/icon-192.png"
                        alt="Buldhana Nagar Parishad">
                </div>

                <h3>बुलढाणा नगर परिषद</h3>

                <p>
                    नागरिक सेवांचा जलद आणि सोपा वापर करण्यासाठी
                    आमचे App Install करा.
                </p>

                <button
                    class="install-btn"
                    id="installAppButton">
                    📲 Install App
                </button>

                <button
                    class="install-later"
                    id="installLaterButton">
                    Later
                </button>

            </div>

        </div>
    `;

    document.body.appendChild(popup);


    /* Close button */

    document
        .getElementById("installCloseButton")
        .addEventListener("click", function () {

            closeInstallPopup();

        });


    /* Later button */

    document
        .getElementById("installLaterButton")
        .addEventListener("click", function () {

            closeInstallPopup();

        });


    /* Install button */

    document
        .getElementById("installAppButton")
        .addEventListener("click", installApp);

}


/* =========================================================
   INSTALL APP
========================================================= */

async function installApp() {

    console.log("INSTALL BUTTON CLICKED");

    if (!deferredPrompt) {

        alert(
            "App install karne ke liye browser ke address bar me Install icon par click karein."
        );

        return;
    }

    try {

        await deferredPrompt.prompt();

        const result = await deferredPrompt.userChoice;

        console.log("Install result:", result.outcome);

        if (result.outcome === "accepted") {

            console.log("App installed successfully");

        } else {

            console.log("User cancelled installation");

        }

        deferredPrompt = null;

        closeInstallPopup();

    } catch (error) {

        console.error("Installation error:", error);

    }
}

/* =========================================================
   CLOSE POPUP
========================================================= */

function closeInstallPopup() {

    const popup =
        document.getElementById("installPopup");

    if (popup) {

        popup.remove();

    }

}


/* =========================================================
   SHOW POPUP AFTER PAGE LOAD
========================================================= */

window.addEventListener("load", function () {

    setTimeout(function () {

        showInstallPopup();

    }, 1500);

});


/* =========================================================
   APP INSTALLED
========================================================= */

window.addEventListener("appinstalled", function () {

    console.log(
        "Buldhana Nagar Parishad App Installed"
    );

    deferredPrompt = null;

    closeInstallPopup();

});
/* =========================================================
   SHOW SERVICES
========================================================= */

function openService(serviceName) {

    const serviceTitles = {

        complaint: "तक्रार नोंदवा",

        property: "मालमत्ता कर",

        water: "पाणीपुरवठा",

        cleaning: "स्वच्छता व्यवस्था",

        birth: "जन्म-मृत्यू दाखला",

        home: "जन-मृत्यू दाखला",

        citizen: "नागरिक सुविधा",

        notice: "महत्त्वाच्या सूचना",

        contact: "संपर्क"
    };

    const title =
        serviceTitles[serviceName] || "नागरिक सेवा";

    const servicePage =
        document.createElement("div");

    servicePage.id = "servicePage";
    servicePage.className = "service-page";

    servicePage.innerHTML = `

        <div class="service-page-header">

            <button
                class="service-back-button"
                onclick="closeServicePage()">

                <i class="fa-solid fa-arrow-left"></i>
                Back

            </button>

        </div>

        <div class="service-page-content">

            <h1>${title}</h1>

        </div>
    `;

    document.body.appendChild(servicePage);

    document.body.style.overflow = "hidden";
}


function closeServicePage() {

    const servicePage =
        document.getElementById("servicePage");

    if (servicePage) {
        servicePage.remove();
    }

    document.body.style.overflow = "";
}
/* =========================================================
   NOTIFICATION MESSAGE
========================================================= */

function showNotification(message) {

    /*
       Existing notification remove
    */

    const oldNotification =
        document.querySelector(".custom-notification");

    if (oldNotification) {

        oldNotification.remove();

    }


    /*
       Create notification
    */

    const notification =
        document.createElement("div");

    notification.className =
        "custom-notification";


    notification.innerHTML = `

        <div class="notification-message">

            <i class="fa-solid fa-circle-info"></i>

            <span>${message}</span>

        </div>

        <button
            class="notification-close"
            onclick="closeNotification()">

            <i class="fa-solid fa-xmark"></i>

        </button>

    `;


    document.body.appendChild(notification);


    /*
       Auto close after 4 seconds
    */

    setTimeout(() => {

        if (notification) {

            notification.classList.add(
                "notification-hide"
            );

            setTimeout(() => {

                notification.remove();

            }, 300);

        }

    }, 4000);

}


/* =========================================================
   CLOSE NOTIFICATION
========================================================= */

function closeNotification() {

    const notification =
        document.querySelector(
            ".custom-notification"
        );


    if (notification) {

        notification.classList.add(
            "notification-hide"
        );


        setTimeout(() => {

            notification.remove();

        }, 300);

    }

}


/* =========================================================
   BOTTOM NAVIGATION
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {


        const navItems =
            document.querySelectorAll(
                ".bottom-nav-item"
            );


        navItems.forEach(function (item) {


            item.addEventListener(
                "click",
                function (event) {


                    /*
                       Remove active class
                       from all items
                    */

                    navItems.forEach(
                        function (nav) {

                            nav.classList.remove(
                                "active"
                            );

                        }
                    );


                    /*
                       Add active class
                       to clicked item
                    */

                    this.classList.add(
                        "active"
                    );


                }
            );


        });


    }
);


/* =========================================================
   PREVENT EMPTY LINKS
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {


        const emptyLinks =
            document.querySelectorAll(
                '.bottom-nav-item[href="#"]'
            );


        emptyLinks.forEach(
            function (link) {


                link.addEventListener(
                    "click",
                    function (event) {

                        event.preventDefault();

                    }
                );


            }
        );


    }
);

/* =========================================================
   CARD TOUCH EFFECT
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {


        const cards =
            document.querySelectorAll(
                ".service-card"
            );


        cards.forEach(
            function (card) {


                card.addEventListener(
                    "touchstart",
                    function () {

                        this.classList.add(
                            "card-touch"
                        );

                    }
                );


                card.addEventListener(
                    "touchend",
                    function () {

                        setTimeout(() => {

                            this.classList.remove(
                                "card-touch"
                            );

                        }, 200);

                    }
                );


            }
        );


    }
);
/* ==========================================
   BULDHANA HERO SLIDER
   IMAGE + TEXT + COLOR CHANGE
========================================== */

document.addEventListener("DOMContentLoaded", function () {

    const heroImage =
        document.querySelector(".hero-building img");

    const welcomeText =
        document.querySelector(".welcome-text");

    const heroHeading =
        document.querySelector(".hero-text h2");

    const heroSubtitle =
        document.querySelector(".hero-text p");

    if (
        !heroImage ||
        !welcomeText ||
        !heroHeading ||
        !heroSubtitle
    ) {
        return;
    }


    /* ==========================================
       SLIDER DATA
    ========================================== */

       const slides = [

    // Slide 1
    {
        image: "images/building-4.png",

        welcome: "बुलढाणा नगर परिषद",

        heading: "आपला बुलढाणा",

        highlight: "आपला अभिमान",

        subtitle: "स्वच्छ आणि सुंदर शहरासाठी एकत्र येऊया",
        headingColor: "#702714",
        highlightColor: "#e85b0b",
        subtitleColor: "#555"
    },


    // Slide 2
    {
        image: "images/building-1.png",

        welcome: "आपले स्वागत आहे 👋",

        heading:  "स्वच्छ, सुंदर आणि",

        highlight: "स्मार्ट बुलढाणा",

        subtitle: "नागरिक सेवांसाठी सदैव तत्पर",

        headingColor: "#315d2b",
        highlightColor: "#e85b0b",
        subtitleColor: "#555"
    },


    // Slide 3
   {
    image: "images/nature.png",

    welcome: "निसर्ग जपूया, शहर सजवूया",

    heading: "स्वच्छ बुलढाणा",

    highlight: "सुंदर बुलढाणा",

    subtitle: "स्वच्छता हीच सेवा",

    headingColor: "#e85b0b",
    
    highlightColor: "#ffffff",
    
    subtitleColor: "#e85b0b"
    },
    // Slide 4
    {

    image: "images/banner-image.png",

    welcome: "समृद्ध इतिहास",

    heading: "सुंदर संस्कृती",

    highlight: "नैसर्गिक वैभव",

    subtitle: "आपला बुलढाणा, आपला अभिमान",

    headingColor: "#ffffff",

    highlightColor: "#ffffff",

    subtitleColor: "#ffffff"
    },
    // Slide 2
    {
        image: "images/slide-1.png",

        welcome: "सेवा सोपी, शहर सुंदर,",

        heading:  "एक क्लिक,",

        highlight: "अनेक सेवा",

        subtitle: "तुमची सेवा निवडा",

        headingColor: "#315d2b",
        highlightColor: "#e85b0b",
        subtitleColor: "#555"
    }
   
];


    let currentSlide = 0;


    /* ==========================================
       PRELOAD IMAGES
    ========================================== */

    const preloadedImages = [];

    slides.forEach(function (slide) {

        const img = new Image();

        img.src = slide.image;

        preloadedImages.push(img);

    });


    /* ==========================================
       SHOW SLIDE
    ========================================== */

    function showSlide(index) {
        heroHeading.style.textShadow =
    "2px 2px 5px rgba(0,0,0,0.85)";

heroSubtitle.style.textShadow =
    "1px 1px 4px rgba(0,0,0,0.85)";

welcomeText.style.textShadow =
    "1px 1px 4px rgba(0,0,0,0.85)";

        const slide = slides[index];



        /* Image */

        heroImage.style.opacity = "0";


        setTimeout(function () {

            heroImage.src =
                preloadedImages[index].src;

            heroImage.style.opacity = "1";

        }, 250);


        /* Welcome text */

        welcomeText.textContent =
            slide.welcome;


        /* Heading */

        heroHeading.innerHTML = `
            ${slide.heading}
            <strong>${slide.highlight}</strong>
        `;


        /* Colors */

        heroHeading.style.color =
            slide.headingColor;


        const strongText =
            heroHeading.querySelector("strong");


        if (strongText) {

            strongText.style.color =
                slide.highlightColor;

        }


        /* Subtitle */

        heroSubtitle.textContent =
            slide.subtitle;


        heroSubtitle.style.color =
            slide.subtitleColor;


        /* Welcome color */

        welcomeText.style.color =
            slide.headingColor;

    }


    /* ==========================================
       FIRST SLIDE
    ========================================== */

    showSlide(currentSlide);


    /* ==========================================
       AUTO SLIDE - EVERY 3 SECONDS
    ========================================== */

    setInterval(function () {

        currentSlide++;

        if (currentSlide >= slides.length) {

            currentSlide = 0;

        }

        showSlide(currentSlide);

    }, 3000);

});
if ("serviceWorker" in navigator) {

    window.addEventListener("load", function () {

        navigator.serviceWorker
            .register("./service-worker.js")
            .then(function () {
                console.log("Service Worker Registered");
            })
            .catch(function (error) {
                console.log("Service Worker Error:", error);
            });

    });

}
/* =========================================================
   APP SPLASH SCREEN
   SHOW ONLY WHEN PWA APP IS OPENED
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const splash =
        document.getElementById("appSplashScreen");

    if (!splash) {
        return;
    }


    /* Check if website is opened as installed app */

    const isStandalone =
        window.matchMedia("(display-mode: standalone)").matches ||
        window.navigator.standalone === true;


    /* Normal Chrome/browser website
       → Do NOT show splash */

    if (!isStandalone) {

        splash.remove();

        return;
    }


    /* Installed App
       → Show splash for 3 seconds */

    setTimeout(function () {

        splash.classList.add("hide");

        setTimeout(function () {

            splash.remove();

        }, 500);

    }, 3000);

});
// ==========================================
// SERVICE WORKER REGISTRATION
// ==========================================

if ("serviceWorker" in navigator) {

    window.addEventListener("load", function () {

        navigator.serviceWorker
            .register("./service-worker.js")
            .then(function (registration) {

                console.log(
                    "Service Worker Registered:",
                    registration.scope
                );

            })
            .catch(function (error) {

                console.error(
                    "Service Worker Registration Failed:",
                    error
                );

            });

    });

}

/* =========================================================
   BULDHANA NAGAR PARISHAD
   MAIN JAVASCRIPT
========================================================= */


/* =========================================================
   SHOW SERVICES
========================================================= */

function showServices() {

    const servicesSection =
        document.getElementById("services");

    if (servicesSection) {

        servicesSection.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }

}

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
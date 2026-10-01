document.addEventListener("DOMContentLoaded", function () {

    /* ========================================
       CONFIGURACIÓN
    ======================================== */

    /*
        IMPORTANTE:

        Sustituye 34TU_NUMERO por el número
        del restaurante.

        Ejemplo:

        Si el teléfono es:
        612345678

        pondríamos:
        34612345678

        SIN +, SIN espacios y SIN guiones.
    */

    const numeroRestaurante = "34600000000";


    /* ========================================
       MENÚ MÓVIL
    ======================================== */

    const menuToggle =
        document.getElementById("menu-toggle");

    const navLinks =
        document.getElementById("nav-links");


    if (menuToggle && navLinks) {

        menuToggle.addEventListener("click", function () {

            const menuAbierto =
                navLinks.classList.toggle("active");


            menuToggle.setAttribute(
                "aria-expanded",
                menuAbierto
            );


            /*
                Cambiamos ☰ por × cuando
                el menú está abierto.
            */

            if (menuAbierto) {

                menuToggle.textContent = "×";

            } else {

                menuToggle.textContent = "☰";

            }

        });


        /* ====================================
           CERRAR MENÚ AL PULSAR UN ENLACE
        ==================================== */

        const enlacesMenu =
            document.querySelectorAll(".nav-links a");


        enlacesMenu.forEach(function (enlace) {

            enlace.addEventListener("click", function () {

                navLinks.classList.remove("active");

                menuToggle.textContent = "☰";

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            });

        });


        /* ====================================
           CERRAR MENÚ AL VOLVER A ESCRITORIO
        ==================================== */

        window.addEventListener("resize", function () {

            if (window.innerWidth > 800) {

                navLinks.classList.remove("active");

                menuToggle.textContent = "☰";

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        });

    }


    /* ========================================
       FORMULARIO DE RESERVAS
    ======================================== */

    const formulario =
        document.getElementById("form-reserva");


    if (formulario) {

        formulario.addEventListener(
            "submit",
            function (event) {

                /*
                    Evitamos que el formulario
                    recargue la página.
                */

                event.preventDefault();


                /*
                    Comprobamos la validación
                    HTML del formulario.
                */

                if (!formulario.checkValidity()) {

                    formulario.reportValidity();

                    return;

                }


                /* ==============================
                   OBTENER DATOS
                ============================== */

                const nombre =
                    document
                        .getElementById("nombre")
                        .value
                        .trim();


                const telefono =
                    document
                        .getElementById("telefono")
                        .value
                        .trim();


                const fecha =
                    document
                        .getElementById("fecha")
                        .value;


                const hora =
                    document
                        .getElementById("hora")
                        .value;


                const personas =
                    document
                        .getElementById("personas")
                        .value;


                /* ==============================
                   CREAR MENSAJE
                ============================== */

                const mensaje =
`Hola, quiero solicitar una reserva en Sabores del Sur.

Nombre: ${nombre}
Teléfono: ${telefono}
Fecha: ${fecha}
Hora: ${hora}
Personas: ${personas}

¿Podrían confirmarme disponibilidad?`;


                /* ==============================
                   CREAR URL WHATSAPP
                ============================== */

                const urlWhatsApp =
                    "https://wa.me/" +
                    numeroRestaurante +
                    "?text=" +
                    encodeURIComponent(mensaje);


                /* ==============================
                   ABRIR WHATSAPP
                ============================== */

                window.open(
                    urlWhatsApp,
                    "_blank",
                    "noopener,noreferrer"
                );

            }
        );

    }


    /* ========================================
       BOTÓN WHATSAPP FLOTANTE
    ======================================== */

    const whatsappContacto =
        document.getElementById(
            "whatsapp-contacto"
        );


    if (whatsappContacto) {

        const mensajeContacto =
            "Hola, quiero información sobre Sabores del Sur.";


        whatsappContacto.href =
            "https://wa.me/" +
            numeroRestaurante +
            "?text=" +
            encodeURIComponent(
                mensajeContacto
            );

    }


    /* ========================================
       ANIMACIONES AL HACER SCROLL
    ======================================== */

    const elementosAnimados =
        document.querySelectorAll(
            "#nosotros, .plato, #galeria, #reservas, #contacto"
        );


    /*
        Comprobamos que el navegador soporte
        IntersectionObserver.
    */

    if ("IntersectionObserver" in window) {

        elementosAnimados.forEach(
            function (elemento) {

                elemento.classList.add(
                    "reveal"
                );

            }
        );


        const observer =
            new IntersectionObserver(

                function (entradas) {

                    entradas.forEach(
                        function (entrada) {

                            if (
                                entrada.isIntersecting
                            ) {

                                entrada
                                    .target
                                    .classList
                                    .add("visible");


                                observer.unobserve(
                                    entrada.target
                                );

                            }

                        }
                    );

                },

                {
                    threshold: 0.10
                }

            );


        elementosAnimados.forEach(
            function (elemento) {

                observer.observe(elemento);

            }
        );

    }

});
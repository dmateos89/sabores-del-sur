document.addEventListener("DOMContentLoaded", function () {

    /* ========================================
       CONFIGURACIÓN
    ======================================== */

    /*
        Sustituye este número por el número
        real del restaurante.

        Formato:
        34 + número de teléfono

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

            if (menuAbierto) {

                menuToggle.textContent = "×";

            } else {

                menuToggle.textContent = "☰";

            }

        });


        /* CERRAR MENÚ AL PULSAR UN ENLACE */

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


        /* CERRAR MENÚ AL VOLVER A ESCRITORIO */

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

                event.preventDefault();


                if (!formulario.checkValidity()) {

                    formulario.reportValidity();

                    return;

                }


                /* OBTENER DATOS */

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


                /* CREAR MENSAJE */

                const mensaje =
`Hola, quiero solicitar una reserva en Sabores del Sur.

Nombre: ${nombre}
Teléfono: ${telefono}
Fecha: ${fecha}
Hora: ${hora}
Personas: ${personas}

¿Podrían confirmarme disponibilidad?`;


                /* CREAR URL DE WHATSAPP */

                const urlWhatsApp =
                    "https://wa.me/" +
                    numeroRestaurante +
                    "?text=" +
                    encodeURIComponent(mensaje);


                /* ABRIR WHATSAPP */

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

                            if (entrada.isIntersecting) {

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


    /* ========================================
       BOTÓN VOLVER ARRIBA
    ======================================== */

    const volverArriba =
        document.getElementById("volver-arriba");


    if (volverArriba) {

        function actualizarBotonVolverArriba() {

            if (window.scrollY > 450) {

                volverArriba.classList.add("visible");

            } else {

                volverArriba.classList.remove("visible");

            }

        }


        window.addEventListener(
            "scroll",
            actualizarBotonVolverArriba,
            { passive: true }
        );


        actualizarBotonVolverArriba();


        volverArriba.addEventListener(
            "click",
            function () {

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }
        );

    }


    /* ========================================
       LIGHTBOX DE LA GALERÍA
    ======================================== */

    const imagenesGaleria =
        Array.from(
            document.querySelectorAll(
                ".galeria-grid img"
            )
        );


    const lightbox =
        document.getElementById(
            "lightbox-galeria"
        );


    const lightboxImagen =
        document.getElementById(
            "lightbox-imagen"
        );


    const lightboxContador =
        document.getElementById(
            "lightbox-contador"
        );


    const lightboxCerrar =
        document.getElementById(
            "lightbox-cerrar"
        );


    const lightboxAnterior =
        document.getElementById(
            "lightbox-anterior"
        );


    const lightboxSiguiente =
        document.getElementById(
            "lightbox-siguiente"
        );


    let indiceActual = 0;

    let inicioToqueX = 0;


    if (
        imagenesGaleria.length &&
        lightbox &&
        lightboxImagen &&
        lightboxContador
    ) {


        /* ====================================
           MOSTRAR IMAGEN
        ==================================== */

        function mostrarImagen(indice) {

            indiceActual =
                (indice + imagenesGaleria.length) %
                imagenesGaleria.length;


            const imagen =
                imagenesGaleria[indiceActual];


            lightboxImagen.src =
                imagen.src;


            lightboxImagen.alt =
                imagen.alt;


            lightboxContador.textContent =
                (indiceActual + 1) +
                " / " +
                imagenesGaleria.length;

        }


        /* ====================================
           ABRIR GALERÍA
        ==================================== */

        function abrirLightbox(indice) {

            mostrarImagen(indice);


            lightbox.classList.add(
                "activo"
            );


            lightbox.setAttribute(
                "aria-hidden",
                "false"
            );


            document.body.classList.add(
                "lightbox-abierto"
            );


            if (lightboxCerrar) {

                lightboxCerrar.focus();

            }

        }


        /* ====================================
           CERRAR GALERÍA
        ==================================== */

        function cerrarLightbox() {

            lightbox.classList.remove(
                "activo"
            );


            lightbox.setAttribute(
                "aria-hidden",
                "true"
            );


            document.body.classList.remove(
                "lightbox-abierto"
            );

        }


        /* ====================================
           PULSAR UNA FOTO
        ==================================== */

        imagenesGaleria.forEach(
            function (imagen, indice) {

                /*
                    Permitimos abrir también
                    con el teclado.
                */

                imagen.setAttribute(
                    "tabindex",
                    "0"
                );


                imagen.setAttribute(
                    "role",
                    "button"
                );


                imagen.addEventListener(
                    "click",
                    function () {

                        abrirLightbox(indice);

                    }
                );


                imagen.addEventListener(
                    "keydown",
                    function (event) {

                        if (
                            event.key === "Enter" ||
                            event.key === " "
                        ) {

                            event.preventDefault();

                            abrirLightbox(indice);

                        }

                    }
                );

            }
        );


        /* ====================================
           BOTÓN CERRAR
        ==================================== */

        if (lightboxCerrar) {

            lightboxCerrar.addEventListener(
                "click",
                cerrarLightbox
            );

        }


        /* ====================================
           IMAGEN ANTERIOR
        ==================================== */

        if (lightboxAnterior) {

            lightboxAnterior.addEventListener(
                "click",
                function () {

                    mostrarImagen(
                        indiceActual - 1
                    );

                }
            );

        }


        /* ====================================
           IMAGEN SIGUIENTE
        ==================================== */

        if (lightboxSiguiente) {

            lightboxSiguiente.addEventListener(
                "click",
                function () {

                    mostrarImagen(
                        indiceActual + 1
                    );

                }
            );

        }


        /* ====================================
           CERRAR PULSANDO FUERA DE LA FOTO
        ==================================== */

        lightbox.addEventListener(
            "click",
            function (event) {

                if (event.target === lightbox) {

                    cerrarLightbox();

                }

            }
        );


        /* ====================================
           CONTROLES DEL TECLADO
        ==================================== */

        document.addEventListener(
            "keydown",
            function (event) {

                if (
                    !lightbox.classList.contains(
                        "activo"
                    )
                ) {

                    return;

                }


                /* ESC = CERRAR */

                if (event.key === "Escape") {

                    cerrarLightbox();

                }


                /* FLECHA IZQUIERDA */

                else if (
                    event.key === "ArrowLeft"
                ) {

                    mostrarImagen(
                        indiceActual - 1
                    );

                }


                /* FLECHA DERECHA */

                else if (
                    event.key === "ArrowRight"
                ) {

                    mostrarImagen(
                        indiceActual + 1
                    );

                }

            }
        );


        /* ====================================
           DESLIZAR EN MÓVIL
        ==================================== */

        lightbox.addEventListener(
            "touchstart",
            function (event) {

                inicioToqueX =
                    event
                        .changedTouches[0]
                        .screenX;

            },
            {
                passive: true
            }
        );


        lightbox.addEventListener(
            "touchend",
            function (event) {

                const finToqueX =
                    event
                        .changedTouches[0]
                        .screenX;


                const diferencia =
                    finToqueX -
                    inicioToqueX;


                /*
                    Si el movimiento es muy
                    pequeño no hacemos nada.
                */

                if (
                    Math.abs(diferencia) < 50
                ) {

                    return;

                }


                /*
                    Deslizar hacia la derecha:
                    foto anterior.
                */

                if (diferencia > 0) {

                    mostrarImagen(
                        indiceActual - 1
                    );

                }


                /*
                    Deslizar hacia la izquierda:
                    foto siguiente.
                */

                else {

                    mostrarImagen(
                        indiceActual + 1
                    );

                }

            },
            {
                passive: true
            }
        );

    }

});
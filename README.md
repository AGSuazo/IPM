# Sitio Web Educativo - Instituto Potrerillos Mineral

Este es un sitio web educativo demo construido con HTML5, CSS3 y JavaScript, que cumple con requisitos específicos de estructura, diseño responsivo, interactividad y preparación para un entorno de hosting web.

## Características Principales

*   **Estructura y Navegación Semántica:**
    *   Secciones principales: Inicio, Quienes Somos, Oferta Académica, Docentes, Noticias, Galería, Contacto.
    *   Menú superior fijo (banner) con enlaces internos consistentes.
    *   Uso de etiquetas semánticas HTML5 (`<header>`, `<main>`, `<section>`, `<article>`, `<footer>`).
*   **Inicio**
    *   **Carrusel funcional con 5 imágenes:** Incluye flechas de navegación, puntos, autoplay y opción de pausa/reproducción. El número de imágenes es dinámico (configurable en HTML).
    *   **Mensaje central superpuesto:** Frase principal de la institución visible sobre el carrusel.
    *   Imágenes optimizadas con atributos `alt` para accesibilidad.
*   **Sección de Noticias:**
    *   Modelo de cajas (cards) con imagen, título y resumen.
    *   Diseño responsivo usando CSS Grid/Flexbox.
*   **Banner Superior Dinámico:**
    *   Logo institucional con tamaño ajustado y alineado con el menú. **Nota:** Para una integración perfecta, el logo (`img/logo.png`) debe tener fondo transparente (formato PNG o SVG).
    *   Menú de navegación principal y botón de menú hamburguesa responsive.
    *   Diseño consistente en todas las secciones.
*   **CSS Profesional:**
    *   Archivo externo (`css/style.css`).
    *   Uso de variables CSS para gestionar la paleta de colores institucional y tipografía web.
    *   Estilos globales consistentes y de fácil mantenimiento.
*   **Diseño Responsive Avanzado:**
    *   Adaptable a móvil, tablet y escritorio utilizando media queries, CSS Grid y Flexbox.
    *   El carrusel y las tarjetas de noticias/galería/docentes se ajustan fluidamente.
    *   Los planes de estudio se muestran horizontalmente en desktop y verticalmente en móvil.
*   **Formulario de Contacto Funcional:**
    *   Campos: nombre, correo electrónico, mensaje.
    *   Validación en cliente (HTML5 y JavaScript) y **validación en servidor (PHP)**.
    *   Al enviar, muestra un mensaje de éxito/error. **Ahora envía un correo electrónico real al backend PHP.**
*   **JavaScript Propio Modular:**
    *   Implementación de carrusel, validación de formulario y menú desplegable responsive.
    *   Código modular en archivo separado (`js/script.js`).
    *   Sin errores en consola (en condiciones normales de funcionamiento).
*   **Accesibilidad y SEO:**
    *   Contraste de colores adecuado.
    *   Meta `title` y `meta description` en todas las páginas.
    *   Atributos `alt` para imágenes.
    *   Orden correcto de tabulación para elementos interactivos.
*   **Buenas Prácticas:**
    *   Estructura de carpetas clara: `/css`, `/js`, `/img`.
    *   Comentarios útiles en el código HTML, CSS y JavaScript.

## Cómo Abrir y Probar el Proyecto

Para una experiencia completa y para probar el formulario de contacto, necesitarás un servidor web local con PHP.

1.  **Clona o descarga** este repositorio.
2.  **Imágenes:** Asegúrate de que todas las imágenes mencionadas en el código (especialmente las del carrusel: `carousel1.jpg` a `carousel5.jpg`; los planes de estudio: `10cyf.jpg`, `11cyf.jpg`, `12cyf.jpg`; y el logo: `logo.png` **con fondo transparente**) estén presentes en la carpeta `img/`.
3.  **Configuración del Correo para el Formulario (PHP):**
    *   Abre el archivo `send_email.php`.
    *   **IMPORTANTE:** Cambia la línea `$to = "grasiela.castellanos@educatrachos.hn";` a tu dirección de correo electrónico real donde deseas recibir los mensajes.
4.  **Configura un servidor web local con PHP:**
    *   Recomendado: **XAMPP** (Windows, macOS, Linux), **WAMP** (Windows) o **MAMP** (macOS).
    *   Instala el paquete de tu elección.
    *   Copia la carpeta completa de tu proyecto (`mi-sitio-educativo/`) dentro del directorio `htdocs` (para XAMPP/Apache) o `www` (para WAMP/MAMP).
5.  **Inicia los servicios del servidor web (Apache y PHP).**
6.  **Accede al proyecto en tu navegador web:**
    *   Dirígete a la URL correspondiente, por ejemplo: `http://localhost/mi-sitio-educativo/index.html` (o `http://localhost/mi-sitio-educativo/` si el servidor está configurado para buscar `index.html` por defecto).
7.  **Prueba el Formulario de Contacto:** Navega a la sección de Contacto y envía un mensaje.
    *   **Nota sobre el envío de correos en local:** La función `mail()` de PHP puede requerir una configuración adicional de SMTP en tu servidor local (ej. con MailHog en XAMPP) para enviar correos externos. Si no está configurado, el script PHP se ejecutará, validará, pero el correo podría no salir del entorno local. Sin embargo, el mensaje de éxito/error en la web sí aparecerá.

## Estructura del Proyecto
IPM/
├── css/
│ └── style.css # Estilos generales y específicos del sitio
├── js/
│ └── script.js # Lógica JavaScript (carrusel, menú, validación y envío de form)
├── img/ # Contiene todas las imágenes del sitio (logo, carrusel, noticias, galería, docentes, planes de estudio)
│ ├── logo.png # Logo de la institución (se recomienda fondo transparente)
│ ├── carousel1.jpg # Imagen 1 del carrusel
│ ├── carousel2.jpg # Imagen 2 del carrusel
│ ├── carousel3.jpg # Imagen 3 del carrusel
│ ├── IPM1.jpg # Imagen de quienes somos
│ ├── news1.jpg # Imagen de noticia 1
│ ├── news2.jpg # Imagen de noticia 2
│ ├── news3.jpg # Imagen de noticia 3
│ ├── gallery1.jpg # Imagen de galería 1
│ ├── gallery2.jpg # Imagen de galería 2
│ ├── gallery3.jpg # Imagen de galería 3
│ ├── gallery4.jpg # Imagen de galería 4
│ ├── teacher1.jpg # Imagen de docente 1
│ ├── 10b.jpg # Plan de estudios BCH - Décimo 
│ ├── 11b.jpg # Plan de estudios BCH - Undécimo 
│ ├── 10i.jpg # Plan de estudios BTP INF - Décimo 
│ ├── 11i.jpg # Plan de estudios BTP INF - Undécimo
│ ├── 12i.jpg # Plan de estudios BTP INF - Duodécimo
│ ├── 10cyf.jpg # Plan de estudios BTPCYF - Décimo 
│ ├── 11cyf.jpg # Plan de estudios BTPCYF - Undécimo
│ └── 12cyf.jpg # Plan de estudios BTPCYF - Duodécimo
├── index.html # Página de Inicio
├── quienessomos.html # Página de Historia
├── oferta.html # Página de Oferta Académica
├── docentes.html # Página de Docentes
├── noticias.html # Página de Noticias
├── galeria.html # Página de Galería de Imágenes
├── contacto.html # Página de Contacto con formulario
├── BTPCYF.html # Página de Plan de Estudios de BTP en Contaduría y Finanzas
├── BTPI.html # Página de Plan de Estudios de BTP en Informática
├── BCH # Página de Plan de Estudios de Bachillerato en Ciencias y Humanidades
├── send_email.php # Script de backend PHP para enviar el correo del formulario
└── README.md # Este archivo
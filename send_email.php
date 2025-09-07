<?php
// Establece las cabeceras para indicar que la respuesta será JSON
header('Content-Type: application/json');

// Inicializa una respuesta por defecto
$response = ['success' => false, 'message' => 'Ocurrió un error inesperado.'];

// Verifica si la solicitud es de tipo POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // 1. Recoger y sanitizar los datos del formulario
    // htmlspecialchars previene ataques XSS
    // trim elimina espacios en blanco al inicio y final
    $name = htmlspecialchars(trim($_POST['name'] ?? ''));
    $email = htmlspecialchars(trim($_POST['email'] ?? ''));
    $message = htmlspecialchars(trim($_POST['message'] ?? ''));

    // 2. Validación de datos en el servidor (ESENCIAL para seguridad)
    if (empty($name) || empty($email) || empty($message)) {
        $response['message'] = 'Todos los campos son obligatorios.';
        echo json_encode($response);
        exit; // Detiene la ejecución si hay campos vacíos
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $response['message'] = 'Por favor, introduce un correo electrónico válido.';
        echo json_encode($response);
        exit; // Detiene la ejecución si el email no es válido
    }

    // 3. Configuración del correo electrónico
    $to = "grasiela.castellanos@educatrachos.hn"; // <-- ¡CAMBIA ESTO A TU CORREO REAL!
    $subject = "Nuevo mensaje de contacto de: " . $name;
    $body = "Nombre: " . $name . "\n";
    $body .= "Email: " . $email . "\n";
    $body .= "Mensaje:\n" . $message;

    // Cabeceras del correo
    $headers = "From: " . $name . " <" . $email . ">\r\n";
    $headers .= "Reply-To: " . $email . "\r\n";
    $headers .= "Content-type: text/plain; charset=UTF-8\r\n"; // Para asegurar caracteres especiales

    // 4. Intentar enviar el correo
    if (mail($to, $subject, $body, $headers)) {
        $response['success'] = true;
        $response['message'] = '¡Gracias por contactarnos, en breve un asesor se comunicará contigo por los medios que nos has facilitado!';
    } else {
        $response['message'] = 'Hubo un problema al enviar tu mensaje. Por favor, inténtalo de nuevo más tarde.';
        // Opcional: registrar el error en un archivo de log para depuración
        error_log("Error al enviar correo: " . print_r(error_get_last(), true));
    }
} else {
    // Si la solicitud no es POST, rechazarla
    http_response_code(405); // Método no permitido
    $response['message'] = 'Método de solicitud no permitido.';
}

// Envía la respuesta JSON al cliente
echo json_encode($response);
?>
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registroForm');
    const nombreInput = document.getElementById('nombre');
    const telefonoInput = document.getElementById('telefono');
    const codigoInput = document.getElementById('codigo');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartItemsList = document.getElementById('cart-items');
    const cartTotalSpan = document.getElementById('cart-total');
    let cart = [];
    // Función para actualizar la visualización del carrito
    const updateCartDisplay = () => {
        cartItemsList.innerHTML = ''; // Limpia la lista del carrito
        let total = 0;

        cart.forEach(item => {
            const listItem = document.createElement('li');
            listItem.textContent = `${item.name} - $${item.price}`;
            cartItemsList.appendChild(listItem);
            total += item.price;
        });

        cartTotalSpan.textContent = total;
    };

    // Añadir un listener a cada botón de "Añadir al Carrito"
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const product = event.target.closest('.product');
            const productId = product.getAttribute('data-id');
            const productName = product.getAttribute('data-name');
            const productPrice = parseFloat(product.getAttribute('data-price'));

            // Añadir el producto al array del carrito
            cart.push({
                id: productId,
                name: productName,
                price: productPrice
            });

            // Actualizar la interfaz de usuario
            updateCartDisplay();
            alert(`${productName} ha sido añadido al carrito.`);
        });
    });

    // Opcional: listener para el botón de "Pagar"
    document.getElementById('checkout').addEventListener('click', () => {
        if (cart.length > 0) {
            alert(`¡Gracias por tu compra! El total es de $${cartTotalSpan.textContent}.`);
            cart = []; // Vaciar el carrito
            updateCartDisplay();
        } else {
            alert('Tu carrito está vacío.');
        }
    });



    form.addEventListener('submit', (event) => {
        // Previene el envío del formulario por defecto
        event.preventDefault(); 
        
        // Reinicia los mensajes de error
        clearErrors();

        let isValid = true;

        // Validación del nombre
        if (nombreInput.value.trim() === '') {
            showError(nombreInput, 'El nombre es obligatorio.');
            isValid = false;
        }
        // Validación del telefono
        if (isNaN(telefonoInput.value.trim())) {
            showError(telefonoInput, 'Solo acepta numeros');
            isValid = false;
        }
        // Validación del codigo postales
        if (codigoInput.value.trim() === '') {
            showError(codigoInput, 'El Codigo Postal es obligatorio');
            isValid = false;
        }
        // Validación del email
        if (emailInput.value.trim() === '') {
            showError(emailInput, 'El email es obligatorio.');
            isValid = false;
        } else if (!isValidEmail(emailInput.value)) {
            showError(emailInput, 'Por favor, introduce un email válido.');
            isValid = false;
        }
        // Validación de la contraseña
        if (passwordInput.value.trim() === '') {
            showError(passwordInput, 'La contraseña es obligatoria.');
            isValid = false;
        } else if (passwordInput.value.length < 6) {
            showError(passwordInput, 'La contraseña debe tener al menos 6 caracteres.');
            isValid = false;
        }

        // Si el formulario es válido, puedes enviarlo
        if (isValid) {
            alert('¡Formulario enviado con éxito!');
            // Aquí iría el código para enviar los datos al servidor
            // por ejemplo, usando fetch()
            form.reset(); // Limpia los campos del formulario
        }
    });

    function showError(input, message) {
        const formGroup = input.parentElement;
        const errorMessageDiv = formGroup.querySelector('.error-message');
        errorMessageDiv.textContent = message;
    }

    function clearErrors() {
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(div => div.textContent = '');
    }

    function isValidEmail(email) {
        // Regex para validar el formato del email
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
});
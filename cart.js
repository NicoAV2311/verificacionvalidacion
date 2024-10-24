let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Función para mostrar los artículos del carrito
function displayCartItems() {
    const cartItems = document.getElementById("cartItems");
    cartItems.innerHTML = '';

    let totalValue = 0;
    cart.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.innerHTML = `${item.name} - $${item.price} x ${item.quantity}`;
        cartItems.appendChild(itemDiv);
        totalValue += item.price * item.quantity;
    });

    document.getElementById("totalValue").innerText = `Total: $${totalValue}`;
}

// Función para realizar la compra
document.getElementById("checkoutButton").addEventListener("click", () => {
    if (cart.length > 0) {
        cart = [];
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCartItems();
        alert("Compra realizada con éxito!");
    } else {
        alert("Tu carrito está vacío.");
    }
});

// Función para vaciar el carrito
document.getElementById("emptyCartButton").addEventListener("click", () => {
    if (cart.length > 0) {
        cart = [];
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCartItems();
        alert("El carrito ha sido vaciado.");
    } else {
        alert("El carrito ya está vacío.");
    }
});

// Cargar los artículos del carrito al inicio
displayCartItems();

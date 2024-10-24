const products = [
    { id: 1, name: "Mouse", price: 100, image: "https://resource.logitech.com/content/dam/logitech/en/products/mice/m171/gallery/m171-mouse-top-view-grey.png" },
    { id: 2, name: "Diadema gamer", price: 200, image: "https://imagedelivery.net/4fYuQyy-r8_rpBpcY7lH_A/sodimacCO/509564_1/w=1500,h=1500,fit=pad" },
    { id: 3, name: "Procesador", price: 300, image: "https://i.blogs.es/fb506a/intelraptorlake-ap/1366_2000.jpeg" },
    { id: 4, name: "Usb", price: 150, image: "https://panamericana.vtexassets.com/arquivos/ids/393460/memoria-usb-64-gb-cruzer-blade-sandisk-619659097318.jpg?v=637572977126100000" },
    { id: 5, name: "Disco duro", price: 250, image: "https://fenixcomercial.com.co/wp-content/uploads/2023/02/WD10EZEX-p.png" },
    { id: 6, name: "Teclado", price: 50, image: "https://electronicasannicolas.com.co/wp-content/uploads/2022/02/TECLADO-GENIUS-USB-KB-100-4554.png" },
    { id: 7, name: "Monitor", price: 75, image: "https://megacomputer.com.co/wp-content/uploads/2024/02/27MR400.webp" },
    { id: 8, name: "Audifonos", price: 125, image: "https://acdn.mitiendanube.com/stores/093/864/products/7707278179973_eb-5000-bc-21-9b1032133a80617a4a16837341403599-1024-1024.jpg" },
    { id: 9, name: "Tablet", price: 175, image: "https://tablets.com.co/wp-content/uploads/2022/04/Tablet-lenovo-TB-8505F.-Pantalla-80-Conectividad-WI-FI-Memoria-2GB-32GB.-Foto-I-tablets.com_.co_.jpg" },
    { id: 10, name: "Celular", price: 225, image: "https://exitocol.vtexassets.com/arquivos/ids/22358707/celular-samsung-galaxy-a55-5g-256gb-8gb-ram-lila.jpg?v=638478703469600000" }
];

let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Función para mostrar los productos
function displayProducts(productsToDisplay) {
    const productList = document.getElementById("productList");
    productList.innerHTML = '';
    productsToDisplay.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');
        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>Precio: $${product.price}</p>
            <button onclick="addToCart(${product.id})">Agregar al carrito</button>
        `;
        productList.appendChild(productDiv);
    });
}

// Función para actualizar la cantidad de artículos en el carrito
function updateCartCount() {
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById("cartCount").innerText = cartCount;
}

// Función para buscar productos con sugerencias
document.getElementById("search").addEventListener("input", (event) => {
    const searchTerm = event.target.value.toLowerCase();
    const filteredProducts = products.filter(product => product.name.toLowerCase().includes(searchTerm));
    
    // Mostrar sugerencias
    const suggestions = document.getElementById("suggestions");
    const noResults = document.getElementById("noResults");
    suggestions.innerHTML = '';
    noResults.classList.add('hidden');

    if (searchTerm) {
        if (filteredProducts.length > 0) {
            filteredProducts.forEach(product => {
                const suggestionDiv = document.createElement('div');
                suggestionDiv.innerText = product.name;
                suggestionDiv.onclick = () => {
                    document.getElementById("search").value = product.name;
                    suggestions.innerHTML = '';
                    displayProducts([product]);
                };
                suggestions.appendChild(suggestionDiv);
            });
            suggestions.classList.remove('hidden');
        } else {
            noResults.classList.remove('hidden');
            suggestions.classList.add('hidden');
        }
    } else {
        suggestions.classList.add('hidden');
    }
});

// Función para agregar productos al carrito
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    
    const existingProduct = cart.find(p => p.id === productId);
    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

// Inicializar la cantidad del carrito al cargar
updateCartCount();

// Cargar todos los productos al inicio
displayProducts(products);

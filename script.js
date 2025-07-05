document.addEventListener('DOMContentLoaded', function () {
    const productNameInput = document.getElementById('productName');
    const productPriceInput = document.getElementById('productPrice');
    const addProductBtn = document.getElementById('addProductBtn');
    const productList = document.getElementById('productList');
    const searchInput = document.getElementById('searchInput');
    const cartList = document.getElementById('cartList');
    const totalPriceElement = document.getElementById('totalPrice');
    const paidAmountInput = document.getElementById('paidAmount');
    const checkoutBtn = document.getElementById('checkoutBtn');
    const receiptOutput = document.getElementById('receiptOutput');
    const receiptSection = document.querySelector('.receipt');

    let products = JSON.parse(localStorage.getItem('products')) || [];
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Fungsi untuk menampilkan produk
    function renderProducts() {
        productList.innerHTML = '';
        const searchTerm = searchInput.value.toLowerCase();
        products.forEach((product, index) => {
            if (product.name.toLowerCase().includes(searchTerm)) {
                const li = document.createElement('li');
                li.textContent = `${product.name} - Rp ${formatPrice(product.price)}`;
                const addButton = document.createElement('button');
                addButton.textContent = 'Tambah ke Keranjang';
                addButton.onclick = () => addToCart(index);
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Hapus';
                deleteButton.onclick = () => deleteProduct(index);
                li.appendChild(addButton);
                li.appendChild(deleteButton);
                productList.appendChild(li);
            }
        });
    }

    // Fungsi untuk menampilkan keranjang
    function renderCart() {
        cartList.innerHTML = '';
        let total = 0;
        cart.forEach((item, index) => {
            const li = document.createElement('li');
            li.textContent = `${item.name} - Rp ${formatPrice(item.price)}`;
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Hapus';
            removeButton.onclick = () => removeFromCart(index);
            li.appendChild(removeButton);
            cartList.appendChild(li);
            total += item.price;
        });
        totalPriceElement.textContent = formatPrice(total);
    }

    // Fungsi untuk menambahkan produk ke keranjang
    function addToCart(productIndex) {
        const product = products[productIndex];
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
    }

    // Fungsi untuk menghapus produk dari keranjang
    function removeFromCart(cartIndex) {
        cart.splice(cartIndex, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
    }

    // Fungsi untuk menghapus produk dari daftar produk
    function deleteProduct(productIndex) {
        products.splice(productIndex, 1);
        localStorage.setItem('products', JSON.stringify(products));
        renderProducts();
    }

    // Fungsi untuk memformat harga dengan titik ribuan
    function formatPrice(price) {
        return price.toLocaleString('id-ID');
    }

    // Fungsi untuk menambahkan produk baru
    addProductBtn.onclick = function () {
        const name = productNameInput.value;
        const price = parseInt(productPriceInput.value);
        if (name && price) {
            products.push({ name, price });
            localStorage.setItem('products', JSON.stringify(products));
            renderProducts();
            productNameInput.value = '';
            productPriceInput.value = '';
        }
    }

    // Fungsi untuk pencarian produk
    searchInput.oninput = renderProducts;

    // Fungsi untuk proses checkout
    checkoutBtn.onclick = function () {
        const total = parseInt(totalPriceElement.textContent.replace(/\./g, ''));
        const paidAmount = parseInt(paidAmountInput.value);
        if (paidAmount >= total) {
            const change = paidAmount - total;
            printReceipt(total, paidAmount, change);
            cart = [];
            localStorage.setItem('cart', JSON.stringify(cart));
            renderCart();
            paidAmountInput.value = '';
        } else {
            alert('Uang yang dibayarkan kurang!');
        }
    }

    // Fungsi untuk mencetak nota transaksi
    function printReceipt(total, paid, change) {
        const date = new Date();
        const receipt = `
Toko Aldi Putra P
=====================
Tanggal: ${date.toLocaleString()}
---------------------
Barang:
${cart.map(item => `${item.name} - Rp ${formatPrice(item.price)}`).join('\n')}
---------------------
Total: Rp ${formatPrice(total)}
Dibayar: Rp ${formatPrice(paid)}
Kembalian: Rp ${formatPrice(change)}
=====================
Terima Kasih
        `;
        receiptOutput.textContent = receipt;
        receiptSection.style.display = 'block';
    }

    // Render data produk dan keranjang saat halaman dimuat
    renderProducts();
    renderCart();
});

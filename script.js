document.addEventListener('DOMContentLoaded', function () {
    const productNameInput = document.getElementById('productName');
    const productPriceInput = document.getElementById('productPrice');
    const addProductBtn = document.getElementById('addProductBtn');
    const productList = document.getElementById('productList');
    const cartList = document.getElementById('cartList');
    const totalPriceElement = document.getElementById('totalPrice');
    const checkoutBtn = document.getElementById('checkoutBtn');

    let products = [];
    let cart = [];

    function renderProducts() {
        productList.innerHTML = '';
        products.forEach((product, index) => {
            const li = document.createElement('li');
            li.textContent = `${product.name} - Rp ${product.price}`;
            const addButton = document.createElement('button');
            addButton.textContent = 'Tambah ke Keranjang';
            addButton.onclick = () => addToCart(index);
            li.appendChild(addButton);
            productList.appendChild(li);
        });
    }

    function renderCart() {
        cartList.innerHTML = '';
        let total = 0;
        cart.forEach((item, index) => {
            const li = document.createElement('li');
            li.textContent = `${item.name} - Rp ${item.price}`;
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Hapus';
            removeButton.onclick = () => removeFromCart(index);
            li.appendChild(removeButton);
            cartList.appendChild(li);
            total += item.price;
        });
        totalPriceElement.textContent = total;
    }

    function addToCart(productIndex) {
        const product = products[productIndex];
        cart.push(product);
        renderCart();
    }

    function removeFromCart(cartIndex) {
        cart.splice(cartIndex, 1);
        renderCart();
    }

    addProductBtn.onclick = function () {
        const name = productNameInput.value;
        const price = parseInt(productPriceInput.value);
        if (name && price) {
            products.push({ name, price });
            renderProducts();
            productNameInput.value = '';
            productPriceInput.value = '';
        }
    }

    checkoutBtn.onclick = function () {
        alert('Transaksi berhasil! Total: Rp ' + totalPriceElement.textContent);
        cart = [];
        renderCart();
    }
});

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

    let products = [];
    let cart = [];

    function renderProducts() {
        productList.innerHTML = '';
        const searchTerm = searchInput.value.toLowerCase();
        products.forEach((product, index) => {
            if (product.name.toLowerCase().includes(searchTerm)) {
                const li = document.createElement('li');
                li.textContent = `${product.name} - Rp ${product.price}`;
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

    function renderCart() {
        cartList.innerHTML = '';
        let total = 0;
        cart.forEach((item, index) => {
            const li = document.createElement('li');
            li.textContent = `${item.name} - Rp ${item.price}`;
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Hapus';
            removeButton.onclick = () => removeFromCart(index);
            li.appendChild(removeButton);
            cartList.appendChild(li);
            total += item.price;
        });
        totalPriceElement.textContent = total;
    }

    function addToCart(productIndex) {
        const product = products[productIndex];
        cart.push(product);
        renderCart();
    }

    function removeFromCart(cartIndex) {
        cart.splice(cartIndex, 1);
        renderCart();
    }

    function deleteProduct(productIndex) {
        products.splice(productIndex, 1);
        renderProducts();
    }

    addProductBtn.onclick = function () {
        const name = productNameInput.value;
        const price = parseInt(productPriceInput.value);
        if (name && price) {
            products.push({ name, price });
            renderProducts();
            productNameInput.value = '';
            productPriceInput.value = '';
        }
    }

    searchInput.oninput = renderProducts;

    checkoutBtn.onclick = function () {
        const total = parseInt(totalPriceElement.textContent);
        const paidAmount = parseInt(paidAmountInput.value);
        if (paidAmount >= total) {
            const change = paidAmount - total;
            printReceipt(total, paidAmount, change);
            cart = [];
            renderCart();
            paidAmountInput.value = '';
        } else {
            alert('Uang yang dibayarkan kurang!');
        }
    }

    function printReceipt(total, paid, change) {
        const date = new Date();
        const receipt = `
        Toko Aldi Putra P
        =====================
        Tanggal: ${date.toLocaleString()}
        ---------------------
        Barang:
        ${cart.map(item => `${item.name} - Rp ${item.price}`).join('\n')}
        ---------------------
        Total: Rp ${total}
        Dibayar: Rp ${paid}
        Kembalian: Rp ${change}
        =====================
        Terima Kasih
        `;
        receiptOutput.textContent = receipt;
        receiptSection.style.display = 'block';
    }
});

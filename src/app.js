const express = require('express')
const app = express()
const PORT = 3000;
const ProductManager = require('./productManager');
const { createFile, productsToSave, validateNumber } = require('./products');
const path = "./src/products.txt";
createFile(path);
const myProductManager = new ProductManager(path);
myProductManager.loadInitialProducts(productsToSave);

app.get('/', (req, res) => {
    res.send('Mi Tienda de Ropa - Bienvenidos')
})


app.get("/products", async (req, res) => {
    try {
        const products = await myProductManager.getProducts();
        const limit = req.query.limit;
        const isValidLimit = validateNumber(limit);
        products
            ? isValidLimit
                ? res.json(products.slice(0, limit))
                : res.json(products)
            : res.json({ error: "Productos No encontrados" });
    } catch (err) {
        console.log("getProducts", err);
    }
});


app.get("/products/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const isValidId = validateNumber(id);
        if (!isValidId) {
            res.json({ error: "id Invalido" });
            return;
        }
        const product = await myProductManager.getProductById(req.params.id);
        product
            ? res.json(product)
            : res.json({ error: "Id no encontrado" + req.params.id });
    } catch (err) {
        console.log("getProductById", err);
    }
});

try {
    app.listen(PORT, () =>
        console.log(
            `Server started on PORT ${PORT} at ${new Date().toLocaleString()}`
        )
    );
} catch (error) {
    console.log("Error al iniciar servidor", error);
}

const fs = require("fs");

class ProductManager {
    constructor(path) {
        this.path = path;
    }
    addProduct(newProduct) {
        if (
            !newProduct.title ||
            !newProduct.description ||
            !newProduct.price ||
            !newProduct.thumbnail ||
            !newProduct.code ||
            !newProduct.stock ||
            !newProduct.id

        ) {
            throw new Error("Missing fields");
        }

    }

    getProductById(id) {
        let allProductsArray = this.read(this.file);
        const product = allProductsArray.find((product) => product.id === id);
        if (!product) {
            throw new Error("Product not found by ID");
        }
        return product;
    }

    getProducts() {
        return this.read(this.file);
    }

    updateProduct(id, newProduct) {
        let allProductsArray = this.read(this.file);
        const productToUpdate = allProductsArray.find(
            (product) => product.id === id
        );
        if (!productToUpdate) {
            throw new Error("Update not found");
        }
        if (
            !newProduct.title ||
            !newProduct.description ||
            !newProduct.price ||
            !newProduct.thumbnail ||
            !newProduct.code ||
            !newProduct.stock ||
            !newProduct.id
        ) {
            throw new Error("Missing fields");
        }

        const updatedProduct = this.updateProductFields(
            productToUpdate,
            newProduct
        );
        const index = allProductsArray.indexOf(productToUpdate);
        allProductsArray[index] = updatedProduct;
        this.write(allProductsArray);

        const response = {
            message: "Product updated successfully",
            product: updatedProduct,
        };
        return response;
    }

    updateProductFields(productToUpdate, newProduct) {
        const updatedProduct = {
            ...productToUpdate,
            ...newProduct,
        };
        return updatedProduct;
    }

    deleteProductById(id) {
        const allProductsArray = this.read(this.file);
        const product = allProductsArray.find((product) => product.id === id);
        if (!product) {
            throw new Error("Product not deleted");
        }
        const index = allProductsArray.indexOf(product);
        allProductsArray.splice(index, 1);
        this.write(allProductsArray);
        const response = {
            message: "Product deleted successfully",
            product: product,
        };
        return response;
    }

    deleteAllProducts() {
        const allProductsArray = this.read(this.file);
        allProductsArray.splice(0, allProductsArray.length);
        this.write(allProductsArray);
    }

    read() {
        let allProductsArray = [];
        try {
            let allProductsString = fs.readFileSync(this.path, "utf8");
            allProductsString.length > 0
                ? (allProductsArray = JSON.parse(allProductsString))
                : (allProductsArray = []);
        } catch (err) {
            console.log("Read failure", err);
        }
        return allProductsArray;
    }

    write(allProductsArray) {
        let allProductsString = JSON.stringify(allProductsArray, null, 2);
        try {
            fs.writeFileSync(this.path, allProductsString);
        } catch (err) {
            console.log("Write error", err);
        }
    }

    async loadInitialProducts(products) {
        await this.write(products);
    }

    async getProducts() {
        return await this.read(this.file);
    }

    async getProductById(id) {
        let allProductsArray = await this.read(this.file);
        const product = allProductsArray.find((product) => product.id == id);
        return product;
    }

    async read() {
        let allProductsArray = [];
        try {
            let allProductsString = await fs.promises.readFile(this.path, "utf-8");
            allProductsString.length > 0
                ? (allProductsArray = JSON.parse(allProductsString))
                : (allProductsArray = []);
        } catch (err) {
            console.log("Error en la lectura del archivo", err);
        }
        return allProductsArray;
    }

    async write(allProductsArray) {
        let allProductsString = JSON.stringify(allProductsArray, null, 2);
        try {
            await fs.promises.writeFile(this.path, allProductsString);
        } catch (err) {
            console.log("Error en la escritura", err);
        }
    }
}

module.exports = ProductManager;
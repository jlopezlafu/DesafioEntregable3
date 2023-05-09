const express = require("express");
const app = express();
const PORT = 8080
const pdctRouter = require("./src/routes/products.routes.js");
const cartRouter = require("./src/routes/cart.routes.js");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

apiRouter.use("/products", pdctRouter)
apiRouter.use("/carts", cartRouter)

try {
    app.listen(PORT, () =>
        console.log(
            `🚀 Server started on PORT ${PORT} at ${new Date().toLocaleString()}`
        )
    );
} catch (error) {
    console.log("Error al iniciar servidor", error);
}

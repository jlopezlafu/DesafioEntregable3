const express = require("express");
const app = express();
const PORT = 8080 || process.env.PORT;
const pdctRouter = require("../src/routes/products.routes");
const cartRouter = require("../src/routes/cart.routes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/api/products", pdctRouter);
app.use("/api/carts", cartRouter);

app.get("/", (req, res) => {
    res.send("<h1>PreEntrega! 1</h1>");
});
try {
    app.listen(PORT, () =>
        console.log(
            `🚀 Server started on PORT ${PORT} at ${new Date().toLocaleString()}`
        )
    );
} catch (error) {
    console.log("Error al iniciar servidor", error);
}





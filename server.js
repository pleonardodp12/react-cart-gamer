import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import shortid from 'shortid';

const app = express();
app.use(bodyParser);

mongoose.connect("mongodb://localhost/react-cart-gamer-db", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const Product = mongoose.model("products", new mongoose.Schema({
  _id: { type: shortid.generate },
  name: String,
  image: String,
  price: Number,
  brand: String,
  rating: Number,
  numReviews: Number,

}))

app.get("/api/products", async (req, res) => {
  const products = await Product.find({});
  res.send(products);
});

app.post("/api/products", async (req, res) =>{
  const newProducts = new Product(req.body);
  const savedProduct = await newProducts.save();
  res.send(savedProduct);
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(" server rodando em http://localhost:5000"))
const Product = require("../models/productModel");
const { getPostData } = require("../utils");

async function getProducts(_, res) {
  try {
    const products = await Product.findAll();

    if (products) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify(products));
    } else {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Product not found" }));
    }
  } catch (error) {
    console.log(error);
  }
}

async function getProduct(_, res, id) {
  try {
    const product = await Product.findById(id);
    if (product) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify(product));
    } else {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Product not found" }));
    }
  } catch (error) {
    console.log(error);
  }
}

async function createProduct(req, res) {
  try {
    const { title, description, price } = await getPostData(req);
    const obj = {
      title,
      description,
      price,
    };
    const product = await Product.create(obj);
    if (product) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify(product));
    }
  } catch (error) {
    console.log(error);
  }
}
async function updateProduct(req, res, id) {
  try {
    const product = await Product.findById(id);
    if (product) {
      const { title, description, price } = await getPostData(req);
      const obj = {
        title: title || product.title,
        description: description || product.description,
        price: price || product.price,
      };
      const updProduct = await Product.update(id, obj);

      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify(updProduct));
    } else {
      res.writeHead(401, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ Message: "Product not found" }));
    }
  } catch (error) {
    console.log(error);
  }
}

async function deleteProduct(_, res, id) {
  try {
    const product = await Product.findById(id);
    if (product) {
      await Product.remove(id);
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ Message: "Product deleted" }));
    } else {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ Message: "Product not found" }));
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};

const { v1: uuidv1 } = require("uuid");

let products = require("../data/products");
const { writeDataToFile } = require("../utils");

function findAll() {
  return new Promise((resolve, _) => {
    resolve(products);
  });
}

function findById(id) {
  return new Promise((resolve, _) => {
    const product = products.find((p) => p.id === id);
    resolve(product);
  });
}

function create(product) {
  return new Promise((resolve, _) => {
    const newProduct = { id: uuidv1(), ...product };
    products.push(newProduct);
    writeDataToFile("./data/products.json", products);
    resolve(newProduct);
  });
}
function update(id, product) {
  return new Promise((resolve, _) => {
    const productIndex = products.findIndex((p) => p.id === id);
    products[productIndex] = { id, ...product };
    writeDataToFile("./data/products.json", products);
    resolve(products[productIndex]);
  });
}

function remove(id) {
  return new Promise((resolve, reject) => {
    products = products.filter((p) => p.id !== id);
    writeDataToFile("./data/products.json", products);
    resolve();
  });
}

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove,
};

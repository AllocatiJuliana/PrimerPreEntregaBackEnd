import fs from "fs/promises";
import { Cart } from "./src/entity/Cart.js";

export class CartManager {
  constructor() {
    this.path = "./src/db/carts.json";
    this.carts = [];
  }

  async createCart() {
    //Leer el JSON
    const json = await fs.readFile(this.path, "utf-8");
    this.carts = JSON.parse(json);

    const newCart = new Cart();
    this.carts.push(newCart);

    //Escribir

    await fs.writeFile(this.path, JSON.stringify(this.carts));

    return newCart;
  }

  async addProduct(idcart, idproduct) {
    //Leer el JSON
    const json = await fs.readFile(this.path, "utf-8");
    this.carts = JSON.parse(json);
    const result = this.carts.findIndex((cart) => cart.id === idcart);
    if (result === -1) {
      return "El carrito no existe";
    }

    const productoRepetido = this.carts[result].products.findIndex(
      (product) => product.idproduct === idproduct
    );

    if (productoRepetido === -1) {
      this.carts[result].products.push({
        idproduct: idproduct,
        quantity: 1,
      });
    } else {
      this.carts[result].products[productoRepetido].quantity++;
    }

    //Escribir
    await fs.writeFile(this.path, JSON.stringify(this.carts));

    return "El producto se agrego correctamente";
  }

  async getCart(idcarrito) {
    const json = await fs.readFile(this.path, "utf-8");
    this.carts = JSON.parse(json);

    const result = this.carts.find((cart) => cart.id === idcarrito);
    if (result === undefined) {
      return "El carrino no existe";
    }
    return result;
  }
}

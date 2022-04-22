const fs = require('fs');

class Cart {
  constructor(file) {
    this.file = file;
  }

  async addCart(product) {
    try {
      // Create fil if not exists
      if (!fs.existsSync(this.file)) {
        await fs.promises.writeFile(this.file, '[]', 'utf-8');
      }
      const content = await fs.promises.readFile(this.file, 'utf-8');
      const json = JSON.parse(content);
      let id = (json.length === 0) ? 1 : json.at(-1).id + 1;
      const cart = {
        id: id,
        timestamp: Date.now(),
        products: [product]
      };
      json.push(cart);
      // write file
      await fs.promises.writeFile(this.file, JSON.stringify(json, null, 2));
      return id;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async deleteCartItem(id) {
    try {
      const contenido = await fs.promises.readFile(this.file, 'utf-8');
      const json = JSON.parse(contenido);
      const index = json.findIndex(el => {
        return el.id === Number(id);
      });
      // Validate 
      if (index === -1) {
        throw new Error('Id no encontrado');
      }
      json.splice(index, 1);
      await fs.promises.writeFile(this.file, JSON.stringify(json, null, 2));
    } catch (error) {
      console.log(error);
    }
  }

  async getProductsByCartId(id) {
    try {
      const contenido = await fs.promises.readFile(this.file, 'utf-8');
      const json = JSON.parse(contenido);
      const index = json.findIndex(el => {
        return el.id === Number(id);
      });
      // Validate 
      if (index === -1) {
        throw new Error('Id no encontrado');
      }
      const items = json.splice(index, 1);
      return items[0].products;
    } catch (error) {
      console.log(error);
    }
  }

  async addProductsToCartById(id, product) {
    const contenido = await fs.promises.readFile(this.file, 'utf-8');
    const json = JSON.parse(contenido);
    
    const index = json.findIndex(el => {
      return el.id === Number(id);
    });
    // Validate 
    if (index === -1) {
      throw new Error('Id no encontrado');
    }
    const items = json.splice(index, 1);
    items[0].products.push(product);
    json.push(items[0]);
    await fs.promises.writeFile(this.file, JSON.stringify(json, null, 2));
  }

  async deleteProductById(cartId, productId) {
    const contenido = await fs.promises.readFile(this.file, 'utf-8');
    const json = JSON.parse(contenido);
    
    const index = json.findIndex(el => {
      return el.id === Number(cartId);
    });
    // Validate 
    if (index === -1) {
      throw new Error('Id no encontrado');
    }
    const items = json.splice(index, 1);

    const productIndex = items[0].products.findIndex(el => {
      return el.id === Number(productId);
    });
    items[0].products.splice(productIndex, 1);
    json.push(items[0]);
    await fs.promises.writeFile(this.file, JSON.stringify(json, null, 2));
  }

}

module.exports = Cart;
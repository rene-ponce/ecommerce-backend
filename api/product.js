const fs = require('fs');
class Product {
  constructor(file) {
    this.file = file;
    this.products = [];
  }

  async getAllProducts(id) {
    try {
      if (id !== undefined) {
        return this.getById(id).then(product => {
          return product
        }).catch(error => console.log(error));
      }
      this.products = await fs.promises.readFile(this.file, 'utf-8');
      return JSON.parse(this.products);
    } catch (error) {
      return error;
    }
  }

  async addProduct(data) {
    try {
      // Create fil if not exists
      if (!fs.existsSync(this.file)) {
        await fs.promises.writeFile(this.file, '[]', 'utf-8');
      }
      const content = await fs.promises.readFile(this.file, 'utf-8');
      const json = JSON.parse(content);
      let id = (json.length === 0) ? 1 : json.at(-1).id + 1;
      data.id = id;
      data.timestamp = Date.now();
      json.push(data);
      // write file
      await fs.promises.writeFile(this.file, JSON.stringify(json, null, 2));
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async updateProduct(id, product) {
    const { nombre, descripcion, codigo, foto, precio, stock } = product;
    const contenido = await fs.promises.readFile(this.file, 'utf-8');
    const json = JSON.parse(contenido);
    const index = json.findIndex(el => {
      return el.id === Number(id);
    });
    if (index === -1) {
      return {error: 'Producto no encontrado'};
    }
    // Update product
    json[index].nombre = nombre;
    json[index].descripcion = descripcion;
    json[index].codigo = codigo;
    json[index].foto = foto;
    json[index].precio = precio;
    json[index].stock = stock;
    await fs.promises.writeFile(this.file, JSON.stringify(json, null, 2));
  }

  async deleteProduct(id) {
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

  async getById(id) {
    try {
      const contenido = await fs.promises.readFile(this.file, 'utf-8');
      const json = JSON.parse(contenido);
      const index = json.findIndex(el => {
        return el.id === Number(id);
      });
      // If index not found return null
      if (index === -1) {
        return null;
      }
      const item = json.splice(index, 1);
      return item;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = Product;
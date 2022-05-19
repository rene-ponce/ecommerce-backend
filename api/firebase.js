const admin = require('firebase-admin');
const key = require('../config/ecommerce-backend-b7c07-firebase-adminsdk-h38o2-4465b8a5d8.json');
const {firebase} = require("../config/config");

class Firebase {
  constructor(collection) {
    this.initializeFirebase();
    this.db = admin.firestore();
    this.query = this.db.collection(collection);
  }
  
  initializeFirebase() {
    admin.initializeApp({
      credential: admin.credential.cert(key),
      databaseURL: firebase.url
    })
  }
  
  async getAll() {
    try {
      const querySnapshot = await this.query.get();
      return querySnapshot.docs;
    } catch (e) {
      console.log(e);
    }
  }
  
  async getById(id) {
    try {
      const doc = this.query.doc(`${id}`);
      const item = await doc.get();
      return item.data();
    } catch (e) {
      console.log(e);
    }
  }
  
  async create(data) {
    try {
      let doc = this.query.doc();
      await doc.create(data);
      return 'Datos insertados correctamente';
    } catch (e) {
      console.log(e);
    }
  }
  
  async update(data, id) {
    try {
      const doc = this.query.doc(`${id}`);
      await doc.update(data);
      return 'Informacion actualizada';
    } catch (e) {
      console.log(e)
    }
  }
  
  async delete(id) {
    try {
      const doc = this.query.doc(`${id}`);
      await doc.delete();
      return 'Elemento eliminado';
    } catch (e) {
      console.log(e);
    }
  }
}
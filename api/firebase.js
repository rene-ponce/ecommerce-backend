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
    } catch (error) {
      console.log(error);
    }
  }
  
  getById(id) {
  
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
}
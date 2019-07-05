import Schema from './schema.js'

const Products = new Mongo.Collection('products');

Products.attachSchema(Schema);

export default Products;

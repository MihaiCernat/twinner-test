import Schema from './schema.js'

const Customers = new Mongo.Collection('customers');

Customers.attachSchema(Schema);

export default Customers;

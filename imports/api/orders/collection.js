import Schema from './schema.js'

const Orders = new Mongo.Collection('orders');

Orders.attachSchema(Schema);

export default Orders;

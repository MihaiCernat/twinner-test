import Customers from "/imports/api/customers/collection.js";
import Products from "/imports/api/products/collection.js";
import Orders from '../collection';

Orders.addLinks({
    customer: {
        collection: Customers,
        field: "customerId"
    },
    product: {
        collection: Products,
        field: "productId"
    }
});
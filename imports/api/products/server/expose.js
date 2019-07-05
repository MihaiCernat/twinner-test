import productsListQuery from "../queries/products.query.js";
import productsForOrdersQuery from "../queries/productsForOrders.query.js";
import Products from "../collection.js";

Products.expose({});

productsListQuery.expose({});
productsForOrdersQuery.expose({});

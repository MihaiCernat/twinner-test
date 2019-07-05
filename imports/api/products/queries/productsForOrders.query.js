import Products from "../collection.js";

export default Products.createQuery("productsForOrdersList", {
    $paginate: true,
    $filter({filters, options, params}) {},
    name: 1,
    price: 1
});

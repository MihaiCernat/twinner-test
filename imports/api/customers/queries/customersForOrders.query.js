import Customers from "../collection.js";

export default Customers.createQuery("customersForOrdersList", {
    $paginate: true,
    $filter({filters, options, params}) {},
    name: 1
});

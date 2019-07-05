import Customers from "../collection.js";

export default Customers.createQuery("customerList", {
    $paginate: true,
    $filter({filters, options, params}) {
        if (params.name) {
            filters.name = {
                "$regex" : params.name,
                "$options" : "i"
            };
        }

        if (params.email) {
            filters.email = {
                "$regex" : params.email,
                "$options" : "i"
            };
        }

        if (params.domain) {
            filters.domain = {
                "$regex" : params.domain,
                "$options" : "i"
            };
        }
    },
    name: 1,
    email: 1,
    domain: 1,
    address: 1,
    phoneNumber: 1
});

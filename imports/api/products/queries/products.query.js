import Products from "../collection.js";

export default Products.createQuery("productList", {
    $paginate: true,
    $filter({filters, options, params}) {
        if (params.name) {
            filters.name = {
                "$regex" : params.name,
                "$options" : "i"
            };
        }

        if (params.category) {
            filters.category = {
                "$regex" : params.category,
                "$options" : "i"
            };
        }
    },
    name: 1,
    category: 1,
    price: 1
});

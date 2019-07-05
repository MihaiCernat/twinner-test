import Orders from "../collection.js";

export default Orders.createQuery("ordersList", {
    $paginate: true,
    $filter({filters, options, params}) {
        if (params.customerIds && params.customerIds.length) {
            filters.customerId = {
                $in: params.customerIds
            }
        }

        if (params.productIds && params.productIds.length) {
            filters.productId = {
                $in: params.productIds
            }
        }
    },
    customer: {
        name: 1
    },
    product:  {
        name: 1,
        price: 1
    },
    units: 1,
    totalPrice: 1
});

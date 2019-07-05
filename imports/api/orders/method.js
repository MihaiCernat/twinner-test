import Orders from "./collection.js";
import orderSchema from "./schema.js";
import SimpleSchema from 'simpl-schema';

const createOrder = new ValidatedMethod({
    name: 'createOrder',
    validate: orderSchema.validator(),
    run(params) {

        if (Meteor.isServer) {
            return Orders.insert(params)
        }

    }
});

const updateOrder = new ValidatedMethod({
    name: 'updateOrder',
    validate: new SimpleSchema({
        _id: {
            type: String,
            optional: false
        },
        customerId: {
            type: String,
            optional: false
        },
        productId: {
            type: String,
            optional: false
        },
        units: {
            type: Number,
            optional: false
        }
    }).validator(),
    run(params) {

        if (Meteor.isServer) {
            return Orders.update({_id: params._id}, {
                $set: params
            });
        }

    }
});

const removeOrder = new ValidatedMethod({
    name: 'removeOrder',
    validate: new SimpleSchema({
        _id: {
            type: String,
            optional: false
        }
    }).validator(),
    run(params) {

        if (Meteor.isServer) {
            return Orders.remove({_id: params._id});
        }

    }
});

export {
    createOrder,
    updateOrder,
    removeOrder
};


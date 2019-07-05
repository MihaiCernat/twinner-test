import Customers from "./collection.js";
import customerSchema from "./schema.js";
import SimpleSchema from 'simpl-schema';

const createCustomer = new ValidatedMethod({
    name: 'createCustomer',
    validate: customerSchema.validator(),
    run(params) {

        if (Meteor.isServer) {
            return Customers.insert(params)
        }

    }
});

const updateCustomer = new ValidatedMethod({
    name: 'updateCustomer',
    validate: new SimpleSchema({
        _id: {
            type: String,
            optional: false
        },
        name: {
            type: String,
            optional: false
        },
        email: {
            type: String,
            optional: false
        },
        domain: {
            type: String,
            optional: true
        },
        address: {
            type: String,
            optional: true
        },
        phoneNumber: {
            type: String,
            optional: true
        }
    }).validator(),
    run(params) {

        if (Meteor.isServer) {
            return Customers.update({_id: params._id}, {
                $set: params
            });
        }

    }
});

const removeCustomer = new ValidatedMethod({
    name: 'removeCustomer',
    validate: new SimpleSchema({
        _id: {
            type: String,
            optional: false
        }
    }).validator(),
    run(params) {

        if (Meteor.isServer) {
            return Customers.remove({_id: params._id});
        }

    }
});

export {
    createCustomer,
    updateCustomer,
    removeCustomer
};


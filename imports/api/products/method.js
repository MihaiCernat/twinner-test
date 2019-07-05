import Products from "./collection.js";
import productsSchema from "./schema.js";
import SimpleSchema from 'simpl-schema';

const createProduct = new ValidatedMethod({
    name: 'createProduct',
    validate: productsSchema.validator(),
    run(params) {

        if (Meteor.isServer) {
            return Products.insert(params)
        }

    }
});

const updateProduct = new ValidatedMethod({
    name: 'updateProduct',
    validate: new SimpleSchema({
        _id: {
            type: String,
            optional: false
        },
        name: {
            type: String,
            optional: false
        },
        category: {
            type: String,
            optional: true
        },
        price: {
            type: Number,
            optional: false
        }
    }).validator(),
    run(params) {

        if (Meteor.isServer) {
            return Products.update({_id: params._id}, {
                $set: params
            });
        }

    }
});

const removeProduct = new ValidatedMethod({
    name: 'removeProduct',
    validate: new SimpleSchema({
        _id: {
            type: String,
            optional: false
        }
    }).validator(),
    run(params) {

        if (Meteor.isServer) {
            return Products.remove({_id: params._id});
        }

    }
});

export {
    createProduct,
    updateProduct,
    removeProduct
};


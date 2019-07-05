import SimpleSchema from 'simpl-schema';

export default new SimpleSchema({
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
});
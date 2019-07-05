import SimpleSchema from 'simpl-schema';

export default new SimpleSchema({
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
});

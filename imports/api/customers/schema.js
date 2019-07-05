import SimpleSchema from 'simpl-schema';

export default new SimpleSchema({
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
});
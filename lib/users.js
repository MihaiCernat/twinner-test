// Deny all client-side updates to user documents
Meteor.users.deny({
    update: function() { return true; },
    remove: function() { return true; }
});
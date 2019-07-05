import {ViewModel} from "meteor/manuel:viewmodel";
import "./home.jade";
import "./home.less";
import "./components/customers.js";
import "./components/products.js";
import "./components/orders.js";
import {FlowRouter} from 'meteor/ostrio:flow-router-extra';

Template.home.viewmodel({
    persist: false,
    email: "",
    password: "",
    currentView: "customers",

    currentUserEmail() {
        const user = Meteor.user();
        return user && user.emails[0].address;
    },

    changeView(view) {
        if (view !== this.currentView()) {
            this.currentView(view);
        }
    },

    isCurrentView(view) {
        return this.currentView() === view;
    },

    logout() {
        Accounts.logout((err) => {
            if (!err) {
                FlowRouter.go("login");
            }
        })
    }
});
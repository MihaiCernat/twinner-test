import {ViewModel} from "meteor/manuel:viewmodel";
import "./login.jade";
import {FlowRouter} from 'meteor/ostrio:flow-router-extra';

Template.login.viewmodel({
    persist: false,
    email: "",
    password: "",

    isFormValid() {
        const email = this.email();
        const password = this.password();

        const emailAdjusted = email && email.trim().toLowerCase();
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let valid = re.test(emailAdjusted);

        return valid && password && password.length > 6;
    },

    handleSubmit() {
        const email = this.email();
        const password = this.password();

        Meteor.loginWithPassword(email, password, (err) => {
            if (!err) {
                FlowRouter.go("home");
            }
        })
    }
});
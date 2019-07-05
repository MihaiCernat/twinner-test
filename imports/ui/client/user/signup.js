import {ViewModel} from "meteor/manuel:viewmodel";
import "./signup.jade";
import {FlowRouter} from 'meteor/ostrio:flow-router-extra';

Template.signup.viewmodel({
    persist: false,
    email: "",
    password: "",
    passwordRepeat: "",

    isFormValid() {
        const email = this.email();
        const password = this.password();
        const passwordRepeat = this.passwordRepeat();

        const emailAdjusted = email && email.trim().toLowerCase();
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let valid = re.test(emailAdjusted);
        
        if (valid && password && passwordRepeat) {
            valid = password.length > 6 && password === passwordRepeat;
        } else  {
            valid = false;
        }

        return valid;
    },

    handleSubmit() {
        const email = this.email().trim().toLowerCase();
        const password = this.password();

        Accounts.createUser({
            email,
            password
        }, (err) => {
            console.log(err);
            if (!err) {
                FlowRouter.go("home");
            }
        })
    }
});
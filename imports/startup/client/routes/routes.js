import {FlowRouter} from 'meteor/ostrio:flow-router-extra';
import "/imports/ui/client/user/login.js";
import "/imports/ui/client/user/signup.js";
import "/imports/ui/client/home/home.js";

import {Meteor} from 'meteor/meteor';

const requireLogin = (cb) => {
    if (Meteor.user() || Accounts.loggingIn()) {
        cb();
    } else {
        FlowRouter.go("login")
    }
}

//
// HOME
//

FlowRouter.route('/', {
    name: "home",
    action() {
        requireLogin(() => this.render("home"));
    }

});

//
// LOGIN
//

FlowRouter.route('/login', {
    name: "login",
    action() {
        this.render("login");
    }

});

//
// SIGNUP
//

FlowRouter.route('/signup', {
    name: "signup",
    action() {
        this.render("signup");
    }

});


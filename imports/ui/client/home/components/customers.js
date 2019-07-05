import {ViewModel} from "meteor/manuel:viewmodel";
import "./customers.jade";
import { createCustomer, updateCustomer, removeCustomer } from "/imports/api/customers/method.js";
import customerListQuery from "/imports/api/customers/queries/customers.query.js";

Template.customers.viewmodel({
    persist: false,
    name: "",
    email: "",
    domain: "",
    address: "",
    phoneNumber: "",
    nameSearch: "",
    emailSearch: "",
    domainSearch: "",
    customers: [],
    currentPage: 1,
    perPage: 5,
    totalCustomers: 0,
    editingCustomerId: false,

    onRendered() {
        this.runQuery();
    },

    runQuery() {
        const perPage = this.perPage();
        const page = this.currentPage();

        customerListQuery.clone({
            name: this.nameSearch(),
            email: this.emailSearch(),
            domain: this.domainSearch()
        }).getCount((err, res) => {
            if (!err) {
                this.totalCustomers(res);
            }
        });

        customerListQuery.clone({
            name: this.nameSearch(),
            email: this.emailSearch(),
            domain: this.domainSearch(),
            limit: perPage,
            skip: (page - 1) * perPage
        }).fetch((err, res) => {
            if (!err) {
                this.customers(res);
            }
        });
    },

    search() {
        this.currentPage(1);
        this.runQuery();
    },

    moreThanOnePages() {
        return this.totalCustomers() > this.perPage();
    },

    isBackAvailable() {
        return this.currentPage() > 1;
    },

    goBack() {
        this.currentPage(this.currentPage() - 1);
        this.runQuery();
    },

    isForwardAvailable() {
        return this.totalCustomers() / this.perPage() > this.currentPage();
    },

    goForward() {
        this.currentPage(this.currentPage() + 1);
        this.runQuery();
    },

    getPageText() {
        return `Page ${this.currentPage()} of ${Math.ceil(this.totalCustomers() / this.perPage())}`;
    },

    isFormValid() {
        const email = this.email();
        const name = this.name().trim();

        const emailAdjusted = email && email.trim().toLowerCase();
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const valid = re.test(emailAdjusted);

        return valid && name.length;
    },

    clearFields() {
        this.name("");
        this.email("");
        this.domain("");
        this.address("");
        this.phoneNumber("");
        this.editingCustomerId(false);
    },

    getFormFields() {
        return {
            name : this.name().trim(),
            email : this.email().trim().toLowerCase(),
            domain : this.domain(),
            address : this.address(),
            phoneNumber : this.phoneNumber()
        }
    },

    createCustomer() {
        const formFields = this.getFormFields();

        createCustomer.call(formFields, (err) => {
            if (!err) {
                this.clearFields();
                this.runQuery();
            }
        })
    },

    startEditing(customer) {
        this.editingCustomerId(customer._id);
        customer.name && this.name(customer.name);
        customer.email && this.email(customer.email);
        customer.domain && this.domain(customer.domain);
        customer.address && this.address(customer.address);
        customer.phoneNumber && this.phoneNumber(customer.phoneNumber);
    },

    editCustomer() {
        const formFields = this.getFormFields();
        formFields._id = this.editingCustomerId();

        updateCustomer.call(formFields, (err, res) => {
            if (!err) {
                this.clearFields();
                this.runQuery();
            }
        })
    },

    remove(id) {
        removeCustomer.call({
            _id: id
        }, (err, res) => {
            if (!err) {
                this.currentPage(1);
                this.runQuery();
            }
        })
    }
});
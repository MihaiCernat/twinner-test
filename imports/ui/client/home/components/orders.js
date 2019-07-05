import {ViewModel} from "meteor/manuel:viewmodel";
import "./orders.jade";
import { createOrder, updateOrder, removeOrder } from "/imports/api/orders/method.js";
import orderListQuery from "/imports/api/orders/queries/orders.query.js";
import customerForOrdersQuery from "/imports/api/customers/queries/customersForOrders.query.js";
import productsForOrdersQuery from "/imports/api/products/queries/productsForOrders.query.js";

Template.orders.viewmodel({
    persist: false,
    customerId: "",
    productId: "",
    units: "",
    customerSearch: "",
    productSearch: "",
    orders: [],
    currentPage: 1,
    perPage: 5,
    totalOrders: 0,
    editingOrderId: false,
    customers: [],
    products: [],
    customerIdsToSearch: [],
    productIdsToSearch: [],

    onRendered() {
        this.runQuery();

        customerForOrdersQuery.clone({}).fetch((err, res) => {
            if (!err) {
                this.customers(res);
            }
        });

        productsForOrdersQuery.clone({}).fetch((err, res) => {
            if (!err) {
                this.products(res);
            }
        })
    },

    runQuery() {
        const perPage = this.perPage();
        const page = this.currentPage();

        orderListQuery.clone({}).getCount((err, res) => {
            if (!err) {
                this.totalOrders(res);
            }
        });

        orderListQuery.clone({
            productIds: this.productIdsToSearch(),
            customerIds: this.customerIdsToSearch(),
            limit: perPage,
            skip: (page - 1) * perPage
        }).fetch((err, res) => {
            if (!err) {
                this.orders(res);
            }
        });
    },

    getAttribute(order, collection, attribute) {
        return order[collection] && order[collection][attribute];
    },

    search() {
        this.currentPage(1);

        const customerSearch = this.customerSearch();
        const customerIds = this.customers().filter((customer) => {
            return customer.name.includes(customerSearch);
        }).map((customer) => {
            return customer._id;
        });
        this.customerIdsToSearch(customerIds);

        const productSearch = this.productSearch();
        const productIds = this.products().filter((product) => {
            return product.name.includes(productSearch);
        }).map((product) => {
            return product._id;
        });
        this.productIdsToSearch(productIds);

        this.runQuery();
    },

    moreThanOnePages() {
        return this.totalOrders() > this.perPage();
    },

    isBackAvailable() {
        return this.currentPage() > 1;
    },

    goBack() {
        this.currentPage(this.currentPage() - 1);
        this.runQuery();
    },

    isForwardAvailable() {
        return this.totalOrders() / this.perPage() > this.currentPage();
    },

    goForward() {
        this.currentPage(this.currentPage() + 1);
        this.runQuery();
    },

    getPageText() {
        return `Page ${this.currentPage()} of ${Math.ceil(this.totalOrders() / this.perPage())}`;
    },

    isFormValid() {
        const customerId = this.customerId();
        const productId = this.productId();
        const units = this.units();

        return customerId && productId && units;
    },

    clearFields() {
        this.customerId("");
        this.productId("");
        this.units("");
        this.editingOrderId(false);
    },

    getTotalPrice(order) {
        return order.product && order.units * order.product.price;
    },

    getFormFields() {
        return {
            customerId : this.customerId(),
            productId : this.productId(),
            units : Number(this.units())
        }
    },

    createOrder() {
        const formFields = this.getFormFields();

        createOrder.call(formFields, (err) => {
            console.log(err);
            if (!err) {
                this.clearFields();
                this.runQuery();
            }
        })
    },

    startEditing(order) {
        this.editingOrderId(order._id);
        order.customer && this.customerId(order.customer._id);
        order.product && this.productId(order.product._id);
        order.units && this.units(order.units);
    },

    editOrder() {
        const formFields = this.getFormFields();
        formFields._id = this.editingOrderId();

        updateOrder.call(formFields, (err) => {
            console.log(err);
            if (!err) {
                this.clearFields();
                this.runQuery();
            }
        })
    },

    remove(id) {
        removeOrder.call({
            _id: id
        }, (err) => {
            if (!err) {
                this.currentPage(1);
                this.runQuery();
            }
        })
    },

    createCustomer() {
        this.parent().currentView("customers");
    },

    createProduct() {
        this.parent().currentView("products");
    }
});

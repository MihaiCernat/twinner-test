import {ViewModel} from "meteor/manuel:viewmodel";
import "./products.jade";
import { createProduct, updateProduct, removeProduct } from "/imports/api/products/method.js";
import productListQuery from "/imports/api/products/queries/products.query.js";

Template.products.viewmodel({
    persist: false,
    name: "",
    category: "",
    price: "",
    nameSearch: "",
    categorySearch: "",
    products: [],
    currentPage: 1,
    perPage: 5,
    totalProducts: 0,
    editingProductId: false,

    onRendered() {
        this.runQuery();
    },

    runQuery() {
        const perPage = this.perPage();
        const page = this.currentPage();

        productListQuery.clone({
            name: this.nameSearch(),
            category: this.categorySearch()
        }).getCount((err, res) => {
            if (!err) {
                this.totalProducts(res);
            }
        });

        productListQuery.clone({
            name: this.nameSearch(),
            category: this.categorySearch(),
            limit: perPage,
            skip: (page - 1) * perPage
        }).fetch((err, res) => {
            if (!err) {
                this.products(res);
            }
        });
    },

    search() {
        this.currentPage(1);
        this.runQuery();
    },

    moreThanOnePages() {
        return this.totalProducts() > this.perPage();
    },

    isBackAvailable() {
        return this.currentPage() > 1;
    },

    goBack() {
        this.currentPage(this.currentPage() - 1);
        this.runQuery();
    },

    isForwardAvailable() {
        return this.totalProducts() / this.perPage() > this.currentPage();
    },

    goForward() {
        this.currentPage(this.currentPage() + 1);
        this.runQuery();
    },

    getPageText() {
        return `Page ${this.currentPage()} of ${Math.ceil(this.totalProducts() / this.perPage())}`;
    },

    isFormValid() {
        const name = this.name().trim();
        const price = this.price();

        return name.length && price;
    },

    clearFields() {
        this.name("");
        this.category("");
        this.price("");
        this.editingProductId(false);
    },

    getFormFields() {
        return {
            name : this.name().trim(),
            category : this.category(),
            price: Number(this.price())
        }
    },

    createProduct() {
        const formFields = this.getFormFields();

        createProduct.call(formFields, (err) => {
            if (!err) {
                this.clearFields();
                this.runQuery();
            }
        })
    },

    startEditing(product) {
        this.editingProductId(product._id);
        product.name && this.name(product.name);
        product.category && this.category(product.category);
        product.price && this.price(product.price);
    },

    editProduct() {
        const formFields = this.getFormFields();
        formFields._id = this.editingProductId();

        updateProduct.call(formFields, (err) => {
            if (!err) {
                this.clearFields();
                this.runQuery();
            }
        })
    },

    remove(id) {
        removeProduct.call({
            _id: id
        }, (err) => {
            if (!err) {
                this.currentPage(1);
                this.runQuery();
            }
        })
    }
});
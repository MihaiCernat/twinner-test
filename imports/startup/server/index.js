// Import server startup through a single index entry point

import { Meteor } from "meteor/meteor";

console.log("server startup");

import "/imports/api/customers/server/index.js";
import "/imports/api/customers/method.js";
import "/imports/api/products/server/index.js";
import "/imports/api/products/method.js";
import "/imports/api/orders/server/index.js";
import "/imports/api/orders/method.js";

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStoreId = exports.tenantLocalStorage = void 0;
const async_hooks_1 = require("async_hooks");
exports.tenantLocalStorage = new async_hooks_1.AsyncLocalStorage();
const getStoreId = () => {
    return exports.tenantLocalStorage.getStore()?.storeId;
};
exports.getStoreId = getStoreId;

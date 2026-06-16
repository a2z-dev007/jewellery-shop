"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storeController = exports.StoreController = void 0;
const BaseController_1 = require("../../../shared/utils/BaseController");
const storeService_1 = require("../services/storeService");
const asyncErrorWrapper_1 = require("../../../shared/utils/asyncErrorWrapper");
class StoreController extends BaseController_1.BaseController {
    service;
    constructor(service) {
        super();
        this.service = service;
    }
    create = (0, asyncErrorWrapper_1.asyncErrorWrapper)(async (req, res) => {
        try {
            const store = await this.service.createStore(req.body);
            this.handleSuccess(res, store, 'Store created successfully', 201);
        }
        catch (error) {
            this.handleError(error, res, 'create');
        }
    });
    get = (0, asyncErrorWrapper_1.asyncErrorWrapper)(async (req, res) => {
        try {
            const store = await this.service.getStoreById(req.params.id);
            this.handleSuccess(res, store);
        }
        catch (error) {
            this.handleError(error, res, 'get');
        }
    });
    update = (0, asyncErrorWrapper_1.asyncErrorWrapper)(async (req, res) => {
        try {
            const store = await this.service.updateStore(req.params.id, req.body);
            this.handleSuccess(res, store, 'Store updated successfully');
        }
        catch (error) {
            this.handleError(error, res, 'update');
        }
    });
    delete = (0, asyncErrorWrapper_1.asyncErrorWrapper)(async (req, res) => {
        try {
            await this.service.deleteStore(req.params.id);
            this.handleSuccess(res, null, 'Store deleted successfully');
        }
        catch (error) {
            this.handleError(error, res, 'delete');
        }
    });
    list = (0, asyncErrorWrapper_1.asyncErrorWrapper)(async (req, res) => {
        try {
            const page = parseInt(req.query.page || '1', 10);
            const limit = parseInt(req.query.limit || '20', 10);
            const result = await this.service.listStores(page, limit);
            this.handleSuccess(res, result);
        }
        catch (error) {
            this.handleError(error, res, 'list');
        }
    });
}
exports.StoreController = StoreController;
exports.storeController = new StoreController(storeService_1.storeService);

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storeService = exports.StoreService = void 0;
const StoreRepository_1 = require("../repositories/StoreRepository");
const ApiError_1 = require("../../../shared/utils/ApiError");
class StoreService {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    async createStore(storeData) {
        if (storeData.slug) {
            const existing = await this.repo.findBySlug(storeData.slug);
            if (existing) {
                throw ApiError_1.ApiError.conflict(`Store with slug '${storeData.slug}' already exists`);
            }
        }
        return await this.repo.create(storeData);
    }
    async getStoreById(id) {
        const store = await this.repo.findById(id);
        if (!store) {
            throw ApiError_1.ApiError.notFound('Store not found');
        }
        return store;
    }
    async updateStore(id, updateData) {
        const store = await this.repo.update(id, updateData);
        if (!store) {
            throw ApiError_1.ApiError.notFound('Store not found');
        }
        return store;
    }
    async deleteStore(id) {
        const deleted = await this.repo.delete(id);
        if (!deleted) {
            throw ApiError_1.ApiError.notFound('Store not found');
        }
    }
    async listStores(page, limit) {
        return await this.repo.list(page, limit);
    }
}
exports.StoreService = StoreService;
exports.storeService = new StoreService(StoreRepository_1.storeRepository);

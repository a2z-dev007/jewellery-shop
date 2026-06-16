"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storeRepository = exports.StoreRepository = void 0;
const Store_1 = require("../models/Store");
class StoreRepository {
    async create(storeData) {
        const store = new Store_1.Store(storeData);
        return await store.save();
    }
    async findById(id) {
        return await Store_1.Store.findById(id).exec();
    }
    async findBySlug(slug) {
        return await Store_1.Store.findOne({ slug }).exec();
    }
    async findByCustomDomain(domain) {
        return await Store_1.Store.findOne({ customDomain: domain }).exec();
    }
    async update(id, updateData) {
        return await Store_1.Store.findByIdAndUpdate(id, updateData, { new: true }).exec();
    }
    async delete(id) {
        return await Store_1.Store.findByIdAndDelete(id).exec();
    }
    async list(page, limit) {
        const skip = (page - 1) * limit;
        const [items, total] = await Promise.all([
            Store_1.Store.find().skip(skip).limit(limit).exec(),
            Store_1.Store.countDocuments().exec(),
        ]);
        return { items, total };
    }
}
exports.StoreRepository = StoreRepository;
exports.storeRepository = new StoreRepository();

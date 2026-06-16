import { storeRepository, StoreRepository } from '../repositories/StoreRepository';
import { IStore } from '../models/Store';
import { ApiError } from '../../../shared/utils/ApiError';

export class StoreService {
  constructor(private readonly repo: StoreRepository) {}

  async createStore(storeData: Partial<IStore>): Promise<IStore> {
    if (storeData.slug) {
      const existing = await this.repo.findBySlug(storeData.slug);
      if (existing) {
        throw ApiError.conflict(`Store with slug '${storeData.slug}' already exists`);
      }
    }
    return await this.repo.create(storeData);
  }

  async getStoreById(id: string): Promise<IStore> {
    const store = await this.repo.findById(id);
    if (!store) {
      throw ApiError.notFound('Store not found');
    }
    return store;
  }

  async updateStore(id: string, updateData: Partial<IStore>): Promise<IStore> {
    const store = await this.repo.update(id, updateData);
    if (!store) {
      throw ApiError.notFound('Store not found');
    }
    return store;
  }

  async deleteStore(id: string): Promise<void> {
    const deleted = await this.repo.delete(id);
    if (!deleted) {
      throw ApiError.notFound('Store not found');
    }
  }

  async listStores(page: number, limit: number) {
    return await this.repo.list(page, limit);
  }
}

export const storeService = new StoreService(storeRepository);

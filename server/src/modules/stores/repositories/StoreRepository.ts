import { Store, IStore } from '../models/Store';

export class StoreRepository {
  async create(storeData: Partial<IStore>): Promise<IStore> {
    const store = new Store(storeData);
    return await store.save();
  }

  async findById(id: string): Promise<IStore | null> {
    return await Store.findById(id).exec();
  }

  async findBySlug(slug: string): Promise<IStore | null> {
    return await Store.findOne({ slug }).exec();
  }

  async findByCustomDomain(domain: string): Promise<IStore | null> {
    return await Store.findOne({ customDomain: domain }).exec();
  }

  async update(id: string, updateData: Partial<IStore>): Promise<IStore | null> {
    return await Store.findByIdAndUpdate(id, updateData, { new: true }).exec();
  }

  async delete(id: string): Promise<IStore | null> {
    return await Store.findByIdAndDelete(id).exec();
  }

  async list(page: number, limit: number): Promise<{ items: IStore[]; total: number }> {
    const skip = (page - 1) * limit;
    const [items, total] = await Promise.all([
      Store.find().skip(skip).limit(limit).exec(),
      Store.countDocuments().exec(),
    ]);
    return { items, total };
  }
}
export const storeRepository = new StoreRepository();

import { Request, Response } from 'express';
import { BaseController } from '../../../shared/utils/BaseController';
import { storeService, StoreService } from '../services/storeService';
import { asyncErrorWrapper } from '../../../shared/utils/asyncErrorWrapper';

export class StoreController extends BaseController {
  constructor(private readonly service: StoreService) {
    super();
  }

  create = asyncErrorWrapper(async (req: Request, res: Response): Promise<void> => {
    try {
      const store = await this.service.createStore(req.body);
      this.handleSuccess(res, store, 'Store created successfully', 201);
    } catch (error) {
      this.handleError(error, res, 'create');
    }
  });

  get = asyncErrorWrapper(async (req: Request, res: Response): Promise<void> => {
    try {
      const store = await this.service.getStoreById(req.params.id as string);
      this.handleSuccess(res, store);
    } catch (error) {
      this.handleError(error, res, 'get');
    }
  });

  update = asyncErrorWrapper(async (req: Request, res: Response): Promise<void> => {
    try {
      const store = await this.service.updateStore(req.params.id as string, req.body);
      this.handleSuccess(res, store, 'Store updated successfully');
    } catch (error) {
      this.handleError(error, res, 'update');
    }
  });

  delete = asyncErrorWrapper(async (req: Request, res: Response): Promise<void> => {
    try {
      await this.service.deleteStore(req.params.id as string);
      this.handleSuccess(res, null, 'Store deleted successfully');
    } catch (error) {
      this.handleError(error, res, 'delete');
    }
  });

  list = asyncErrorWrapper(async (req: Request, res: Response): Promise<void> => {
    try {
      const page = parseInt(req.query.page as string || '1', 10);
      const limit = parseInt(req.query.limit as string || '20', 10);
      const result = await this.service.listStores(page, limit);
      this.handleSuccess(res, result);
    } catch (error) {
      this.handleError(error, res, 'list');
    }
  });
}

export const storeController = new StoreController(storeService);

import { Router, Request, Response } from 'express';
import { BlogPost } from '../models/BlogPost';
import { checkAuth, checkRole } from '../../../shared/middleware/auth';
import { ApiError } from '../../../shared/utils/ApiError';
import { asyncErrorWrapper } from '../../../shared/utils/asyncErrorWrapper';

const router = Router();

// Public route to view published posts
router.get(
  '/',
  asyncErrorWrapper(async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string || '1', 10);
    const limit = parseInt(req.query.limit as string || '20', 10);

    const query: any = { status: 'PUBLISHED' };
    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      BlogPost.find(query).sort('-publishedAt').skip(skip).limit(limit).exec(),
      BlogPost.countDocuments(query).exec(),
    ]);

    res.json({ success: true, data: { items, total, page, limit } });
  })
);

// Get post by slug
router.get(
  '/slug/:slug',
  asyncErrorWrapper(async (req: Request, res: Response) => {
    const post = await BlogPost.findOne({ slug: req.params.slug, status: 'PUBLISHED' }).exec();
    if (!post) {
      throw ApiError.notFound('Blog post not found');
    }
    res.json({ success: true, data: post });
  })
);

// Protected routes (Create, Update, Delete, List all for admins)
router.use(checkAuth);

router.get(
  '/admin/list',
  checkRole(['store_owner', 'manager']),
  asyncErrorWrapper(async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string || '1', 10);
    const limit = parseInt(req.query.limit as string || '20', 10);
    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      BlogPost.find().sort('-createdAt').skip(skip).limit(limit).exec(),
      BlogPost.countDocuments().exec(),
    ]);

    res.json({ success: true, data: { items, total, page, limit } });
  })
);

router.post(
  '/',
  checkRole(['store_owner', 'manager']),
  asyncErrorWrapper(async (req: Request, res: Response) => {
    const { title, slug, content, summary, featuredImage, status, publishedAt } = req.body;
    const storeId = (req as any).storeId;

    if (!title || !slug || !content) {
      throw ApiError.badRequest('Title, slug, and content are required');
    }

    const post = new BlogPost({
      title,
      slug,
      content,
      summary,
      featuredImage,
      status: status || 'DRAFT',
      publishedAt: status === 'PUBLISHED' ? new Date() : (publishedAt || undefined),
      storeId,
    });

    await post.save();
    res.status(201).json({ success: true, data: post });
  })
);

router.put(
  '/:id',
  checkRole(['store_owner', 'manager']),
  asyncErrorWrapper(async (req: Request, res: Response) => {
    const { title, slug, content, summary, featuredImage, status, publishedAt } = req.body;

    const updateFields: any = {};
    if (title) updateFields.title = title;
    if (slug) updateFields.slug = slug;
    if (content) updateFields.content = content;
    if (summary !== undefined) updateFields.summary = summary;
    if (featuredImage !== undefined) updateFields.featuredImage = featuredImage;
    if (status) {
      updateFields.status = status;
      if (status === 'PUBLISHED') {
        updateFields.publishedAt = new Date();
      } else if (status === 'SCHEDULED' && publishedAt) {
        updateFields.publishedAt = new Date(publishedAt);
      }
    }

    const post = await BlogPost.findByIdAndUpdate(req.params.id, updateFields, { new: true }).exec();
    if (!post) {
      throw ApiError.notFound('Blog post not found');
    }

    res.json({ success: true, data: post });
  })
);

router.delete(
  '/:id',
  checkRole(['store_owner', 'manager']),
  asyncErrorWrapper(async (req: Request, res: Response) => {
    const post = await BlogPost.findByIdAndDelete(req.params.id).exec();
    if (!post) {
      throw ApiError.notFound('Blog post not found');
    }
    res.json({ success: true, message: 'Blog post deleted successfully' });
  })
);

export default router;

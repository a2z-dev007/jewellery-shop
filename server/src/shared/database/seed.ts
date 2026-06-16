import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { config } from '../../config/unifiedConfig';
import { connectDB } from './connection';
import { Store } from '../../modules/stores/models/Store';
import { User } from '../../modules/users/models/User';
import { Category } from '../../modules/categories/models/Category';
import { Product } from '../../modules/products/models/Product';
import { Lead } from '../../modules/leads/models/Lead';
import { Appointment } from '../../modules/appointments/models/Appointment';
import { Customer } from '../../modules/customers/models/Customer';
import { Order } from '../../modules/orders/models/Order';
import { BlogPost } from '../../modules/blogs/models/BlogPost';
import { CmsPage } from '../../modules/cms/models/CmsPage';
import { ChatbotConfig } from '../../modules/chatbot/models/ChatbotConfig';
import { DailyMetrics } from '../../modules/analytics/models/DailyMetrics';
import { logger } from '../utils/logger';

const seedDatabase = async () => {
  try {
    logger.info('Starting database seeding...');
    await connectDB();

    // 1. Clean existing collections
    logger.info('Cleaning existing database collections...');
    const skipOptions = { skipTenantCheck: true };

    await Store.deleteMany({});
    await User.deleteMany({});
    await Category.deleteMany({}).setOptions(skipOptions);
    await Product.deleteMany({}).setOptions(skipOptions);
    await Lead.deleteMany({}).setOptions(skipOptions);
    await Appointment.deleteMany({}).setOptions(skipOptions);
    await Customer.deleteMany({}).setOptions(skipOptions);
    await Order.deleteMany({}).setOptions(skipOptions);
    await BlogPost.deleteMany({}).setOptions(skipOptions);
    await CmsPage.deleteMany({}).setOptions(skipOptions);
    await ChatbotConfig.deleteMany({}).setOptions(skipOptions);
    await DailyMetrics.deleteMany({}).setOptions(skipOptions);

    logger.info('Database cleaned successfully.');

    // 2. Generate common values
    const passwordHash = await bcrypt.hash('password123', 10);

    // 3. Create Super Admin User
    const superAdmin = new User({
      name: 'Super Admin',
      email: 'admin@commerceos.com',
      passwordHash: passwordHash,
      role: 'super_admin',
    });
    await superAdmin.save();
    logger.info('Super Admin created.');

    // ==========================================
    // STORE 1: Noor Chikan (Chikankari Fashion Store)
    // ==========================================
    logger.info('Seeding Noor Chikan (Fashion)...');
    
    const noorStoreId = new mongoose.Types.ObjectId();
    const noorStore = new Store({
      _id: noorStoreId,
      name: 'Noor Chikan',
      slug: 'noorchikan',
      customDomain: 'noorchikan.local',
      businessType: 'Fashion',
      activeModules: ['products', 'categories', 'appointments', 'blog', 'orders', 'wishlist', 'cms', 'chatbot'],
      attributeSchemas: [
        { key: 'fabric', label: 'Fabric', type: 'select', required: true, options: ['Cotton', 'Mulmul', 'Georgette', 'Rayon', 'Silk', 'Organza'] },
        { key: 'color', label: 'Color', type: 'string', required: true },
        { key: 'embroideryType', label: 'Embroidery Type', type: 'select', required: false, options: ['Bakhiya', 'Phanda', 'Keel Kangan', 'Jali', 'Tepchi'] },
        { key: 'workType', label: 'Work Type', type: 'select', required: false, options: ['Heavy', 'Medium', 'Light'] },
        { key: 'occasion', label: 'Occasion', type: 'select', required: false, options: ['Casual', 'Wedding', 'Festive', 'Office'] },
      ],
      settings: {
        currency: 'INR',
        timezone: 'Asia/Kolkata',
        taxRate: 5,
        workingHours: {
          monday: { open: '10:00', close: '20:00', active: true },
          tuesday: { open: '10:00', close: '20:00', active: true },
          wednesday: { open: '10:00', close: '20:00', active: true },
          thursday: { open: '10:00', close: '20:00', active: true },
          friday: { open: '10:00', close: '20:00', active: true },
          saturday: { open: '10:00', close: '20:00', active: true },
          sunday: { open: '10:00', close: '20:00', active: false },
        },
        holidays: ['2026-10-23', '2026-11-08'],
      },
    });
    await noorStore.save();

    // Store Owner for Noor Chikan
    const noorOwner = new User({
      name: 'Rana Noor',
      email: 'owner@noorchikan.com',
      passwordHash: passwordHash,
      role: 'store_owner',
      storeId: noorStoreId,
    });
    await noorOwner.save();

    // Categories for Noor Chikan
    const fashionCategories = [
      { name: 'Kurtis', slug: 'kurtis' },
      { name: 'Sarees', slug: 'sarees' },
      { name: 'Suits', slug: 'suits' },
      { name: 'Dupattas', slug: 'dupattas' },
      { name: 'Co-ord Sets', slug: 'co-ord-sets' },
    ];
    const seededFashionCategories: any = {};
    for (const cat of fashionCategories) {
      const c = new Category({
        name: cat.name,
        slug: cat.slug,
        storeId: noorStoreId,
      });
      await c.save();
      seededFashionCategories[cat.slug] = c._id;
    }

    // Products for Noor Chikan
    const fashionProducts = [
      {
        name: 'White Handcrafted Cotton Kurti',
        slug: 'white-handcrafted-cotton-kurti',
        sku: 'NC-KUR-COT-001',
        price: 2999,
        stock: 50,
        categoryId: seededFashionCategories['kurtis'],
        customAttributes: {
          fabric: 'Cotton',
          color: 'White',
          embroideryType: 'Bakhiya',
          workType: 'Medium',
          occasion: 'Casual',
        },
        storeId: noorStoreId,
      },
      {
        name: 'Pastel Pink Georgette Kurta Set',
        slug: 'pastel-pink-georgette-kurta-set',
        sku: 'NC-KUR-GEO-002',
        price: 4500,
        stock: 35,
        categoryId: seededFashionCategories['kurtis'],
        customAttributes: {
          fabric: 'Georgette',
          color: 'Pastel Pink',
          embroideryType: 'Phanda',
          workType: 'Heavy',
          occasion: 'Festive',
        },
        storeId: noorStoreId,
      },
      {
        name: 'Classic Lucknowi Silk Saree',
        slug: 'classic-lucknowi-silk-saree',
        sku: 'NC-SAR-SLK-001',
        price: 18500,
        stock: 10,
        categoryId: seededFashionCategories['sarees'],
        customAttributes: {
          fabric: 'Silk',
          color: 'Ivory Gold',
          embroideryType: 'Jali',
          workType: 'Heavy',
          occasion: 'Wedding',
        },
        storeId: noorStoreId,
      },
      {
        name: 'Sky Blue Tepchi Mulmul Suit',
        slug: 'sky-blue-tepchi-mulmul-suit',
        sku: 'NC-SUT-MUL-001',
        price: 5999,
        stock: 20,
        categoryId: seededFashionCategories['suits'],
        customAttributes: {
          fabric: 'Mulmul',
          color: 'Sky Blue',
          embroideryType: 'Tepchi',
          workType: 'Light',
          occasion: 'Office',
        },
        storeId: noorStoreId,
      },
    ];
    for (const prod of fashionProducts) {
      const p = new Product(prod);
      await p.save();
    }

    // Customers for Noor Chikan
    const customerNoor = new Customer({
      name: 'Aditi Sharma',
      email: 'aditi@gmail.com',
      phone: '+919988776655',
      loyaltyPoints: 120,
      storeId: noorStoreId,
    });
    await customerNoor.save();

    // Leads for Noor Chikan
    const leadNoor1 = new Lead({
      name: 'Pooja Hegde',
      email: 'pooja@gmail.com',
      phone: '+919988112233',
      status: 'NEW',
      source: 'custom_stitching',
      activities: [
        { type: 'note_added', content: 'Requested custom Anarkali stitching. Measurements: Bust 36", Waist 30", Length 44".' }
      ],
      storeId: noorStoreId,
    });
    await leadNoor1.save();

    const leadNoor2 = new Lead({
      name: 'UK Ethnic Boutique',
      email: 'buying@ukethnic.co.uk',
      phone: '+447700900077',
      status: 'CONTACTED',
      source: 'export_portal',
      activities: [
        { type: 'status_change', content: 'Lead created from export bulk inquiry.' },
        { type: 'note_added', content: 'Interested in buying 150 pieces of White Cotton Kurtis in mixed sizes.' }
      ],
      storeId: noorStoreId,
    });
    await leadNoor2.save();

    // Appointments for Noor Chikan
    const apptNoor = new Appointment({
      customerName: 'Kirti Sen',
      customerEmail: 'kirti@gmail.com',
      customerPhone: '+918877665544',
      serviceName: 'Custom Bridal Stitching Consultation',
      duration: 45,
      startTime: new Date(Date.now() + 24 * 60 * 60 * 1000), // tomorrow
      endTime: new Date(Date.now() + 24 * 60 * 60 * 1000 + 45 * 60 * 1000),
      status: 'PENDING',
      storeId: noorStoreId,
    });
    await apptNoor.save();

    // Blog Posts for Noor Chikan
    const blogNoor1 = new BlogPost({
      title: 'How To Style White Chikankari Kurtis for Hot Summers',
      slug: 'how-to-style-white-chikankari-kurtis-summers',
      content: '<p>Chikankari is the ultimate breath of fresh air during Indian summers. Here are five simple ways to style your white kurtis: 1) Pair with oxidized silver earrings, 2) Wear over colorful handloom palazzo pants, 3) Style with an indigo printed cotton dupatta...</p>',
      summary: 'Stay cool and look elegant with these styling tips for your white Chikankari kurtis.',
      status: 'PUBLISHED',
      publishedAt: new Date(),
      storeId: noorStoreId,
    });
    await blogNoor1.save();

    const blogNoor2 = new BlogPost({
      title: 'The Real Difference: Handmade vs Machine-made Chikankari',
      slug: 'handmade-vs-machine-made-chikankari',
      content: '<p>True Lucknowi Chikankari is entirely embroidered by hand, taking weeks to complete. Machine embroidery, on the other hand, is flat, identical on the reverse side, and lacks the delicate knots (Phanda) and shadow work (Bakhiya) that make handmade garments unique...</p>',
      summary: 'Learn how to identify authentic Lucknowi hand embroidery and support local artisans.',
      status: 'PUBLISHED',
      publishedAt: new Date(),
      storeId: noorStoreId,
    });
    await blogNoor2.save();

    // CMS Page for Noor Chikan
    const cmsNoor = new CmsPage({
      page: 'home',
      sections: [
        {
          type: 'hero',
          heading: 'Handcrafted Chikankari',
          subtitle: 'Timeless elegance made with love in Lucknow.',
          backgroundImage: '/assets/noor-hero-bg.jpg',
        },
        {
          type: 'heritage',
          heading: 'Our Craftsmanship',
          content: 'Supporting over 500 local women artisans in Lucknow, preserving the ancient handcraft since 1985.',
        }
      ],
      storeId: noorStoreId,
    });
    await cmsNoor.save();

    // Chatbot Config for Noor Chikan
    const chatNoor = new ChatbotConfig({
      widgetColor: '#8B6B4A',
      welcomeMessage: 'Welcome to Noor Chikan! Looking for authentic hand-embroidered Kurtis or custom sizing? Ask me anything!',
      faqs: [
        { question: 'Do you offer custom tailoring?', answer: 'Yes! We offer customized stitching on all our unstitched suits and kurtis. You can submit your measurements online or chat with us on WhatsApp.' },
        { question: 'Where are your products made?', answer: 'Every single piece is hand-embroidered by local traditional artisans in and around Lucknow, Uttar Pradesh.' },
        { question: 'What is your shipping policy?', answer: 'We ship PAN-India (free for orders above ₹5,000) and globally to over 50 countries.' }
      ],
      storeId: noorStoreId,
    });
    await chatNoor.save();

    // Daily Metrics for Noor Chikan
    const todayStr = new Date().toISOString().split('T')[0];
    const metricsNoor = new DailyMetrics({
      date: todayStr,
      salesTotal: 12999,
      orderCount: 3,
      leadsCaptured: 5,
      visits: 250,
      storeId: noorStoreId,
    });
    await metricsNoor.save();


    // ==========================================
    // STORE 2: ABC Jewellers (Jewellery Store)
    // ==========================================
    logger.info('Seeding ABC Jewellers (Jewellery)...');

    const jewellStoreId = new mongoose.Types.ObjectId();
    const jewellStore = new Store({
      _id: jewellStoreId,
      name: 'ABC Jewellers',
      slug: 'abcjewellers',
      customDomain: 'abcjewellers.local',
      businessType: 'Jewellery',
      activeModules: ['products', 'categories', 'appointments', 'blog', 'orders', 'wishlist', 'cms', 'chatbot'],
      attributeSchemas: [
        { key: 'purity', label: 'Purity', type: 'select', required: true, options: ['24K Gold', '22K Gold', '18K Gold', 'Platinum', '925 Silver'] },
        { key: 'weight', label: 'Weight (Grams)', type: 'number', required: true },
        { key: 'stoneType', label: 'Stone Type', type: 'select', required: false, options: ['Diamond', 'Ruby', 'Emerald', 'Sapphire', 'None'] },
      ],
      settings: {
        currency: 'INR',
        timezone: 'Asia/Kolkata',
        taxRate: 3,
        workingHours: {
          monday: { open: '10:30', close: '20:30', active: true },
          tuesday: { open: '10:30', close: '20:30', active: true },
          wednesday: { open: '10:30', close: '20:30', active: true },
          thursday: { open: '10:30', close: '20:30', active: true },
          friday: { open: '10:30', close: '20:30', active: true },
          saturday: { open: '10:30', close: '20:30', active: true },
          sunday: { open: '10:30', close: '15:30', active: true },
        },
      },
    });
    await jewellStore.save();

    // Store Owner for ABC Jewellers
    const jewellOwner = new User({
      name: 'Anil Gupta',
      email: 'owner@abcjewellers.com',
      passwordHash: passwordHash,
      role: 'store_owner',
      storeId: jewellStoreId,
    });
    await jewellOwner.save();

    // Categories for ABC Jewellers
    const jewellCategories = [
      { name: 'Gold Jewellery', slug: 'gold-jewellery' },
      { name: 'Diamond Jewellery', slug: 'diamond-jewellery' },
      { name: 'Bridal Collection', slug: 'bridal-collection' },
      { name: 'Silver Jewellery', slug: 'silver-jewellery' },
    ];
    const seededJewellCategories: any = {};
    for (const cat of jewellCategories) {
      const c = new Category({
        name: cat.name,
        slug: cat.slug,
        storeId: jewellStoreId,
      });
      await c.save();
      seededJewellCategories[cat.slug] = c._id;
    }

    // Products for ABC Jewellers
    const jewellProducts = [
      {
        name: '22K Gold Rani Haar Necklace Set',
        slug: '22k-gold-rani-haar-necklace',
        sku: 'ABC-NK-GLD-001',
        price: 310000,
        stock: 3,
        categoryId: seededJewellCategories['bridal-collection'],
        customAttributes: {
          purity: '22K Gold',
          weight: 45.5,
          stoneType: 'None',
        },
        storeId: jewellStoreId,
      },
      {
        name: 'Solitaire Diamond Engagement Ring',
        slug: 'solitaire-diamond-engagement-ring',
        sku: 'ABC-RG-DIA-002',
        price: 180000,
        stock: 5,
        categoryId: seededJewellCategories['diamond-jewellery'],
        customAttributes: {
          purity: '18K Gold',
          weight: 4.2,
          stoneType: 'Diamond',
        },
        storeId: jewellStoreId,
      },
      {
        name: 'Traditional Gold Jhumka Earrings',
        slug: 'traditional-gold-jhumka-earrings',
        sku: 'ABC-ER-GLD-003',
        price: 125000,
        stock: 8,
        categoryId: seededJewellCategories['gold-jewellery'],
        customAttributes: {
          purity: '22K Gold',
          weight: 18.0,
          stoneType: 'None',
        },
        storeId: jewellStoreId,
      },
    ];
    for (const prod of jewellProducts) {
      const p = new Product(prod);
      await p.save();
    }

    // Customer for ABC Jewellers
    const customerJewell = new Customer({
      name: 'Sneha Kapoor',
      email: 'sneha@yahoo.com',
      phone: '+919911223344',
      loyaltyPoints: 500,
      storeId: jewellStoreId,
    });
    await customerJewell.save();

    // Leads for ABC Jewellers
    const leadJewell = new Lead({
      name: 'Rajesh Mehta',
      email: 'rajesh@mehtacorp.com',
      phone: '+919812345678',
      status: 'NEW',
      source: 'gold_valuation_calculator',
      activities: [
        { type: 'note_added', content: 'Lead generated from Gold Rate Valuation tool. Input: 50g 22K Gold.' }
      ],
      storeId: jewellStoreId,
    });
    await leadJewell.save();

    // Appointments for ABC Jewellers
    const apptJewell = new Appointment({
      customerName: 'Sneha Kapoor',
      customerEmail: 'sneha@yahoo.com',
      customerPhone: '+919911223344',
      serviceName: 'Bridal Jewellery Private Viewing',
      duration: 60,
      startTime: new Date(Date.now() + 48 * 60 * 60 * 1000), // Day after tomorrow
      endTime: new Date(Date.now() + 48 * 60 * 60 * 1000 + 60 * 60 * 1000),
      status: 'CONFIRMED',
      storeId: jewellStoreId,
    });
    await apptJewell.save();

    // Blog Posts for ABC Jewellers
    const blogJewell = new BlogPost({
      title: 'How To Keep Your Precious Gold Jewellery Sparkling Like New',
      slug: 'keep-gold-jewellery-sparkling-clean',
      content: '<p>Over time, dust, oils from cosmetics, and environmental pollutants can dull the shine of your gold ornaments. We recommend soaking your jewellery in lukewarm water mixed with a few drops of mild dishwashing liquid. Gently scrub with a soft-bristled baby toothbrush...</p>',
      summary: 'Simple steps and professional care tips to clean and maintain gold ornaments at home.',
      status: 'PUBLISHED',
      publishedAt: new Date(),
      storeId: jewellStoreId,
    });
    await blogJewell.save();

    // CMS Page for ABC Jewellers
    const cmsJewell = new CmsPage({
      page: 'home',
      sections: [
        {
          type: 'hero',
          heading: 'Exquisite Handcrafted Jewellery',
          subtitle: 'Crafting lifetime memories since 1985.',
          backgroundImage: '/assets/jewell-hero-bg.jpg',
        }
      ],
      storeId: jewellStoreId,
    });
    await cmsJewell.save();

    // Chatbot Config for ABC Jewellers
    const chatJewell = new ChatbotConfig({
      widgetColor: '#D4AF37',
      welcomeMessage: 'Welcome to ABC Jewellers. Interested in checking todays gold rates or booking a private viewing?',
      faqs: [
        { question: 'Are your products certified?', answer: 'Yes! All our gold items are BIS Hallmarked, and all diamonds are certified by reputed international labs like IGI and GIA.' },
        { question: 'Do you offer a buyback guarantee?', answer: 'Yes, we offer a lifetime buyback and exchange guarantee on our certified gold and diamond jewellery based on prevailing metal market values.' }
      ],
      storeId: jewellStoreId,
    });
    await chatJewell.save();

    // Daily Metrics for ABC Jewellers
    const metricsJewell = new DailyMetrics({
      date: todayStr,
      salesTotal: 310000,
      orderCount: 1,
      leadsCaptured: 2,
      visits: 180,
      storeId: jewellStoreId,
    });
    await metricsJewell.save();

    logger.info('Database seeding completed successfully!');
    process.exit(0);
  } catch (error: any) {
    logger.error(`Error seeding database: ${error.message}`);
    process.exit(1);
  }
};

seedDatabase();

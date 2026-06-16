const fs = require('fs');
const path = require('path');

const swagger = {
  openapi: "3.0.0",
  info: {
    title: "CommerceOS API Documentation",
    version: "1.0.0",
    description: "Swagger OpenApi specification for CommerceOS Modular Monolith Backend"
  },
  servers: [
    {
      url: "http://localhost:5000/api/v1",
      description: "Local development server"
    }
  ],
  components: {
    securitySchemes: {
      BearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT"
      }
    }
  },
  security: [
    {
      BearerAuth: []
    }
  ],
  paths: {}
};

// Add standard headers
const tenantHeader = {
  name: "X-Store-Id",
  in: "header",
  required: false,
  description: "Optional explicit tenant ID",
  schema: { type: "string" }
};

// Define all routes and definitions
const endpoints = [
  // Auth
  {
    path: "/auth/register",
    method: "post",
    tags: ["Authentication"],
    summary: "Register a new store and owner",
    security: [],
    body: {
      name: "John Doe",
      email: "owner@myjewelstore.com",
      password: "secretpassword",
      storeName: "My Jewel Store",
      slug: "myjewelstore",
      businessType: "Jewellery"
    }
  },
  {
    path: "/auth/login",
    method: "post",
    tags: ["Authentication"],
    summary: "Log in to an existing account",
    security: [],
    body: {
      email: "owner@myjewelstore.com",
      password: "secretpassword"
    }
  },
  {
    path: "/auth/refresh",
    method: "post",
    tags: ["Authentication"],
    summary: "Refresh expired access token",
    security: [],
    body: {
      refreshToken: "jwt_refresh_token_here"
    }
  },
  {
    path: "/auth/logout",
    method: "post",
    tags: ["Authentication"],
    summary: "Log out of session",
    security: [],
    body: {}
  },
  // Users
  {
    path: "/users/invite",
    method: "post",
    tags: ["Users & Staff"],
    summary: "Invite a new staff member (Owner/Manager only)",
    body: {
      email: "staff@myjewelstore.com",
      role: "manager"
    }
  },
  {
    path: "/users/accept-invite",
    method: "post",
    tags: ["Users & Staff"],
    summary: "Accept invitation and register profile",
    security: [],
    body: {
      token: "invitation_jwt_token",
      name: "Jane Smith",
      password: "staffpassword"
    }
  },
  {
    path: "/users",
    method: "get",
    tags: ["Users & Staff"],
    summary: "List all staff in the store (Owner/Manager only)"
  },
  {
    path: "/users/{id}/role",
    method: "put",
    tags: ["Users & Staff"],
    summary: "Update staff member role (Owner only)",
    params: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
    body: {
      role: "staff"
    }
  },
  {
    path: "/users/{id}",
    method: "delete",
    tags: ["Users & Staff"],
    summary: "Remove staff member (Owner only)",
    params: [{ name: "id", in: "path", required: true, schema: { type: "string" } }]
  },
  // Stores
  {
    path: "/stores",
    method: "post",
    tags: ["Stores"],
    summary: "Create a new store (Super Admin only)",
    body: {
      name: "New Salon",
      slug: "newsalon",
      businessType: "Salon",
      attributeSchemas: [
        { key: "stylist", label: "Stylist Name", type: "string", required: true }
      ]
    }
  },
  {
    path: "/stores",
    method: "get",
    tags: ["Stores"],
    summary: "List all stores"
  },
  {
    path: "/stores/verify-domain",
    method: "get",
    tags: ["Stores"],
    summary: "Verify domain config for reverse proxy dynamic TLS",
    security: [],
    params: [{ name: "domain", in: "query", required: true, schema: { type: "string" } }]
  },
  // Products
  {
    path: "/products",
    method: "get",
    tags: ["Products Catalog"],
    summary: "List and search products",
    security: [],
    params: [
      { name: "page", in: "query", schema: { type: "integer" } },
      { name: "limit", in: "query", schema: { type: "integer" } },
      { name: "sort", in: "query", schema: { type: "string" } },
      { name: "categoryId", in: "query", schema: { type: "string" } }
    ]
  },
  {
    path: "/products",
    method: "post",
    tags: ["Products Catalog"],
    summary: "Create a new product (Owner/Manager only)",
    body: {
      name: "Gold Ring",
      slug: "gold-ring",
      sku: "RING-001",
      price: 499.99,
      stock: 10,
      customAttributes: {
        purity: "22K",
        weight: 5.5
      }
    }
  },
  // Categories
  {
    path: "/categories",
    method: "get",
    tags: ["Categories"],
    summary: "List category tree",
    security: []
  },
  {
    path: "/categories",
    method: "post",
    tags: ["Categories"],
    summary: "Create category (Owner/Manager only)",
    body: {
      name: "Rings",
      slug: "rings",
      parentId: null
    }
  },
  // Media
  {
    path: "/media/upload",
    method: "post",
    tags: ["Media"],
    summary: "Upload static files and images"
  },
  // CMS
  {
    path: "/cms/{pageName}",
    method: "get",
    tags: ["CMS Content"],
    summary: "Get page layout builder configuration JSON",
    security: [],
    params: [{ name: "pageName", in: "path", required: true, schema: { type: "string" } }]
  },
  {
    path: "/cms/{pageName}",
    method: "put",
    tags: ["CMS Content"],
    summary: "Create or update page sections",
    params: [{ name: "pageName", in: "path", required: true, schema: { type: "string" } }],
    body: {
      sections: [
        { type: "hero", heading: "Welcome to our store", subtitle: "Best collection" }
      ]
    }
  },
  // Blogs
  {
    path: "/blogs",
    method: "get",
    tags: ["Blogs CMS"],
    summary: "Get public published blog posts list",
    security: []
  },
  {
    path: "/blogs/slug/{slug}",
    method: "get",
    tags: ["Blogs CMS"],
    summary: "Get blog post by slug",
    security: [],
    params: [{ name: "slug", in: "path", required: true, schema: { type: "string" } }]
  },
  // Leads
  {
    path: "/leads/submit",
    method: "post",
    tags: ["CRM & Leads"],
    summary: "Web form submission lead intake",
    security: [],
    body: {
      name: "Alice Brown",
      email: "alice@example.com",
      phone: "1234567890",
      source: "contact_form"
    }
  },
  // Appointments
  {
    path: "/appointments/slots",
    method: "get",
    tags: ["Appointments Booking"],
    summary: "Retrieve availability slots for scheduling visits",
    security: [],
    params: [
      { name: "date", in: "query", required: true, schema: { type: "string" } },
      { name: "duration", in: "query", required: true, schema: { type: "integer" } }
    ]
  },
  {
    path: "/appointments/book",
    method: "post",
    tags: ["Appointments Booking"],
    summary: "Book an appointment time slot",
    security: [],
    body: {
      customerName: "Jane Doe",
      customerEmail: "jane@example.com",
      customerPhone: "0987654321",
      serviceName: "Bridal Set Fitting",
      duration: 60,
      date: "2026-07-01",
      time: "11:00"
    }
  },
  // Orders
  {
    path: "/orders/checkout",
    method: "post",
    tags: ["Orders & Checkout"],
    summary: "Submit shopping cart checkout order",
    security: [],
    body: {
      items: [
        { productId: "603d2bfa12a3...", quantity: 1 }
      ],
      customerDetails: {
        name: "Charlie Green",
        email: "charlie@example.com",
        phone: "5551234567",
        address: "123 Main St"
      },
      gateway: "mock"
    }
  },
  {
    path: "/orders/{id}/mock-pay",
    method: "post",
    tags: ["Orders & Checkout"],
    summary: "Mock complete pending order payment",
    security: [],
    params: [{ name: "id", in: "path", required: true, schema: { type: "string" } }]
  },
  // Calculators
  {
    path: "/calculators/gold",
    method: "get",
    tags: ["Domain Calculators"],
    summary: "Compute Gold Value base price and making charges",
    security: [],
    params: [
      { name: "weight", in: "query", required: true, schema: { type: "number" } },
      { name: "ratePerGram", in: "query", required: true, schema: { type: "number" } },
      { name: "makingChargePercent", in: "query", schema: { type: "number" } }
    ]
  },
  // Analytics
  {
    path: "/analytics/dashboard",
    method: "get",
    tags: ["Analytics Dashboard"],
    summary: "Retrieve store metrics (Owner/Manager only)"
  },
  // Chatbot
  {
    path: "/chatbot/settings",
    method: "get",
    tags: ["Chatbot Widget"],
    summary: "Get widget visual configuration and FAQ data",
    security: []
  }
];

// Generate Swagger json
endpoints.forEach((ep) => {
  if (!swagger.paths[ep.path]) {
    swagger.paths[ep.path] = {};
  }
  
  const parameters = ep.params || [];
  parameters.push(tenantHeader);

  swagger.paths[ep.path][ep.method] = {
    tags: ep.tags,
    summary: ep.summary,
    parameters,
    security: ep.security !== undefined ? ep.security : [{ BearerAuth: [] }],
    ...(ep.body && {
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              example: ep.body
            }
          }
        }
      }
    }),
    responses: {
      200: {
        description: "Success response wrapper",
        content: {
          "application/json": {
            schema: {
              type: "object",
              example: {
                success: true,
                data: {},
                message: "Success"
              }
            }
          }
        }
      }
    }
  };
});

// Generate Postman Collection v2.1.0 format
const postman = {
  info: {
    name: "CommerceOS API Collection",
    schema: "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  variable: [
    {
      key: "baseUrl",
      value: "http://localhost:5000/api/v1",
      type: "string"
    },
    {
      key: "authToken",
      value: "YOUR_JWT_ACCESS_TOKEN",
      type: "string"
    },
    {
      key: "storeId",
      value: "YOUR_STORE_OBJECT_ID",
      type: "string"
    }
  ],
  item: []
};

// Group by tags in Postman folders
const folders = {};

endpoints.forEach((ep) => {
  const tagName = ep.tags[0];
  if (!folders[tagName]) {
    folders[tagName] = {
      name: tagName,
      item: []
    };
  }

  const postmanItem = {
    name: ep.summary,
    request: {
      method: ep.method.toUpperCase(),
      header: [
        {
          key: "X-Store-Id",
          value: "{{storeId}}",
          type: "text",
          description: "Tenant store Id context filter"
        }
      ],
      url: {
        raw: "{{baseUrl}}" + ep.path.replace(/{/g, ":").replace(/}/g, ""),
        host: ["{{baseUrl}}"],
        path: ep.path.replace(/{/g, ":").replace(/}/g, "").split("/").filter(Boolean)
      }
    }
  };

  // Add Auth Headers if not explicitly empty
  if (ep.security === undefined) {
    postmanItem.request.header.push({
      key: "Authorization",
      value: "Bearer {{authToken}}",
      type: "text"
    });
  }

  // Add Body
  if (ep.body) {
    postmanItem.request.body = {
      mode: "raw",
      raw: JSON.stringify(ep.body, null, 2),
      options: {
        raw: {
          language: "json"
        }
      }
    };
  }

  // Add Route parameters
  if (ep.params) {
    const queryParams = [];
    const pathVariables = [];

    ep.params.forEach((param) => {
      if (param.in === "query") {
        queryParams.push({
          key: param.name,
          value: "",
          description: param.name
        });
      } else if (param.in === "path") {
        pathVariables.push({
          key: param.name,
          value: "",
          description: param.name
        });
      }
    });

    if (queryParams.length > 0) {
      postmanItem.request.url.query = queryParams;
    }
    if (pathVariables.length > 0) {
      postmanItem.request.url.variable = pathVariables;
    }
  }

  folders[tagName].item.push(postmanItem);
});

postman.item = Object.values(folders);

// Write to files
const docsDir = path.join(__dirname, '..', 'docs');
if (!fs.existsSync(docsDir)) {
  fs.mkdirSync(docsDir, { recursive: true });
}

fs.writeFileSync(path.join(docsDir, 'swagger.json'), JSON.stringify(swagger, null, 2));
fs.writeFileSync(path.join(docsDir, 'postman_collection.json'), JSON.stringify(postman, null, 2));

console.log("Docs and Postman collection files written successfully!");

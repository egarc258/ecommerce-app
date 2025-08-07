# E-commerce Application

Full-stack e-commerce application built with Spring Boot backend and React frontend.

## Backend Features

### Technologies
- **Java 17** with Spring Boot 3.5.3
- **PostgreSQL 17** database
- **Spring Data JPA** for data persistence
- **Spring Web** for REST APIs
- **Maven** for dependency management

### Current Implementation

#### Product Management API
- ✅ Complete CRUD operations
- ✅ Search and filtering
- ✅ Pagination and sorting
- ✅ Input validation
- ✅ Soft delete functionality

#### Database
- ✅ PostgreSQL connection configured
- ✅ Automatic table creation with Hibernate
- ✅ Product entity with proper relationships

### API Endpoints

#### Products

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | List products (paginated) |
| POST | `/api/products` | Create product |
| GET | `/api/products/{id}` | Get product by ID |
| PUT | `/api/products/{id}` | Update product |
| DELETE | `/api/products/{id}` | Delete product |
| GET | `/api/products/search?query=...` | Search products |
| GET | `/api/products/price-range` | Filter by price |
| GET | `/api/products/in-stock` | Get available products |
| GET | `/api/health` | Health check |

### Setup Instructions

1. **Prerequisites:**
    - Java 17+
    - PostgreSQL 17
    - Maven

2. **Database Setup:**
   ```sql
   CREATE DATABASE ecommerce_db;
   CREATE USER ecommerce_user WITH ENCRYPTED PASSWORD 'password123';
   GRANT ALL PRIVILEGES ON DATABASE ecommerce_db TO ecommerce_user;

## Frontend Features

### Technologies
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **React Router** for navigation (coming soon)
- **Axios** for API communication (coming soon)
- **React Hook Form** for form handling (coming soon)

### Development Setup

#### Frontend Development:
```bash
cd frontend
npm install
npm start

Frontend URL:

Development: http://localhost:3000
Connects to backend API at: http://localhost:8080/api

Project Structure
frontend/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/         # Page components
│   ├── services/      # API service layer
│   ├── context/       # React context for state management
│   ├── types/         # TypeScript type definitions
│   └── utils/         # Utility functions
├── public/            # Static assets
└── tailwind.config.js # Tailwind CSS configuration
Planned Frontend Features

 User authentication (login/register forms)
 Product catalog with search and filtering
 Shopping cart functionality
 User dashboard and profile
 Responsive design for mobile devices
 Protected routes for authenticated users


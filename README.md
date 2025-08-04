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

GET    /api/products                    # List products (paginated)
POST   /api/products                    # Create product
GET    /api/products/{id}               # Get product by ID
PUT    /api/products/{id}               # Update product
DELETE /api/products/{id}               # Delete product
GET    /api/products/search?query=...   # Search products
GET    /api/products/price-range        # Filter by price
GET    /api/products/in-stock           # Get available products
GET    /api/health                      # Health check

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
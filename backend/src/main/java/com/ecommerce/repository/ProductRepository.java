package com.ecommerce.repository;

import com.ecommerce.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    // Find active products
    List<Product> findByActiveTrue();

    // Find products by name containing (case insensitive)
    List<Product> findByNameContainingIgnoreCase(String name);

    // Find products within price range
    List<Product> findByPriceBetween(BigDecimal minPrice, BigDecimal maxPrice);

    // Find products with stock greater than specified amount
    List<Product> findByStockQuantityGreaterThan(Integer stockQuantity);

    // Custom query to find active products with pagination
    @Query("SELECT p FROM Product p WHERE p.active = true ORDER BY p.createdAt DESC")
    Page<Product> findActiveProducts(Pageable pageable);

    // Search products by name or description
    @Query("SELECT p FROM Product p WHERE p.active = true AND " +
            "(LOWER(p.name) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
            "LOWER(p.description) LIKE LOWER(CONCAT('%', :searchTerm, '%')))")
    Page<Product> searchProducts(@Param("searchTerm") String searchTerm, Pageable pageable);
}
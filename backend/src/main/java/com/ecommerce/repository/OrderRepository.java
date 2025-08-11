package com.ecommerce.repository;

import com.ecommerce.model.Order;
import com.ecommerce.model.OrderStatus;
import com.ecommerce.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

    List<Order> findByUserOrderByCreatedAtDesc(User user);

    Page<Order> findByUserOrderByCreatedAtDesc(User user, Pageable pageable);

    Page<Order> findAllByOrderByCreatedAtDesc(Pageable pageable);

    List<Order> findByStatus(OrderStatus status);

    long countByStatus(OrderStatus status);
}
package com.ecommerce.product.service;

import com.ecommerce.product.model.Product;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    private static final List<Product> PRODUCTS = List.of(
            Product.builder().id(101).name("T-Shirt").price(599).discountPercent(10).build(),
            Product.builder().id(102).name("Jeans").price(1499).discountPercent(15).build(),
            Product.builder().id(103).name("Mobile Phone").price(15999).discountPercent(5).build()
    );

    public List<Product> getAllProducts() {
        return PRODUCTS;
    }

    public Optional<Product> getProductById(int id) {
        return PRODUCTS.stream()
                .filter(p -> p.getId() == id)
                .findFirst();
    }
}
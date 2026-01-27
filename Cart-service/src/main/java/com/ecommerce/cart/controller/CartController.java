package com.ecommerce.cart.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/cart")
public class CartController {

    private final List<Map<String, Object>> cartItems = new ArrayList<>();

    @PostMapping("/add")
    public ResponseEntity<String> addToCart(@RequestBody Map<String, Object> product) {
        cartItems.add(product);
        return ResponseEntity.ok("Added to cart");
    }

    @GetMapping
    public ResponseEntity<List<Map<String, Object>>> getCart() {
        return ResponseEntity.ok(cartItems);
    }

    @DeleteMapping("/{index}")
    public ResponseEntity<String> removeItem(@PathVariable int index) {
        if (index >= 0 && index < cartItems.size()) {
            cartItems.remove(index);
            return ResponseEntity.ok("Item removed");
        }
        return ResponseEntity.badRequest().body("Invalid item index");
    }
}

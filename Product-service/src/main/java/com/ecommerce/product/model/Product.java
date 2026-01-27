package com.ecommerce.product.model;

import lombok.Data;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Product {
    private int id;
    private String name;
    private int price;
    private int discountPercent;

    public int getFinalPrice() {
        return price - (price * discountPercent / 100);
    }
}
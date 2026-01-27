package com.ecommerce.payment.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/payment")
public class PaymentController {

    @PostMapping("/initiate")
    public ResponseEntity<Map<String, String>> initiatePayment(@RequestBody Map<String, Object> request) {
        double subtotal = ((Number) request.getOrDefault("subtotal", 0)).doubleValue();
        double gst = subtotal * 0.18;
        double total = subtotal + gst;

        String upiLink = String.format(
            "upi://pay?pa=merchant@okaxis&pn=MyEcom&am=%.0f&cu=INR&tn=Order_%d",
            total,
            System.currentTimeMillis()
        );

        return ResponseEntity.ok(Map.of(
            "upiLink", upiLink,
            "total", String.format("%.2f", total),
            "message", "Payment link generated"
        ));
    }
}

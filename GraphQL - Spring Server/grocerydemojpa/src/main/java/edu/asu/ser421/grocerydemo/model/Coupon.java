package edu.asu.ser421.grocerydemo.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

@Entity
public class Coupon {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private double savings;

    @ManyToOne
    private GroceryItem grocery;

    // Default constructor
    public Coupon() {}

    // Constructor
    public Coupon(String name, double savings, GroceryItem grocery) {
        this.name = name;
        this.savings = savings;
        this.grocery = grocery;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getSavings() {
        return savings;
    }

    public void setSavings(double savings) {
        this.savings = savings;
    }

    public GroceryItem getGrocery() {
        return grocery;
    }

    public void setGrocery(GroceryItem grocery) {
        this.grocery = grocery;
    }
}

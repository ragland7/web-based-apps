package edu.asu.ser421.grocerydemo.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import edu.asu.ser421.grocerydemo.model.Coupon;
import edu.asu.ser421.grocerydemo.model.GroceryItem;
import edu.asu.ser421.grocerydemo.dto.GroceryFormList;
import edu.asu.ser421.grocerydemo.repository.CouponRepository;
import edu.asu.ser421.grocerydemo.repository.GroceryItemRepository;

@Service
public class CouponService {

    private final CouponRepository couponRepository;
    private final GroceryItemRepository groceryItemRepository;

    public CouponService(CouponRepository couponRepository, GroceryItemRepository groceryItemRepository) {
        this.couponRepository = couponRepository;
        this.groceryItemRepository = groceryItemRepository;
    }

    public List<Coupon> getApplicableCoupons(GroceryFormList selectedItems) {
        List<GroceryItem> selectedGroceries = groceryItemRepository.findAllById(selectedItems.getGroceryIds());
        return couponRepository.findAll().stream()
                .filter(coupon -> selectedGroceries.contains(coupon.getGrocery()))
                .collect(Collectors.toList());
    }

    public void applySelectedCoupons(List<Long> selectedCoupons, GroceryFormList selectedItems) {
        List<GroceryItem> cartItems = groceryItemRepository.findAllById(selectedItems.getGroceryIds());

        for (Long couponId : selectedCoupons) {
            Coupon coupon = couponRepository.findById(couponId).orElseThrow();
            GroceryItem grocery = coupon.getGrocery();

            if (cartItems.contains(grocery)) {
                grocery.setPrice((float) (grocery.getPrice() - coupon.getSavings())); // Convert to float
                groceryItemRepository.save(grocery);
            }
        }
    }

    public void addCoupon(String name, double savings, String groceryId) {
        GroceryItem grocery = groceryItemRepository.findById(groceryId)
                .orElseThrow(() -> new IllegalArgumentException("Grocery item not found"));

        if (savings <= 0 || savings > grocery.getPrice()) {
            throw new IllegalArgumentException("Invalid savings value.");
        }

        Coupon coupon = new Coupon();
        coupon.setName(name);
        coupon.setSavings(savings);
        coupon.setGrocery(grocery);

        couponRepository.save(coupon);
    }
}

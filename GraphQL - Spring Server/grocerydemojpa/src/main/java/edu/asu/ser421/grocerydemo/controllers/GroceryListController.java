package edu.asu.ser421.grocerydemo.controllers;

import java.util.List;
import java.util.stream.Collectors;

import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import edu.asu.ser421.grocerydemo.dto.GroceryFormList;
import edu.asu.ser421.grocerydemo.model.GroceryItem;
import edu.asu.ser421.grocerydemo.model.GroceryItem.GroceryType;
import edu.asu.ser421.grocerydemo.services.GroceryItemService;
import edu.asu.ser421.grocerydemo.model.Coupon;
import edu.asu.ser421.grocerydemo.services.CouponService;

@Controller
@RequestMapping("groceries")
public class GroceryListController {
	
	private final GroceryItemService groceryItemService;private final CouponService couponService; // Inject CouponService

    // Constructor for dependency injection
    public GroceryListController(GroceryItemService groceryItemService, CouponService couponService) {
        this.groceryItemService = groceryItemService;
        this.couponService = couponService; // Inject CouponService
    }

	// Step 2: GET to show groceries
	@GetMapping
	public String showGroceryList(Model model, HttpSession session) {
		
		List<GroceryItem> groceryItems = groceryItemService.getGroceryList();

		GroceryFormList groceryFormList = new GroceryFormList();
		
		if (session != null) {
			if (session.getAttribute("selecteditems") != null) {
				groceryFormList = (GroceryFormList) session.getAttribute("selecteditems");
				System.out.println("GFL found in session with items: " + groceryFormList.getGroceryIds().size());
				List<String> selectedItems =  groceryFormList.getGroceryIds();
				for (GroceryItem gItem: groceryItems) {
					if (selectedItems.contains(gItem.getId())) {
						gItem.setSubscribed(true);
					}else {
						gItem.setSubscribed(false);
					}					
				}
			}
		}
		
		for (GroceryType gType : GroceryType.values()) {
			model.addAttribute(gType.toString().toLowerCase(), filterByType(groceryItems, gType));
		}
		model.addAttribute("formlist", new GroceryFormList());
		return "groceries";
	}
	
	// filters a List of the enum types by type
	private List<GroceryItem> filterByType(
		      List<GroceryItem> items, GroceryType type) {
		    return items
		              .stream()
		              .filter(x -> x.getGroceryType().equals(type))
		              .collect(Collectors.toList());
	}
	
	@PostMapping
	public String processGroceryForm(@ModelAttribute GroceryFormList gItems, Model model, HttpSession session) {
    if (gItems.getGroceryIds() == null) {
        System.out.println("POST: grocery list null");
    } else {
        session.setAttribute("selecteditems", gItems);  // Store selected items in session
    }

    // Fetch full details of the selected grocery items
    List<GroceryItem> selectedItems = groceryItemService.getGroceryList().stream()
            .filter(item -> gItems.getGroceryIds().contains(item.getId()))
            .collect(Collectors.toList());

    // Calculate the total price
    double totalPrice = selectedItems.stream()
            .mapToDouble(GroceryItem::getPrice)
            .sum();

    // Add selected items and total price to the model
    model.addAttribute("selecteditems", selectedItems);
    model.addAttribute("totalPrice", totalPrice);

    return "processed"; // Render the updated processed.html
	}

	@GetMapping("/applyDiscounts")
public String showApplyDiscountsPage(Model model, HttpSession session) {
    // Fetch selected items from session
    GroceryFormList selectedItems = (GroceryFormList) session.getAttribute("selecteditems");

    // Get applicable coupons
    List<Coupon> coupons = couponService.getApplicableCoupons(selectedItems);

    // Add coupons to the model
    model.addAttribute("coupons", coupons);
    return "applyDiscounts"; // Render applyDiscounts.html
}

@PostMapping("/applyDiscounts")
public String applyDiscounts(@RequestParam List<Long> selectedCoupons, HttpSession session) {
    // Apply selected coupons to groceries in session
    GroceryFormList selectedItems = (GroceryFormList) session.getAttribute("selecteditems");
    couponService.applySelectedCoupons(selectedCoupons, selectedItems);

    // Redirect to cart
    return "redirect:/processed";
}

@GetMapping("/addCoupon")
public String showAddCouponPage(Model model) {
    List<GroceryItem> groceries = groceryItemService.getGroceryList();
    model.addAttribute("groceries", groceries);
    return "addCoupon";
}

@PostMapping("/addCoupon")
public String addCoupon(
        @RequestParam String name,
        @RequestParam double savings,
        @RequestParam String groceryId,
        RedirectAttributes redirectAttributes) {
    try {
        couponService.addCoupon(name, savings, groceryId);
        redirectAttributes.addFlashAttribute("successMessage", "Coupon added successfully!");
    } catch (IllegalArgumentException e) {
        redirectAttributes.addFlashAttribute("errorMessage", e.getMessage());
    }
    return "redirect:/addCoupon";
}


}

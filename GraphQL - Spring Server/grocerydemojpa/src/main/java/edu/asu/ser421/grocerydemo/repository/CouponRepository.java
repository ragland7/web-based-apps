package edu.asu.ser421.grocerydemo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import edu.asu.ser421.grocerydemo.model.Coupon;

@Repository
public interface CouponRepository extends JpaRepository<Coupon, Long> {}
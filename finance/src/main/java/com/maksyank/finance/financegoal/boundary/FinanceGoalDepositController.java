package com.maksyank.finance.financegoal.boundary;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("financeGoal/{id}/deposit")
public class FinanceGoalDepositController {

    @GetMapping
    public void getAmountByThisMonth() {

    }

    @PostMapping
    public void create() {

    }
}

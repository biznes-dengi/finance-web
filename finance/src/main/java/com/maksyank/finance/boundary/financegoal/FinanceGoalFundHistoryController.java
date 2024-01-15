package com.maksyank.finance.boundary.financegoal;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("financeGoal/{id}/fundHistory")
public class FinanceGoalFundHistoryController {

    @GetMapping
    public void getByFilter() {

    }

    @GetMapping("/{id}")
    public void getById() {

    }

    @PatchMapping("/{id}")
    public void updateDescription() {

    }
}

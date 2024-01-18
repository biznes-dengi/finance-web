package com.maksyank.finance.financegoal.boundary;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("financeGoal/{id}/fundHistory")
public class FinanceGoalFundHistoryController {

    @GetMapping
    public void getByPage() {

    }

    @GetMapping("/{id}")
    public void getById() {

    }

    @PatchMapping("/{id}")
    public void updateDescription() {

    }
}

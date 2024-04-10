package com.maksyank.finance.financegoal.boundary;

import com.maksyank.finance.financegoal.exception.NotFoundException;
import com.maksyank.finance.financegoal.service.process.DepositFundProcess;
import com.maksyank.finance.user.service.UserAccountService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.math.BigDecimal;

@RestController
@RequestMapping("/financeGoal/{finGoalId}/deposit/fund")
public class DepositFundController {
    private UserAccountService userAccountService;
    private DepositFundProcess depositFundProcess;

    DepositFundController(DepositFundProcess depositFundProcess, UserAccountService userAccountService) {
        this.depositFundProcess = depositFundProcess;
        this.userAccountService = userAccountService;
    }

    // TODO add validation for month / year
    @GetMapping("/month")
    public BigDecimal getFundAmountByMonth(
            @PathVariable("finGoalId") int financeGoalId,
            @RequestParam("month") int month,
            @RequestParam("year") int year,
            @RequestParam("userId") int userId
    ) {
        this.checkIfUserExists(userId);
        try {
            return this.depositFundProcess.processGetFundAmountByMonth(financeGoalId, year, month, userId);
        } catch (NotFoundException ex) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, ex.getMessage(), ex);
        }
    }

    private void checkIfUserExists(int userId) {
        if (!this.userAccountService.checkIfExists(userId)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Entity 'User' not found by attribute 'id' = " + userId);
        }
    }
}

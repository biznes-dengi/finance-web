package com.maksyank.finance.financegoal.boundary;

import com.maksyank.finance.financegoal.exception.NotFoundException;
import com.maksyank.finance.financegoal.service.process.FundProcess;
import com.maksyank.finance.user.service.UserAccountService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.math.BigDecimal;

@RestController
@RequestMapping("/financeGoal/{finGoalId}/deposit/fund")
public class DepositFundController {
    private UserAccountService userAccountService;
    private FundProcess fundProcess;

    DepositFundController(FundProcess fundProcess, UserAccountService userAccountService) {
        this.fundProcess = fundProcess;
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
            return this.fundProcess.processGetFundAmountByMonth(financeGoalId, year, month, userId);
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

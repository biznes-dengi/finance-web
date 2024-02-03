package com.maksyank.finance.financegoal.boundary;

import com.maksyank.finance.financegoal.domain.response.DepositResponse;
import com.maksyank.finance.financegoal.domain.response.DepositViewResponse;
import com.maksyank.finance.financegoal.exception.NotFoundException;
import com.maksyank.finance.financegoal.service.DepositService;
import com.maksyank.finance.financegoal.service.process.DepositProcess;
import com.maksyank.finance.user.service.UserAccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.math.BigDecimal;
import java.util.List;

// TO DO maybe refactor checkIfExists finGoal, probably move to service, think about it
@RestController
@RequestMapping("/financeGoal/{finGoalId}/deposit")
public class DepositController {
    private UserAccountService userAccountService;
    private DepositProcess depositProcess;

    @Autowired
    DepositController(DepositProcess depositProcess, UserAccountService userAccountService) {
        this.depositProcess = depositProcess;
        this.userAccountService = userAccountService;
    }

    @GetMapping
    public ResponseEntity<List<DepositViewResponse>> getByPage(
            @PathVariable("finGoalId") int financeGoalId,
            @RequestParam("pageNumber") int pageNumber,
            @RequestParam("userId") int userId
    ) {
        this.checkIfUserExists(userId);

        try {
            final var response = this.depositProcess.processGetByPage(financeGoalId, pageNumber, userId);
            return ResponseEntity.ok(response);
        } catch (NotFoundException ex) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, ex.getMessage(), ex);
        }
    }

    // TO DO move the check of fin goal to service
    @GetMapping
    public ResponseEntity<BigDecimal> getAmountByThisMonth(
            @PathVariable("finGoalId") int financeGoalId,
            @RequestParam("userId") int userId
    ) {
        if (!this.userAccountService.checkIfExists(userId)) {
            // not found user
        }

        // final var response = this.depositService.calculateAmountByThisMonth(financeGoalId, userId);
        return null;
    }

    @GetMapping("/{depositId}")
    public ResponseEntity<DepositResponse> getById(
            @PathVariable("finGoalId") int financeGoalId,
            @PathVariable("depositId") int depositId,
            @RequestParam("userId") int userId
    ) {
        if (!this.userAccountService.checkIfExists(userId)) {
            // not found user
        }

        // final var response = depositService.findById(depositId, financeGoalId, userId);
        return null;
    }

    @PatchMapping("/{depositId}")
    public void updateDescription(
            @PathVariable("finGoalId") int financeGoalId,
            @PathVariable("depositId") int depositId,
            @RequestParam("userId") int userId,
            @RequestParam("description") String description
    ) {
        if (!this.userAccountService.checkIfExists(userId)) {
            // not found user
        }

//        if (!this.financeGoalService.checkIfExists(financeGoalId, userId)) {
//            // not found financeGoal
//        }


    }

    @PostMapping
    public void save(@RequestParam("userId") int userId) {
        if (this.userAccountService.checkIfExists(userId)) {

        }
        // not found user
    }

    private void checkIfUserExists(int userId) {
        if (!this.userAccountService.checkIfExists(userId)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Entity 'User' not found by attribute 'id' = " + userId);
        }
    }
}

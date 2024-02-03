package com.maksyank.finance.financegoal.boundary;

import com.maksyank.finance.financegoal.domain.request.DepositSaveRequest;
import com.maksyank.finance.financegoal.domain.response.DepositResponse;
import com.maksyank.finance.financegoal.domain.response.DepositViewResponse;
import com.maksyank.finance.financegoal.exception.DbOperationException;
import com.maksyank.finance.financegoal.exception.NotFoundException;
import com.maksyank.finance.financegoal.service.process.DepositProcess;
import com.maksyank.finance.user.service.UserAccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.math.BigDecimal;
import java.util.List;

// TODO maybe refactor checkIfExists finGoal, probably move to service, think about it
// TODO A check user isn't necessary because you can just get that user and will see if it exists
// TODO validation if need
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

    // TODO A realization of amount field. When a deposit comes then calculate amount of finance goal
    @PostMapping
    public ResponseEntity save(
            @PathVariable("finGoalId") int financeGoalId,
            @RequestBody DepositSaveRequest depositToSave,
            @RequestParam("userId") int userId
    ) {
        this.checkIfUserExists(userId);
        try {
            this.depositProcess.processSave(depositToSave, financeGoalId, userId);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (NotFoundException ex) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, ex.getMessage(), ex);
        } catch (DbOperationException ex) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, ex.getMessage(), ex);
        }
    }

    @GetMapping("/{depositId}")
    public ResponseEntity<DepositResponse> getById(
            @PathVariable("finGoalId") int financeGoalId,
            @PathVariable("depositId") int depositId,
            @RequestParam("userId") int userId
    ) {
        this.checkIfUserExists(userId);
        try {
            final var response = this.depositProcess.processGetById(depositId, financeGoalId, userId);
            return ResponseEntity.ok(response);
        } catch (NotFoundException ex) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, ex.getMessage(), ex);
        }
    }

    @PatchMapping("/{depositId}")
    public void updateDescription(
            @PathVariable("finGoalId") int financeGoalId,
            @PathVariable("depositId") int depositId,
            @RequestParam("userId") int userId,
            @RequestParam("description") String description
    ) {
        this.checkIfUserExists(userId);
    }

    // TODO move the check of fin goal to service
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

    private void checkIfUserExists(int userId) {
        if (!this.userAccountService.checkIfExists(userId)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Entity 'User' not found by attribute 'id' = " + userId);
        }
    }
}

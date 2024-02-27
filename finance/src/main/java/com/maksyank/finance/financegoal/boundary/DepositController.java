package com.maksyank.finance.financegoal.boundary;

import com.maksyank.finance.financegoal.domain.request.DepositDescriptionRequest;
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
    public List<DepositViewResponse> getByPage(
            @PathVariable("finGoalId") int financeGoalId,
            @RequestParam("pageNumber") int pageNumber,
            @RequestParam("userId") int userId
    ) {
        this.checkIfUserExists(userId);
        try {
            return this.depositProcess.processGetByPage(financeGoalId, pageNumber, userId);
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
            return new ResponseEntity<>(HttpStatus.CREATED);
        } catch (NotFoundException ex) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, ex.getMessage(), ex);
        } catch (DbOperationException ex) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, ex.getMessage(), ex);
        }
    }

    @GetMapping("/{depositId}")
    public DepositResponse getById(
            @PathVariable("finGoalId") int financeGoalId,
            @PathVariable("depositId") int depositId,
            @RequestParam("userId") int userId
    ) {
        this.checkIfUserExists(userId);
        try {
            return this.depositProcess.processGetById(depositId, financeGoalId, userId);
        } catch (NotFoundException ex) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, ex.getMessage(), ex);
        }
    }

    // TODO add validation to description
    @PatchMapping("/{depositId}")
    public ResponseEntity updateDescription(
            @PathVariable("finGoalId") int financeGoalId,
            @PathVariable("depositId") int depositId,
            @RequestParam("userId") int userId,
            @RequestBody DepositDescriptionRequest descriptionToUpdateRequest
    ) {
        this.checkIfUserExists(userId);
        try {
            this.depositProcess.processUpdateDescription(depositId, financeGoalId, descriptionToUpdateRequest, userId);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (NotFoundException ex) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, ex.getMessage(), ex);
        } catch (DbOperationException ex) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, ex.getMessage(), ex);
        }
    }

    private void checkIfUserExists(int userId) {
        if (!this.userAccountService.checkIfExists(userId)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Entity 'User' not found by attribute 'id' = " + userId);
        }
    }
}

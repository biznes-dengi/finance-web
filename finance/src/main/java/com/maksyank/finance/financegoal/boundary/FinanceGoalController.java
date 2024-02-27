package com.maksyank.finance.financegoal.boundary;

import com.maksyank.finance.financegoal.boundary.request.FinGoalSaveRequest;
import com.maksyank.finance.financegoal.boundary.request.FinGoalUpdateRequest;
import com.maksyank.finance.financegoal.boundary.response.FinGoalResponse;
import com.maksyank.finance.financegoal.boundary.response.FinGoalViewResponse;
import com.maksyank.finance.financegoal.domain.enums.FinanceGoalState;
import com.maksyank.finance.financegoal.exception.DbOperationException;
import com.maksyank.finance.financegoal.exception.NotFoundException;
import com.maksyank.finance.financegoal.service.process.FinanceGoalProcess;
import com.maksyank.finance.user.service.UserAccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

// TODO remove bullshit impl as getting all time users (will fix when will realize security model)
// TODO delete end-point must have id user maybe (check when realize security)
// TODO for update & save will be better use not check  just get\find
// TODO think about toSave \ toUpdate (refactor) (naming)
// TODO refactor error handling
// TODO refactor user error handling
// TODO A check user isn't necessary because you can just get that user and will see if it exists
// TODO validation if need
@RestController
@RequestMapping("/financeGoal")
public class FinanceGoalController {
    private FinanceGoalProcess financeGoalProcess;
    private UserAccountService userAccountService;

    @Autowired
    FinanceGoalController(FinanceGoalProcess financeGoalProcess, UserAccountService userAccountService) {
        this.financeGoalProcess = financeGoalProcess;
        this.userAccountService = userAccountService;
    }

    @GetMapping()
    public List<FinGoalViewResponse> getByState(
            @RequestParam("state") FinanceGoalState state,
            @RequestParam("userId") int userId
    ) {
        this.checkIfUserExists(userId);
        try {
            return this.financeGoalProcess.processGetByState(state, userId);
        } catch (NotFoundException ex) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, ex.getMessage(), ex);
        }
    }

    @PostMapping()
    public ResponseEntity save(@RequestParam("userId") int userId, @RequestBody FinGoalSaveRequest toSave) {
        this.checkIfUserExists(userId);
        try {
            final var user = this.userAccountService.getById(userId);
            this.financeGoalProcess.processSave(toSave, user);
            return new ResponseEntity<>(HttpStatus.CREATED);
        } catch (DbOperationException ex) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, ex.getMessage(), ex);
        }
    }

    @GetMapping("/{finGoalId}")
    public FinGoalResponse getById(
            @PathVariable("finGoalId") int financeGoalId,
            @RequestParam("userId") int userId
    ) {
        this.checkIfUserExists(userId);
        try {
            return this.financeGoalProcess.processGetById(financeGoalId, userId);
        } catch (NotFoundException ex) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, ex.getMessage(), ex);
        }
    }

    @PutMapping("/{finGoalId}")
    public ResponseEntity update(
            @PathVariable("finGoalId") int financeGoalId,
            @RequestParam("userId") int userId,
            @RequestBody FinGoalUpdateRequest toUpdate
    ) {
        this.checkIfUserExists(userId);
        try {
            final var user = userAccountService.getById(userId);
            this.financeGoalProcess.processUpdate(financeGoalId, toUpdate, user);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (NotFoundException ex) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, ex.getMessage(), ex);
        } catch (DbOperationException ex) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, ex.getMessage(), ex);
        }
    }

    @DeleteMapping("/{finGoalId}")
    public ResponseEntity delete(@PathVariable("finGoalId") int financeGoalId, @RequestParam("userId") int userId) {
        this.checkIfUserExists(userId);
        try {
            this.financeGoalProcess.processDelete(financeGoalId);
            return new ResponseEntity<>(HttpStatus.OK);
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

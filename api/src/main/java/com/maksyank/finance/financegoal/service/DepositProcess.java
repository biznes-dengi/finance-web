package com.maksyank.finance.financegoal.service;

import com.maksyank.finance.financegoal.boundary.response.UpdatedStateFinGoal;
import com.maksyank.finance.financegoal.domain.Deposit;
import com.maksyank.finance.financegoal.domain.FinanceGoal;
import com.maksyank.finance.financegoal.boundary.request.DepositDescriptionRequest;
import com.maksyank.finance.financegoal.boundary.request.DepositSaveRequest;
import com.maksyank.finance.financegoal.boundary.response.DepositResponse;
import com.maksyank.finance.financegoal.boundary.response.DepositViewResponse;
import com.maksyank.finance.financegoal.exception.DbOperationException;
import com.maksyank.finance.financegoal.exception.NotFoundException;
import com.maksyank.finance.financegoal.mapper.DepositMapper;
import com.maksyank.finance.financegoal.mapper.FinanceGoalMapper;
import com.maksyank.finance.financegoal.persistence.DepositPersistence;
import com.maksyank.finance.financegoal.persistence.FinanceGoalPersistence;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
public class DepositProcess {
    private DepositPersistence depositPersistence;
    private FinanceGoalPersistence financeGoalPersistence;
    private FinanceGoalProcess financeGoalProcess;

    @Autowired
    DepositProcess(
            DepositPersistence depositPersistence,
            FinanceGoalPersistence financeGoalPersistence,
            FinanceGoalProcess financeGoalProcess
    ) {
        this.depositPersistence = depositPersistence;
        this.financeGoalPersistence = financeGoalPersistence;
        this.financeGoalProcess = financeGoalProcess;
    }

    public List<DepositViewResponse> processGetByPage(int financeGoalId, int pageNumber, int userId) throws NotFoundException {
        boolean ifExists = this.financeGoalPersistence.ifExistsByIdAndUserId(financeGoalId, userId);
        if (!ifExists) {
            throw new NotFoundException("Entity 'Finance Goal' not found by attribute 'financeGoalId' = " + financeGoalId);
        }

        final var foundDeposits = this.depositPersistence.findAllByFinanceGoalIdPageable(financeGoalId, pageNumber);
        return DepositMapper.entityToViewResponse(foundDeposits);
    }

    public UpdatedStateFinGoal processSave(DepositSaveRequest depositRequest, int financeGoalId, int userId) throws NotFoundException, DbOperationException {
        final var financeGoal = this.financeGoalProcess.updateBalance(depositRequest.amount(), financeGoalId, userId);
        final var depositToSave = DepositMapper.mapRequestToEntitySave(depositRequest, financeGoal);
        this.depositPersistence.save(depositToSave);
        return FinanceGoalMapper.mapToUpdateStateRequest(financeGoal);
    }

    public DepositResponse processGetById(int depositId, int financeGoalId, int userId) throws NotFoundException {
        final var financeGoal = this.financeGoalPersistence.findByIdAndUserId(financeGoalId, userId);
        final var foundDeposit = this.findDeposit(financeGoal, depositId);
        return DepositMapper.entityToResponse(foundDeposit);
    }

    public boolean processUpdateDescription(int depositId, int financeGoalId, DepositDescriptionRequest descriptionRequest, int userId) throws NotFoundException, DbOperationException {
        final var financeGoal = this.financeGoalPersistence.findByIdAndUserId(financeGoalId, userId);
        final var depositToUpdate = this.findDeposit(financeGoal, depositId);
        depositToUpdate.setDescription(descriptionRequest.description());
        return this.depositPersistence.save(depositToUpdate);
    }

    // TODO critical point. For big data troubles with time of response
    private Deposit findDeposit(FinanceGoal source, int depositId) throws NotFoundException {
        return source.getDeposits().stream()
                .filter(deposit -> deposit.getId() == depositId)
                .findFirst()
                .orElseThrow(() -> new NotFoundException("Entity 'Deposit' not found by attribute 'id' = " + depositId));
    }

    private void checkIfGoalAchieved(BigDecimal balance, BigDecimal goal) {

    }
}

package com.maksyank.finance.financegoal.service.process;

import com.maksyank.finance.financegoal.domain.common.Deposit;
import com.maksyank.finance.financegoal.domain.common.FinanceGoal;
import com.maksyank.finance.financegoal.domain.request.DepositDescriptionRequest;
import com.maksyank.finance.financegoal.domain.request.DepositSaveRequest;
import com.maksyank.finance.financegoal.domain.response.DepositResponse;
import com.maksyank.finance.financegoal.domain.response.DepositViewResponse;
import com.maksyank.finance.financegoal.exception.DbOperationException;
import com.maksyank.finance.financegoal.exception.NotFoundException;
import com.maksyank.finance.financegoal.mapper.DepositMapper;
import com.maksyank.finance.financegoal.service.repoimpl.DepositRepoImpl;
import com.maksyank.finance.financegoal.service.repoimpl.FinanceGoalRepoImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DepositProcess {
    private DepositRepoImpl depositRepoImpl;
    private FinanceGoalRepoImpl financeGoalRepoImpl;

    @Autowired
    DepositProcess(DepositRepoImpl depositRepoImpl, FinanceGoalRepoImpl financeGoalRepoImpl) {
        this.depositRepoImpl = depositRepoImpl;
        this.financeGoalRepoImpl = financeGoalRepoImpl;
    }

    public List<DepositViewResponse> processGetByPage(int financeGoalId, int pageNumber, int userId) throws NotFoundException {
        boolean ifExists = this.financeGoalRepoImpl.ifExistsByIdAndUserId(financeGoalId, userId);
        if (!ifExists) {
            throw new NotFoundException("Entity 'Finance Goal' not found by attribute 'financeGoalId' = " + financeGoalId);
        }

        final var foundDeposits = this.depositRepoImpl.findAllByFinanceGoalIdPageable(financeGoalId, pageNumber);
        return DepositMapper.entityToViewResponse(foundDeposits);
    }

    public boolean processSave(DepositSaveRequest depositRequest, int financeGoalId, int userId) throws NotFoundException, DbOperationException {
        final var financeGoal = this.financeGoalRepoImpl.findByIdAndUserId(financeGoalId, userId);
        final var depositToSave = DepositMapper.requestToEntitySave(depositRequest, financeGoal);
        return this.depositRepoImpl.save(depositToSave);
    }

    public DepositResponse processGetById(int depositId, int financeGoalId, int userId) throws NotFoundException {
        final var financeGoal = this.financeGoalRepoImpl.findByIdAndUserId(financeGoalId, userId);
        final var foundDeposit = this.findDeposit(financeGoal, depositId);
        return DepositMapper.entityToResponse(foundDeposit);
    }

    public boolean processUpdateDescription(int depositId, int financeGoalId, DepositDescriptionRequest descriptionRequest, int userId) throws NotFoundException, DbOperationException {
        final var financeGoal = this.financeGoalRepoImpl.findByIdAndUserId(financeGoalId, userId);
        final var depositToUpdate = this.findDeposit(financeGoal, depositId);
        depositToUpdate.setDescription(descriptionRequest.description());
        return this.depositRepoImpl.save(depositToUpdate);
    }

    // TODO critical point. For big data troubles with time of response
    private Deposit findDeposit(FinanceGoal source, int depositId) throws NotFoundException {
        return source.getDeposits().stream()
                .filter(deposit -> deposit.getId() == depositId)
                .findFirst()
                .orElseThrow(() -> new NotFoundException("Entity 'Deposit' not found by attribute 'id' = " + depositId));
    }
}

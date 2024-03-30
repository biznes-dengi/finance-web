package com.maksyank.finance.financegoal.service;

import com.maksyank.finance.financegoal.boundary.request.FinGoalSaveRequest;
import com.maksyank.finance.financegoal.boundary.request.FinGoalUpdateRequest;
import com.maksyank.finance.financegoal.boundary.response.FinGoalResponse;
import com.maksyank.finance.financegoal.boundary.response.FinGoalViewResponse;
import com.maksyank.finance.financegoal.domain.FinanceGoal;
import com.maksyank.finance.financegoal.domain.businessrules.InitRulesFinanceGoal;
import com.maksyank.finance.financegoal.domain.enums.FinanceGoalState;
import com.maksyank.finance.financegoal.exception.DbOperationException;
import com.maksyank.finance.financegoal.exception.NotFoundException;
import com.maksyank.finance.financegoal.mapper.FinanceGoalMapper;
import com.maksyank.finance.financegoal.persistence.DepositPersistence;
import com.maksyank.finance.financegoal.persistence.FinanceGoalPersistence;
import com.maksyank.finance.user.domain.UserAccount;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

// TODO add validation of all parameters of all methods
@Service
public class FinanceGoalProcess {
    private FinanceGoalPersistence financeGoalPersistence;
    private DepositPersistence depositPersistence;
    @Autowired
    FinanceGoalProcess(FinanceGoalPersistence financeGoalPersistence, DepositPersistence depositPersistence) {
        this.financeGoalPersistence = financeGoalPersistence;
        this.depositPersistence = depositPersistence;
    }

    public FinGoalResponse processGetById(int id, int userId) throws NotFoundException {
        final var foundFinanceGoal = this.financeGoalPersistence.findByIdAndUserId(id, userId);
        return FinanceGoalMapper.entityToResponse(foundFinanceGoal);
    }

    public List<FinGoalViewResponse> processGetByState(FinanceGoalState state, int userId) throws NotFoundException {
        final var foundFinanceGoals = this.financeGoalPersistence.findByStateAndUserId(state, userId);
        return FinanceGoalMapper.sourceToViewResponse(foundFinanceGoals);
    }

    public void processSave(FinGoalSaveRequest toSaveRequest, UserAccount user) throws DbOperationException {
        final var rulesFinanceGoal = new InitRulesFinanceGoal(FinanceGoalState.ACTIVE, BigDecimal.ZERO);
        final var financeGoalToSave = FinanceGoalMapper.requestToSourceSave(toSaveRequest, rulesFinanceGoal, user);
        this.financeGoalPersistence.save(financeGoalToSave);
    }

    public void processUpdate(int id, FinGoalUpdateRequest newFinanceGoal, UserAccount user)
            throws NotFoundException, DbOperationException
    {
        final var oldFinanceGoal = this.financeGoalPersistence.findByIdAndUserId(id, user.getId());
        final var updatedFinanceGoal = FinanceGoalMapper.mapToEntityUpdate(newFinanceGoal, oldFinanceGoal);
        this.financeGoalPersistence.save(updatedFinanceGoal);
    }

    public void processDelete(int id) throws DbOperationException {
        this.depositPersistence.removeAllByFinanceGoalId(id);
        this.financeGoalPersistence.deleteById(id);
    }

    public FinanceGoal updateBalance(BigDecimal depositAmount, int financeGoalId, int userId) throws NotFoundException, DbOperationException {
        final var foundFinanceGoal = this.financeGoalPersistence.findByIdAndUserId(financeGoalId, userId);
        final var newBalance = foundFinanceGoal.getBalance().add(depositAmount);
        foundFinanceGoal.setBalance(newBalance);

        if (newBalance.compareTo(foundFinanceGoal.getTargetAmount()) >= 0) {
            foundFinanceGoal.setState(FinanceGoalState.ACHIEVED);
        }
        this.financeGoalPersistence.save(foundFinanceGoal);
        
        return foundFinanceGoal;
    }
}

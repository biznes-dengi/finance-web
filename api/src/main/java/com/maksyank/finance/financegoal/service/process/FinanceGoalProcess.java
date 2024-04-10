package com.maksyank.finance.financegoal.service.process;

import com.maksyank.finance.financegoal.boundary.request.FinanceGoalRequest;
import com.maksyank.finance.financegoal.boundary.response.FinGoalResponse;
import com.maksyank.finance.financegoal.boundary.response.FinGoalViewResponse;
import com.maksyank.finance.financegoal.domain.FinanceGoal;
import com.maksyank.finance.financegoal.domain.businessrules.InitRulesFinanceGoal;
import com.maksyank.finance.financegoal.domain.enums.FinanceGoalState;
import com.maksyank.finance.financegoal.exception.DbOperationException;
import com.maksyank.finance.financegoal.exception.NotFoundException;
import com.maksyank.finance.financegoal.exception.ValidationException;
import com.maksyank.finance.financegoal.mapper.FinanceGoalMapper;
import com.maksyank.finance.financegoal.service.persistence.DepositPersistence;
import com.maksyank.finance.financegoal.service.persistence.FinanceGoalPersistence;
import com.maksyank.finance.financegoal.service.validation.FinanceGoalValidationService;
import com.maksyank.finance.user.domain.UserAccount;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
public class FinanceGoalProcess {
    private FinanceGoalPersistence financeGoalPersistence;
    private DepositPersistence depositPersistence;
    private FinanceGoalValidationService financeGoalValidationService;
    @Autowired
    FinanceGoalProcess(
            FinanceGoalPersistence financeGoalPersistence,
            DepositPersistence depositPersistence,
            FinanceGoalValidationService financeGoalValidationService
    ) {
        this.financeGoalPersistence = financeGoalPersistence;
        this.depositPersistence = depositPersistence;
        this.financeGoalValidationService = financeGoalValidationService;
    }

    public FinGoalResponse processGetById(int id, int userId) throws NotFoundException {
        final var foundFinanceGoal = this.financeGoalPersistence.findByIdAndUserId(id, userId);
        return FinanceGoalMapper.entityToResponse(foundFinanceGoal);
    }

    public List<FinGoalViewResponse> processGetByState(FinanceGoalState state, int userId) throws NotFoundException {
        final var foundFinanceGoals = this.financeGoalPersistence.findByStateAndUserId(state, userId);
        return FinanceGoalMapper.sourceToViewResponse(foundFinanceGoals);
    }

    public void processSave(FinanceGoalRequest finGoalToSave, UserAccount user) throws DbOperationException, ValidationException {
        final var resultOfValidation = this.financeGoalValidationService.validate(FinanceGoalMapper.mapToDto(finGoalToSave));
        if (resultOfValidation.notValid())
            throw new ValidationException(resultOfValidation.errorMsg());

        final var rulesFinanceGoal = new InitRulesFinanceGoal(FinanceGoalState.ACTIVE, BigDecimal.ZERO);
        final var newFinGoal = FinanceGoalMapper.mapToNewEntity(finGoalToSave, rulesFinanceGoal, user);
        this.financeGoalPersistence.save(newFinGoal);
    }

    public void processUpdate(int id, FinanceGoalRequest finGoalToSave, UserAccount user) throws NotFoundException, DbOperationException, ValidationException {
        final var resultOfValidation = this.financeGoalValidationService.validate(FinanceGoalMapper.mapToDto(finGoalToSave));
        if (resultOfValidation.notValid())
            throw new ValidationException(resultOfValidation.errorMsg());

        final var oldFinanceGoal = this.financeGoalPersistence.findByIdAndUserId(id, user.getId());
        final var updatedFinanceGoal = FinanceGoalMapper.mapToEntity(finGoalToSave, oldFinanceGoal);
        this.financeGoalPersistence.save(updatedFinanceGoal);
    }

    public void processDelete(int id) throws DbOperationException {
        this.depositPersistence.removeAllByFinanceGoalId(id);
        this.financeGoalPersistence.deleteById(id);
    }

    public FinanceGoal updateBalance(BigDecimal amountOfNewDeposit, int financeGoalId, int userId) throws NotFoundException, DbOperationException {
        final var finGoalForUpdateBalance = this.financeGoalPersistence.findByIdAndUserId(financeGoalId, userId);
        final var newBalance = finGoalForUpdateBalance.getBalance().add(amountOfNewDeposit);
        finGoalForUpdateBalance.setBalance(newBalance);

        if (newBalance.compareTo(finGoalForUpdateBalance.getTargetAmount()) >= 0) {
            finGoalForUpdateBalance.setState(FinanceGoalState.ACHIEVED);
        }
        this.financeGoalPersistence.save(finGoalForUpdateBalance);
        
        return finGoalForUpdateBalance;
    }
}

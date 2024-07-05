package com.maksyank.finance.saving.service.process;

import com.maksyank.finance.saving.boundary.response.SavingResponse;
import com.maksyank.finance.saving.boundary.response.SavingViewResponse;
import com.maksyank.finance.saving.domain.Saving;
import com.maksyank.finance.saving.domain.businessrules.InitRulesSaving;
import com.maksyank.finance.saving.domain.enums.SavingState;
import com.maksyank.finance.saving.dto.SavingDto;
import com.maksyank.finance.saving.exception.DbOperationException;
import com.maksyank.finance.saving.exception.NotFoundException;
import com.maksyank.finance.saving.exception.ValidationException;
import com.maksyank.finance.saving.mapper.SavingMapper;
import com.maksyank.finance.saving.service.persistence.DepositPersistence;
import com.maksyank.finance.saving.service.persistence.SavingPersistence;
import com.maksyank.finance.saving.service.validation.SavingValidationService;
import com.maksyank.finance.user.domain.UserAccount;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
public class SavingProcess {
    private SavingPersistence savingPersistence;
    private DepositPersistence depositPersistence;
    private SavingValidationService savingValidationService;
    @Autowired
    SavingProcess(
            SavingPersistence savingPersistence,
            DepositPersistence depositPersistence,
            SavingValidationService savingValidationService
    ) {
        this.savingPersistence = savingPersistence;
        this.depositPersistence = depositPersistence;
        this.savingValidationService = savingValidationService;
    }

    public SavingResponse processGetById(int id, int userId) throws NotFoundException {
        final var foundFinanceGoal = this.savingPersistence.findByIdAndUserId(id, userId);
        return SavingMapper.entityToResponse(foundFinanceGoal);
    }

    public List<SavingViewResponse> processGetByState(SavingState state, int userId) throws NotFoundException {
        final var foundFinanceGoals = this.savingPersistence.findByStateAndUserId(state, userId);
        return SavingMapper.sourceToViewResponse(foundFinanceGoals);
    }

    public void processSave(SavingDto finGoalToSaveDto, UserAccount user) throws DbOperationException, ValidationException {
        final var resultOfValidation = this.savingValidationService.validate(finGoalToSaveDto);
        if (resultOfValidation.notValid())
            throw new ValidationException(resultOfValidation.errorMsg());

        final var rulesFinanceGoal = new InitRulesSaving(SavingState.ACTIVE, BigDecimal.ZERO);
        final var newFinGoal = SavingMapper.mapToNewEntity(finGoalToSaveDto, rulesFinanceGoal, user);
        this.savingPersistence.save(newFinGoal);
    }

    public void processUpdate(int id, SavingDto finGoalToSaveDto, UserAccount user) throws NotFoundException, DbOperationException, ValidationException {
        final var resultOfValidation = this.savingValidationService.validate(finGoalToSaveDto);
        if (resultOfValidation.notValid())
            throw new ValidationException(resultOfValidation.errorMsg());

        final var oldFinanceGoal = this.savingPersistence.findByIdAndUserId(id, user.getId());
        final var updatedFinanceGoal = SavingMapper.mapToEntity(finGoalToSaveDto, oldFinanceGoal);
        this.savingPersistence.save(updatedFinanceGoal);
    }

    public void processDelete(int id) throws DbOperationException {
        this.depositPersistence.removeAllBySavingId(id);
        this.savingPersistence.deleteById(id);
    }

    public Saving updateBalance(BigDecimal amountOfNewDeposit, int financeGoalId, int userId) throws NotFoundException, DbOperationException {
        final var finGoalForUpdateBalance = this.savingPersistence.findByIdAndUserId(financeGoalId, userId);
        final var newBalance = finGoalForUpdateBalance.getBalance().add(amountOfNewDeposit);
        finGoalForUpdateBalance.setBalance(newBalance);

        if (newBalance.compareTo(finGoalForUpdateBalance.getTargetAmount()) >= 0) {
            finGoalForUpdateBalance.setState(SavingState.ACHIEVED);
        }
        this.savingPersistence.save(finGoalForUpdateBalance);
        
        return finGoalForUpdateBalance;
    }
}

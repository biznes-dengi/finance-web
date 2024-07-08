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
import com.maksyank.finance.saving.service.persistence.TransactionPersistence;
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
    private TransactionPersistence transactionPersistence;
    private SavingValidationService savingValidationService;
    @Autowired
    SavingProcess(
            SavingPersistence savingPersistence,
            TransactionPersistence transactionPersistence,
            SavingValidationService savingValidationService
    ) {
        this.savingPersistence = savingPersistence;
        this.transactionPersistence = transactionPersistence;
        this.savingValidationService = savingValidationService;
    }

    public SavingResponse processGetById(int id, int userId) throws NotFoundException {
        final var foundSaving = this.savingPersistence.findByIdAndUserId(id, userId);
        return SavingMapper.entityToResponse(foundSaving);
    }

    public List<SavingViewResponse> processGetByState(SavingState state, int userId) throws NotFoundException {
        final var foundSavings = this.savingPersistence.findByStateAndUserId(state, userId);
        return SavingMapper.sourceToViewResponse(foundSavings);
    }

    public void processSave(SavingDto finGoalToSaveDto, UserAccount user) throws DbOperationException, ValidationException {
        final var resultOfValidation = this.savingValidationService.validate(finGoalToSaveDto);
        if (resultOfValidation.notValid())
            throw new ValidationException(resultOfValidation.errorMsg());

        final var rulesSaving = new InitRulesSaving(SavingState.ACTIVE, BigDecimal.ZERO);
        final var newSaving = SavingMapper.mapToNewEntity(finGoalToSaveDto, rulesSaving, user);
        this.savingPersistence.save(newSaving);
    }

    public void processUpdate(int id, SavingDto finGoalToSaveDto, UserAccount user) throws NotFoundException, DbOperationException, ValidationException {
        final var resultOfValidation = this.savingValidationService.validate(finGoalToSaveDto);
        if (resultOfValidation.notValid())
            throw new ValidationException(resultOfValidation.errorMsg());

        final var oldSaving = this.savingPersistence.findByIdAndUserId(id, user.getId());
        final var updatedSaving = SavingMapper.mapToEntity(finGoalToSaveDto, oldSaving);
        this.savingPersistence.save(updatedSaving);
    }

    public void processDelete(int id) throws DbOperationException {
        this.transactionPersistence.removeAllBySavingId(id);
        this.savingPersistence.deleteById(id);
    }

    public Saving updateBalance(BigDecimal amountNewDeposit, int financeGoalId, int userId) throws NotFoundException, DbOperationException {
        final var savingForUpdateBalance = this.savingPersistence.findByIdAndUserId(financeGoalId, userId);
        final var newBalance = savingForUpdateBalance.getBalance().add(amountNewDeposit);
        savingForUpdateBalance.setBalance(newBalance);

        if (newBalance.compareTo(savingForUpdateBalance.getTargetAmount()) >= 0) {
            savingForUpdateBalance.setState(SavingState.ACHIEVED);
        }
        this.savingPersistence.save(savingForUpdateBalance);
        
        return savingForUpdateBalance;
    }
}

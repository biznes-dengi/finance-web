package com.maksyank.finance.saving.service.process;

import com.maksyank.finance.saving.boundary.response.StateOfSavingResponse;
import com.maksyank.finance.saving.domain.Deposit;
import com.maksyank.finance.saving.domain.Saving;
import com.maksyank.finance.saving.boundary.response.DepositResponse;
import com.maksyank.finance.saving.boundary.response.DepositViewResponse;
import com.maksyank.finance.saving.dto.DepositDto;
import com.maksyank.finance.saving.dto.DepositUpdateDto;
import com.maksyank.finance.saving.exception.DbOperationException;
import com.maksyank.finance.saving.exception.NotFoundException;
import com.maksyank.finance.saving.exception.ValidationException;
import com.maksyank.finance.saving.mapper.DepositMapper;
import com.maksyank.finance.saving.mapper.SavingMapper;
import com.maksyank.finance.saving.service.persistence.DepositPersistence;
import com.maksyank.finance.saving.service.persistence.SavingPersistence;
import com.maksyank.finance.saving.service.validation.DepositValidationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DepositProcess {
    private DepositPersistence depositPersistence;
    private SavingPersistence savingPersistence;
    private SavingProcess savingProcess;
    private DepositValidationService depositValidationService;

    @Autowired
    DepositProcess(
            DepositPersistence depositPersistence,
            SavingPersistence savingPersistence,
            SavingProcess savingProcess,
            DepositValidationService depositValidationService
    ) {
        this.depositPersistence = depositPersistence;
        this.savingPersistence = savingPersistence;
        this.savingProcess = savingProcess;
        this.depositValidationService = depositValidationService;
    }

    public List<DepositViewResponse> processGetByPage(int savingId, int pageNumber, int userId) throws NotFoundException {
        boolean ifExists = this.savingPersistence.ifExistsByIdAndUserId(savingId, userId);
        if (!ifExists) {
            throw new NotFoundException("Entity 'Finance Goal' not found by attribute 'savingId' = " + savingId);
        }

        final var foundDeposits = this.depositPersistence.findAllBySavingIdPageable(savingId, pageNumber);
        return DepositMapper.entityToViewResponse(foundDeposits);
    }

    public StateOfSavingResponse processSave(DepositDto depositToSaveDto, int financeGoalId, int userId) throws NotFoundException, DbOperationException, ValidationException {
        final var resultOfValidation = this.depositValidationService.validate(depositToSaveDto);
        if (resultOfValidation.notValid())
            throw new ValidationException(resultOfValidation.errorMsg());

        final var financeGoal = this.savingProcess.updateBalance(depositToSaveDto.amount(), financeGoalId, userId);
        final var depositToSave = DepositMapper.mapToNewEntity(depositToSaveDto, financeGoal);
        this.depositPersistence.save(depositToSave);

        return SavingMapper.mapToStateResponse(financeGoal);
    }

    public DepositResponse processGetById(int depositId, int financeGoalId, int userId) throws NotFoundException {
        final var financeGoal = this.savingPersistence.findByIdAndUserId(financeGoalId, userId);
        final var foundDeposit = this.findDeposit(financeGoal, depositId);
        return DepositMapper.entityToResponse(foundDeposit);
    }

    public boolean processUpdate(int depositId, int financeGoalId, DepositUpdateDto depositUpdateDto, int userId) throws NotFoundException, DbOperationException, ValidationException {
        final var resultOfValidation = this.depositValidationService.validate(depositUpdateDto);
        if (resultOfValidation.notValid())
            throw new ValidationException(resultOfValidation.errorMsg());

        final var financeGoal = this.savingPersistence.findByIdAndUserId(financeGoalId, userId);
        final var depositToUpdate = this.findDeposit(financeGoal, depositId);
        depositToUpdate.setDescription(depositUpdateDto.description());
        return this.depositPersistence.save(depositToUpdate);
    }

    // TODO critical point. For big data troubles with time of response
    private Deposit findDeposit(Saving source, int depositId) throws NotFoundException {
        return source.getDeposits().stream()
                .filter(deposit -> deposit.getId() == depositId)
                .findFirst()
                .orElseThrow(() -> new NotFoundException("Entity 'Deposit' not found by attribute 'id' = " + depositId));
    }
}

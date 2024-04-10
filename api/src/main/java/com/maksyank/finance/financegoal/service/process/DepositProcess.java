package com.maksyank.finance.financegoal.service.process;

import com.maksyank.finance.financegoal.boundary.response.StateOfFinGoalResponse;
import com.maksyank.finance.financegoal.domain.Deposit;
import com.maksyank.finance.financegoal.domain.FinanceGoal;
import com.maksyank.finance.financegoal.boundary.request.DepositUpdateRequest;
import com.maksyank.finance.financegoal.boundary.response.DepositResponse;
import com.maksyank.finance.financegoal.boundary.response.DepositViewResponse;
import com.maksyank.finance.financegoal.dto.DepositDto;
import com.maksyank.finance.financegoal.dto.DepositUpdateDto;
import com.maksyank.finance.financegoal.exception.DbOperationException;
import com.maksyank.finance.financegoal.exception.NotFoundException;
import com.maksyank.finance.financegoal.exception.ValidationException;
import com.maksyank.finance.financegoal.mapper.DepositMapper;
import com.maksyank.finance.financegoal.mapper.FinanceGoalMapper;
import com.maksyank.finance.financegoal.service.persistence.DepositPersistence;
import com.maksyank.finance.financegoal.service.persistence.FinanceGoalPersistence;
import com.maksyank.finance.financegoal.service.validation.DepositValidationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
public class DepositProcess {
    private DepositPersistence depositPersistence;
    private FinanceGoalPersistence financeGoalPersistence;
    private FinanceGoalProcess financeGoalProcess;
    private DepositValidationService depositValidationService;

    @Autowired
    DepositProcess(
            DepositPersistence depositPersistence,
            FinanceGoalPersistence financeGoalPersistence,
            FinanceGoalProcess financeGoalProcess,
            DepositValidationService depositValidationService
    ) {
        this.depositPersistence = depositPersistence;
        this.financeGoalPersistence = financeGoalPersistence;
        this.financeGoalProcess = financeGoalProcess;
        this.depositValidationService = depositValidationService;
    }

    public List<DepositViewResponse> processGetByPage(int financeGoalId, int pageNumber, int userId) throws NotFoundException {
        boolean ifExists = this.financeGoalPersistence.ifExistsByIdAndUserId(financeGoalId, userId);
        if (!ifExists) {
            throw new NotFoundException("Entity 'Finance Goal' not found by attribute 'financeGoalId' = " + financeGoalId);
        }

        final var foundDeposits = this.depositPersistence.findAllByFinanceGoalIdPageable(financeGoalId, pageNumber);
        return DepositMapper.entityToViewResponse(foundDeposits);
    }

    public StateOfFinGoalResponse processSave(DepositDto depositToSaveDto, int financeGoalId, int userId) throws NotFoundException, DbOperationException, ValidationException {
        final var resultOfValidation = this.depositValidationService.validate(depositToSaveDto);
        if (resultOfValidation.notValid())
            throw new ValidationException(resultOfValidation.errorMsg());

        final var financeGoal = this.financeGoalProcess.updateBalance(depositToSaveDto.amount(), financeGoalId, userId);
        final var depositToSave = DepositMapper.mapToNewEntity(depositToSaveDto, financeGoal);
        this.depositPersistence.save(depositToSave);

        return FinanceGoalMapper.mapToStateResponse(financeGoal);
    }

    public DepositResponse processGetById(int depositId, int financeGoalId, int userId) throws NotFoundException {
        final var financeGoal = this.financeGoalPersistence.findByIdAndUserId(financeGoalId, userId);
        final var foundDeposit = this.findDeposit(financeGoal, depositId);
        return DepositMapper.entityToResponse(foundDeposit);
    }

    public boolean processUpdate(int depositId, int financeGoalId, DepositUpdateDto depositUpdateDto, int userId) throws NotFoundException, DbOperationException, ValidationException {
        final var resultOfValidation = this.depositValidationService.validate(depositUpdateDto);
        if (resultOfValidation.notValid())
            throw new ValidationException(resultOfValidation.errorMsg());

        final var financeGoal = this.financeGoalPersistence.findByIdAndUserId(financeGoalId, userId);
        final var depositToUpdate = this.findDeposit(financeGoal, depositId);
        depositToUpdate.setDescription(depositUpdateDto.description());
        return this.depositPersistence.save(depositToUpdate);
    }

    // TODO critical point. For big data troubles with time of response
    private Deposit findDeposit(FinanceGoal source, int depositId) throws NotFoundException {
        return source.getDeposits().stream()
                .filter(deposit -> deposit.getId() == depositId)
                .findFirst()
                .orElseThrow(() -> new NotFoundException("Entity 'Deposit' not found by attribute 'id' = " + depositId));
    }
}

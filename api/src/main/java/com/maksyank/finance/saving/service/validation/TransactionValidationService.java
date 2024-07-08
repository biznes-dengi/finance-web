package com.maksyank.finance.saving.service.validation;

import com.maksyank.finance.saving.dto.TransactionDto;
import com.maksyank.finance.saving.dto.TransactionUpdateDto;
import com.maksyank.finance.saving.service.validation.step.ValidationStep;
import com.maksyank.finance.saving.service.validation.step.deposit.AmountValidationStep;
import jakarta.validation.Validator;
import org.springframework.stereotype.Service;

@Service
public class TransactionValidationService extends ValidationService {
    private final ValidationStep<TransactionDto> transactionDtoPathValidation;

    TransactionValidationService(Validator validator) {
        super(validator);
        this.transactionDtoPathValidation = new AmountValidationStep();
    }

    public ValidationResult validate(TransactionDto toValidate) {
        final var result = this.validateConstraint(toValidate);
        if (result.notValid())
            return result;

        return this.transactionDtoPathValidation.validate(toValidate);
    }

    public ValidationResult validate(TransactionUpdateDto toValidate) {
        return this.validateConstraint(toValidate);
    }
}

package com.maksyank.finance.financegoal.service.validation;

import com.maksyank.finance.financegoal.dto.DepositDto;
import com.maksyank.finance.financegoal.dto.DepositUpdateDto;
import com.maksyank.finance.financegoal.service.validation.step.ValidationStep;
import com.maksyank.finance.financegoal.service.validation.step.deposit.AmountValidationStep;
import jakarta.validation.Validator;
import org.springframework.stereotype.Service;

@Service
public class DepositValidationService extends ValidationService {
    private final ValidationStep<DepositDto> depositDtoPathValidation;

    DepositValidationService(Validator validator) {
        super(validator);
        this.depositDtoPathValidation = new AmountValidationStep();
    }

    public ValidationResult validate(DepositDto toValidate) {
        final var result = this.validateConstraint(toValidate);
        if (result.notValid())
            return result;

        return this.depositDtoPathValidation.validate(toValidate);
    }

    public ValidationResult validate(DepositUpdateDto toValidate) {
        return this.validateConstraint(toValidate);
    }
}

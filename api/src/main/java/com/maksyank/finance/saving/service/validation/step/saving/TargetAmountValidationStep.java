package com.maksyank.finance.saving.service.validation.step.saving;

import com.maksyank.finance.saving.dto.SavingDto;
import com.maksyank.finance.saving.service.validation.ValidationResult;
import com.maksyank.finance.saving.service.validation.step.ValidationStep;

import java.math.BigDecimal;

public class TargetAmountValidationStep extends ValidationStep<SavingDto> {
    @Override
    public ValidationResult validate(SavingDto toValidate) {
        // 01 Check on NULL, TargetAmount is optional field
        if (toValidate.targetAmount() == null) {
            return this.checkNext(toValidate);
        }

        // 02 Check if TargetAmount is positive
        if (toValidate.targetAmount().compareTo(BigDecimal.ZERO) <= 0) {
            return ValidationResult.invalid("The 'target_amount' field must contain positive number.");
        }

        // 03 Check if TargetAmount has one or two digits after comma
        if (toValidate.targetAmount().scale() != 1 && toValidate.targetAmount().scale() != 2) {
            return ValidationResult.invalid("The 'target_amount' field must contain one or two digits after a decimal point.");
        }

        return this.checkNext(toValidate);
    }
}

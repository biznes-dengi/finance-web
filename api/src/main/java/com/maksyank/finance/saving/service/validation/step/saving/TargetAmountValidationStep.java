package com.maksyank.finance.saving.service.validation.step.saving;

import com.maksyank.finance.saving.dto.SavingDto;
import com.maksyank.finance.saving.service.validation.ValidationResult;
import com.maksyank.finance.saving.service.validation.step.ValidationStep;

public class TargetAmountValidationStep extends ValidationStep<SavingDto> {
    @Override
    public ValidationResult validate(SavingDto toValidate) {
        if (toValidate.targetAmount().scale() != 2) {
            return ValidationResult.invalid("The 'target_amount' field must contain two digits after a decimal point.");
        }
        return this.checkNext(toValidate);
    }
}

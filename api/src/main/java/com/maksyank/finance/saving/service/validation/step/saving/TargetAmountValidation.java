package com.maksyank.finance.saving.service.validation.step.saving;

import com.maksyank.finance.saving.dto.SavingDto;
import com.maksyank.finance.saving.service.validation.ValidationResult;
import com.maksyank.finance.saving.service.validation.step.ValidationStep;

import java.math.BigDecimal;

/**
 * If the field is NULL then pass: TRUE
 */
public class TargetAmountValidation {
    public static class StepValidIfPositive extends ValidationStep<SavingDto> {
        @Override
        public ValidationResult validate(SavingDto toValidate) {
            if (toValidate.targetAmount() == null)
                return this.checkNext(toValidate);

            if (toValidate.targetAmount().compareTo(BigDecimal.ZERO) <= 0) {
                return ValidationResult.invalid("The 'target_amount' field must contain positive number.");
            }
            return this.checkNext(toValidate);
        }
    }
    public static class StepValidIfScaleOneOrTwo extends ValidationStep<SavingDto> {
        @Override
        public ValidationResult validate(SavingDto toValidate) {
            if (toValidate.targetAmount() == null)
                return this.checkNext(toValidate);

            if (toValidate.targetAmount().scale() != 1 && toValidate.targetAmount().scale() != 2) {
                return ValidationResult.invalid("The 'target_amount' field must contain one or two digits after a decimal point.");
            }
            return this.checkNext(toValidate);
        }
    }
}
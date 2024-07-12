package com.maksyank.finance.saving.service.validation.step.saving;

import com.maksyank.finance.saving.dto.SavingDto;
import com.maksyank.finance.saving.service.validation.ValidationResult;
import com.maksyank.finance.saving.service.validation.step.ValidationStep;

import java.time.LocalDate;

public class DeadlineValidationStep extends ValidationStep<SavingDto> {
    @Override
    public ValidationResult validate(SavingDto toValidate) {
        // 01 Check if Deadline exists without TargetAmount
        if (toValidate.targetAmount() == null && toValidate.deadline() != null) {
            return ValidationResult.invalid("The 'deadline' field ");
        }

        // 02 Check if NULL, Deadline is optional field
        if (toValidate.deadline() == null) {
            return this.checkNext(toValidate);
        }

        // 03 Deadline must have a date that is greater than the current day
        LocalDate currentDate = LocalDate.now();
        if (toValidate.deadline().isBefore(currentDate) || toValidate.deadline().isEqual(currentDate)) {
            return ValidationResult.invalid("The 'deadline' field must contain at least the next day.");
        }

        return this.checkNext(toValidate);
    }
}

package com.maksyank.finance.saving.service.validation.step.saving;

import com.maksyank.finance.saving.dto.SavingDto;
import com.maksyank.finance.saving.service.validation.ValidationResult;
import com.maksyank.finance.saving.service.validation.step.ValidationStep;

import java.time.LocalDate;

public class DeadlineValidationStep extends ValidationStep<SavingDto> {
    @Override
    public ValidationResult validate(SavingDto toValidate) {
        if (toValidate.deadline() != null) {
            LocalDate currentDate = LocalDate.now();
            if (toValidate.deadline().isBefore(currentDate) || toValidate.deadline().isEqual(currentDate)) {
                return ValidationResult.invalid("The 'deadline' field must contain at least the next day.");
            }
        }
        return this.checkNext(toValidate);
    }
}

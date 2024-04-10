package com.maksyank.finance.financegoal.service.validation.step;

import com.maksyank.finance.financegoal.dto.FinanceGoalDto;
import com.maksyank.finance.financegoal.service.validation.ValidationResult;

import java.time.LocalDate;

public class DeadlineValidationStep extends ValidationStep<FinanceGoalDto> {
    @Override
    public ValidationResult validate(FinanceGoalDto toValidate) {
        if (toValidate.deadline() != null) {
            LocalDate currentDate = LocalDate.now();
            if (toValidate.deadline().isBefore(currentDate) || toValidate.deadline().isEqual(currentDate)) {
                return ValidationResult.invalid("The 'deadline' field must contain at least the next day.");
            }
        }
        return this.checkNext(toValidate);
    }
}

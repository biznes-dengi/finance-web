package com.maksyank.finance.financegoal.service.validation.step;

import com.maksyank.finance.financegoal.dto.FinanceGoalDto;
import com.maksyank.finance.financegoal.service.validation.ValidationResult;

public class TargetAmountValidationStep extends ValidationStep<FinanceGoalDto> {
    @Override
    public ValidationResult validate(FinanceGoalDto toValidate) {
        if (toValidate.targetAmount().scale() != 2) {
            return ValidationResult.invalid("The 'target_amount' field must contain two digits after a decimal point.");
        }
        return this.checkNext(toValidate);
    }
}

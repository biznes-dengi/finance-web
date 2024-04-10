package com.maksyank.finance.financegoal.service.validation;

import com.maksyank.finance.financegoal.dto.FinanceGoalDto;
import com.maksyank.finance.financegoal.service.validation.step.*;
import org.springframework.stereotype.Service;

@Service
public class FinanceGoalValidationService implements ValidationService<FinanceGoalDto> {
    private final ValidationStep<FinanceGoalDto> defaultPathValidation;

    FinanceGoalValidationService() {
        this.defaultPathValidation = new ConstraintValidationStep()
                .linkWith(new TargetAmountValidationStep())
                .linkWith(new DeadlineValidationStep())
                .linkWith(new ImageValidationStep());
    }

    @Override
    public ValidationResult validate(FinanceGoalDto financeGoalDto) {
        return this.defaultPathValidation.validate(financeGoalDto);
    }
}

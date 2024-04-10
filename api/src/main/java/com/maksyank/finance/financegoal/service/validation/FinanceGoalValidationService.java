package com.maksyank.finance.financegoal.service.validation;

import com.maksyank.finance.financegoal.dto.FinanceGoalDto;
import com.maksyank.finance.financegoal.service.validation.step.*;
import com.maksyank.finance.financegoal.service.validation.step.financegoal.DeadlineValidationStep;
import com.maksyank.finance.financegoal.service.validation.step.financegoal.ImageValidationStep;
import com.maksyank.finance.financegoal.service.validation.step.financegoal.TargetAmountValidationStep;
import jakarta.validation.Validator;
import org.springframework.stereotype.Service;

@Service
public class FinanceGoalValidationService extends ValidationService {
    private final ValidationStep<FinanceGoalDto> defaultPathValidation;

    FinanceGoalValidationService(Validator validator) {
        super(validator);
        this.defaultPathValidation = new TargetAmountValidationStep()
                .linkWith(new DeadlineValidationStep())
                .linkWith(new ImageValidationStep());
    }

    public ValidationResult validate(FinanceGoalDto toValidate) {
        final var result = this.validateConstraint(toValidate);
        if (result.notValid()) return result;

        return this.defaultPathValidation.validate(toValidate);
    }
}

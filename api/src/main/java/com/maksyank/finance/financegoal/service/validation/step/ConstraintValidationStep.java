package com.maksyank.finance.financegoal.service.validation.step;

import com.maksyank.finance.financegoal.dto.FinanceGoalDto;
import com.maksyank.finance.financegoal.service.validation.ValidationResult;
import jakarta.validation.Validation;
import jakarta.validation.Validator;
import jakarta.validation.ValidatorFactory;

public class ConstraintValidationStep extends ValidationStep<FinanceGoalDto> {
    private final ValidatorFactory factory;
    private final Validator validator;

    public ConstraintValidationStep() {
        this.factory = Validation.buildDefaultValidatorFactory();
        this.validator = factory.getValidator();
    }

    @Override
    public ValidationResult validate(FinanceGoalDto toValidate) {
        final var result = this.validator.validate(toValidate);
        if (!result.isEmpty()) {
            return ValidationResult.invalid(result.iterator().next().getMessage());
        }
        return this.checkNext(toValidate);
    }
}

package com.maksyank.finance.saving.service.validation;

import com.maksyank.finance.saving.dto.SavingDto;
import com.maksyank.finance.saving.service.validation.step.*;
import com.maksyank.finance.saving.service.validation.step.saving.DeadlineValidationStep;
import com.maksyank.finance.saving.service.validation.step.saving.ImageValidationStep;
import com.maksyank.finance.saving.service.validation.step.saving.TargetAmountValidationStep;
import jakarta.validation.Validator;
import org.springframework.stereotype.Service;

@Service
public class SavingValidationService extends ValidationService {
    private final ValidationStep<SavingDto> defaultPathValidation;

    SavingValidationService(Validator validator) {
        super(validator);
        this.defaultPathValidation = new TargetAmountValidationStep()
                .linkWith(new DeadlineValidationStep())
                .linkWith(new ImageValidationStep());
    }

    public ValidationResult validate(SavingDto toValidate) {
        final var result = this.validateConstraint(toValidate);
        if (result.notValid()) return result;

        return this.defaultPathValidation.validate(toValidate);
    }
}

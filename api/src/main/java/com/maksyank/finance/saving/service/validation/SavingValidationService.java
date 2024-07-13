package com.maksyank.finance.saving.service.validation;

import com.maksyank.finance.saving.dto.SavingDto;
import com.maksyank.finance.saving.service.validation.step.*;
import com.maksyank.finance.saving.service.validation.step.saving.DeadlineValidationStep;
import com.maksyank.finance.saving.service.validation.step.saving.ImageTypeValidationStep;
import com.maksyank.finance.saving.service.validation.step.saving.ImageValidationStep;
import com.maksyank.finance.saving.service.validation.step.saving.TargetAmountValidationStep;
import jakarta.validation.Validator;
import org.springframework.stereotype.Service;

@Service
public class SavingValidationService extends ValidationService {
    private final ValidationStep<SavingDto> defaultValidationPath;

    SavingValidationService(Validator validator) {
        super(validator);
        this.defaultValidationPath = new TargetAmountValidationStep()
                .linkWith(new DeadlineValidationStep())
                .linkWith(new ImageValidationStep())
                .linkWith(new ImageTypeValidationStep());
    }

    public ValidationResult validate(SavingDto toValidate) {
        final var result = this.validateConstraint(toValidate);
        if (result.notValid()) return result;

        return this.defaultValidationPath.validate(toValidate);
    }
}

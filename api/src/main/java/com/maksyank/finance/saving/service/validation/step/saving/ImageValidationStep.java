package com.maksyank.finance.saving.service.validation.step.saving;

import com.maksyank.finance.saving.dto.SavingDto;
import com.maksyank.finance.saving.service.validation.ValidationResult;
import com.maksyank.finance.saving.service.validation.step.ValidationStep;

public class ImageValidationStep extends ValidationStep<SavingDto> {
    @Override
    public ValidationResult validate(SavingDto toValidate) {
        if (toValidate.image() == null && toValidate.imageType() != null || toValidate.image() != null && toValidate.imageType() == null) {
            return ValidationResult.invalid("Specify the image file type in the field 'type_image'.");
        }
        return this.checkNext(toValidate);
    }
}

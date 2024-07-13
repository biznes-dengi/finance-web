package com.maksyank.finance.saving.service.validation.step.saving;

import com.maksyank.finance.saving.dto.SavingDto;
import com.maksyank.finance.saving.service.validation.ValidationResult;
import com.maksyank.finance.saving.service.validation.step.ValidationStep;

public class ImageTypeValidationStep extends ValidationStep<SavingDto> {

    @Override
    public ValidationResult validate(SavingDto toValidate) {
        // 01 Check if TypeImage exists without Image
        if (toValidate.image() == null && toValidate.imageType() != null || toValidate.image() != null && toValidate.imageType() == null) {
            return ValidationResult.invalid("The 'ImageType' field can not exist without field 'Image'");
        }

        return this.checkNext(toValidate);
    }
}

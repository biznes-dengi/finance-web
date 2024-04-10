package com.maksyank.finance.financegoal.service.validation.step;

import com.maksyank.finance.financegoal.dto.FinanceGoalDto;
import com.maksyank.finance.financegoal.service.validation.ValidationResult;

public class ImageValidationStep extends ValidationStep<FinanceGoalDto> {
    @Override
    public ValidationResult validate(FinanceGoalDto toValidate) {
        if (toValidate.image() == null && toValidate.imageType() != null || toValidate.image() != null && toValidate.imageType() == null) {
            return ValidationResult.invalid("Specify the image file type in the field 'type_image'.");
        }
        return this.checkNext(toValidate);
    }
}

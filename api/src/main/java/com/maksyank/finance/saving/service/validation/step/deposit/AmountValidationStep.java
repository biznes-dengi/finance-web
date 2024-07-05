package com.maksyank.finance.saving.service.validation.step.deposit;

import com.maksyank.finance.saving.domain.enums.DepositType;
import com.maksyank.finance.saving.dto.DepositDto;
import com.maksyank.finance.saving.service.validation.ValidationResult;
import com.maksyank.finance.saving.service.validation.step.ValidationStep;

import java.math.BigDecimal;

public class AmountValidationStep extends ValidationStep<DepositDto> {
    @Override
    public ValidationResult validate(DepositDto toValidate) {
        if (toValidate.amount().scale() != 2)
            return ValidationResult.invalid("The 'amount' field must contain two digits after a decimal point.");

        if ((toValidate.type() == DepositType.FUND && toValidate.amount().compareTo(BigDecimal.ZERO) < 0) ||
                (toValidate.type() == DepositType.WITHDRAW && toValidate.amount().compareTo(BigDecimal.ZERO) > 0))
            return ValidationResult.invalid("The 'amount' field contain wrong value.");

        return this.checkNext(toValidate);
    }
}

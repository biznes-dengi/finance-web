package com.maksyank.finance.saving.service.validation.step.transaction;

import com.maksyank.finance.saving.domain.enums.TransactionType;
import com.maksyank.finance.saving.dto.TransactionDto;
import com.maksyank.finance.saving.service.validation.ValidationResult;
import com.maksyank.finance.saving.service.validation.step.ValidationStep;

import java.math.BigDecimal;

public class AmountValidationStep {
    /**
     * Check if amount field has one or two digits after comma.
     */
    public static class AmountValidationStepScale extends ValidationStep<TransactionDto> {
        @Override
        public ValidationResult validate(TransactionDto toValidate) {
            if (toValidate.amount().scale() != 1 && toValidate.amount().scale() != 2)
                return ValidationResult.invalid("The 'amount' field must contain one or two digits after a decimal point.");

            return this.checkNext(toValidate);
        }
    }

    /**
     * Check if amount field is correct regrading deposit and withdraw types, deposit = positive amount, withdraw = negative amount.
     */
    public static class AmountValidationStepCorrectValue extends ValidationStep<TransactionDto> {
        @Override
        public ValidationResult validate(TransactionDto toValidate) {
            if ((toValidate.type() == TransactionType.DEPOSIT)) {
                if ((toValidate.amount().compareTo(BigDecimal.ZERO) < 0) || (toValidate.amount().compareTo(BigDecimal.ZERO) == 0)) {
                    return ValidationResult.invalid("The 'amount' field contain no correct value.");
                }
            }
            if ((toValidate.type() == TransactionType.WITHDRAW)) {
                if ((toValidate.amount().compareTo(BigDecimal.ZERO) > 0) || (toValidate.amount().compareTo(BigDecimal.ZERO) == 0)) {
                    return ValidationResult.invalid("The 'amount' field contain no correct value.");
                }
            }

            return this.checkNext(toValidate);
        }

    }
}

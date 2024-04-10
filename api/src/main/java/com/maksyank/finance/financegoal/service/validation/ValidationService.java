package com.maksyank.finance.financegoal.service.validation;

import com.maksyank.finance.financegoal.dto.FinanceGoalDto;

public interface ValidationService<T> {
    ValidationResult validate(T toValidate);
}

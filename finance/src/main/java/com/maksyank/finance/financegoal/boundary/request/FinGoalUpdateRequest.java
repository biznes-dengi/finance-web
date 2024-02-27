package com.maksyank.finance.financegoal.boundary.request;

import com.maksyank.finance.financegoal.domain.enums.CurrencyCode;
import com.maksyank.finance.financegoal.domain.enums.FinanceGoalState;
import com.maksyank.finance.financegoal.domain.enums.RiskProfileType;

import java.math.BigDecimal;
import java.time.LocalDateTime;

// TODO if there wasn't deadline then it is null
public record FinGoalUpdateRequest(
        String title,
        FinanceGoalState state,
        CurrencyCode currency,
        BigDecimal amount,
        String description,
        BigDecimal targetAmount,
        LocalDateTime deadline,
        RiskProfileType riskProfile,
        LocalDateTime createdOn,
        LocalDateTime lastChange
) { }

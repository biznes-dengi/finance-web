package com.maksyank.finance.financegoal.boundary.request;

import com.maksyank.finance.financegoal.domain.enums.CurrencyCode;
import com.maksyank.finance.financegoal.domain.enums.FinanceGoalState;
import com.maksyank.finance.financegoal.domain.enums.RiskProfileType;

import java.math.BigDecimal;
import java.time.LocalDateTime;

// TODO deadline must be optional
public record FinGoalSaveRequest(
        String title,
        FinanceGoalState state,
        CurrencyCode currency,
        String description,
        BigDecimal targetAmount,
        LocalDateTime deadline,
        RiskProfileType riskProfile,
        LocalDateTime createdOn
) { }
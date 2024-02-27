package com.maksyank.finance.financegoal.boundary.response;

import com.maksyank.finance.financegoal.domain.enums.FinanceGoalState;
import com.maksyank.finance.financegoal.domain.enums.RiskProfileType;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record FinGoalResponse(
        int id,
        String title,
        FinanceGoalState state,
        String description,
        BigDecimal amount,
        BigDecimal targetAmount,
        LocalDateTime deadline,
        RiskProfileType riskProfile
) { }

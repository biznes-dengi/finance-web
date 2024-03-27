package com.maksyank.finance.financegoal.boundary.response;

import com.maksyank.finance.financegoal.domain.enums.FinanceGoalState;
import com.maksyank.finance.financegoal.domain.enums.RiskProfileType;

import java.math.BigDecimal;
import java.time.LocalDate;

public record FinGoalResponse(
        int id,
        String title,
        FinanceGoalState state,
        String description,
        BigDecimal amount,
        BigDecimal targetAmount,
        LocalDate deadline,
        RiskProfileType riskProfile,
        String image
) { }

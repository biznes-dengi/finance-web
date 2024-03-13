package com.maksyank.finance.financegoal.boundary.response;

import com.maksyank.finance.financegoal.domain.enums.FinanceGoalState;

import java.math.BigDecimal;

public record UpdatedStateFinGoal(
        BigDecimal balance,
        FinanceGoalState state
) { }

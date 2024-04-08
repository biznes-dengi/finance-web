package com.maksyank.finance.financegoal.domain.businessrules;

import com.maksyank.finance.financegoal.domain.enums.FinanceGoalState;

import java.math.BigDecimal;

public record InitRulesFinanceGoal(
        FinanceGoalState state,
        BigDecimal balance
) { }

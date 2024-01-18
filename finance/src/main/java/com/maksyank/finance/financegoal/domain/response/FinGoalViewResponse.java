package com.maksyank.finance.financegoal.domain.response;

import java.math.BigDecimal;

public record FinGoalViewResponse(
        int id,
        String title,
        BigDecimal amount,
        BigDecimal targetAmount
) { }

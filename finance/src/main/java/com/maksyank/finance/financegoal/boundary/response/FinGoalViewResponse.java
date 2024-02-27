package com.maksyank.finance.financegoal.boundary.response;

import java.math.BigDecimal;

public record FinGoalViewResponse(
        int id,
        String title,
        BigDecimal amount,
        BigDecimal targetAmount
) { }

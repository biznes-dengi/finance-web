package com.maksyank.finance.financegoal.boundary.request;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record FinGoalUpdateRequest(
        String title,
        String state,
        String currency,
        BigDecimal amount,
        String description,
        BigDecimal targetAmount,
        LocalDateTime deadline,
        String riskProfile,
        LocalDateTime createdOn,
        LocalDateTime lastChange
) { }

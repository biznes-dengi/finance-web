package com.maksyank.finance.financegoal.domain.request;

import java.math.BigDecimal;
import java.time.LocalDateTime;

// TO DO enum: currency, riskProfile, state
public record FinGoalSaveRequest(
        String title,
        String state,
        String currency,
        String description,
        BigDecimal targetAmount,
        LocalDateTime deadline,
        String riskProfile,
        LocalDateTime createdOn
) { }
package com.maksyank.finance.financegoal.domain.response;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record FinGoalResponse(
        int id,
        String title,
        String state,
        String description,
        BigDecimal amount,
        BigDecimal targetAmount,
        LocalDateTime deadline,
        String riskProfile
) { }

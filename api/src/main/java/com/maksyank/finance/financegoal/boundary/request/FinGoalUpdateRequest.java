package com.maksyank.finance.financegoal.boundary.request;

import com.maksyank.finance.financegoal.domain.enums.CurrencyCode;
import com.maksyank.finance.financegoal.domain.enums.RiskProfileType;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

// TODO if there wasn't deadline then it is null
public record FinGoalUpdateRequest(
        String title,
        CurrencyCode currency,
        String description,
        BigDecimal targetAmount,
        LocalDate deadline,
        RiskProfileType riskProfile,
        String image,
        String imageType,
        LocalDateTime createdOn,
        LocalDateTime lastChange
) { }

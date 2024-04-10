package com.maksyank.finance.financegoal.dto;

import com.maksyank.finance.financegoal.domain.enums.CurrencyCode;
import com.maksyank.finance.financegoal.domain.enums.ImageType;
import com.maksyank.finance.financegoal.domain.enums.RiskProfileType;
import jakarta.validation.constraints.*;

import java.math.BigDecimal;
import java.time.LocalDate;

public record FinanceGoalDto(
        @Size(min = 3, max = 25)
        @NotBlank
        String title,
        @NotNull
        CurrencyCode currency,
        @Size(max = 100)
        String description,
        @NotNull
        @Positive
        BigDecimal targetAmount,
        LocalDate deadline,
        RiskProfileType riskProfile,
        String image,
        ImageType imageType
) { }

package com.maksyank.finance.financegoal.dto;

import com.maksyank.finance.financegoal.domain.enums.DepositType;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record DepositDto (
        @NotNull
        DepositType type,
        @Size(max = 100)
        String description,
        LocalDateTime fundingDate,
        @NotNull
        BigDecimal amount
) { }

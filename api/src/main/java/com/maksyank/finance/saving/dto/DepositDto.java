package com.maksyank.finance.saving.dto;

import com.maksyank.finance.saving.domain.enums.DepositType;
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

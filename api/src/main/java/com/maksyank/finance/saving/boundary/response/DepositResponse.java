package com.maksyank.finance.saving.boundary.response;

import com.maksyank.finance.saving.domain.enums.DepositType;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record DepositResponse(
        int id,
        DepositType type,
        String description,
        LocalDateTime fundingDate,
        BigDecimal amount
) { }

package com.maksyank.finance.saving.boundary.response;

import com.maksyank.finance.saving.domain.enums.DepositType;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record DepositViewResponse(
        int id,
        DepositType type,
        LocalDateTime fundingDate,
        BigDecimal amount
) { }

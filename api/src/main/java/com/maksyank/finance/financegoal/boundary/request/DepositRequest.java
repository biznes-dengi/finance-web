package com.maksyank.finance.financegoal.boundary.request;

import com.maksyank.finance.financegoal.domain.enums.DepositType;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record DepositRequest(
        DepositType type,
        String description,
        LocalDateTime fundingDate,
        BigDecimal amount
) { }

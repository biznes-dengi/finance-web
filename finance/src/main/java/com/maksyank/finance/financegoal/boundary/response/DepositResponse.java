package com.maksyank.finance.financegoal.boundary.response;

import com.maksyank.finance.financegoal.domain.enums.TransactionType;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record DepositResponse(
        int id,
        TransactionType type,
        String description,
        LocalDateTime fundingDate,
        BigDecimal amount
) { }

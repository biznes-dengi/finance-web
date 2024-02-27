package com.maksyank.finance.financegoal.boundary.request;

import com.maksyank.finance.financegoal.domain.enums.TransactionType;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record DepositSaveRequest(
        TransactionType type,
        String description,
        LocalDateTime fundingDate,
        BigDecimal amount
) { }

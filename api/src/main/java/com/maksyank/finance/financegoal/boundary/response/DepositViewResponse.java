package com.maksyank.finance.financegoal.boundary.response;

import com.maksyank.finance.financegoal.domain.enums.TransactionType;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record DepositViewResponse(
        int id,
        TransactionType type,
        LocalDateTime fundingDate,
        BigDecimal amount
) { }

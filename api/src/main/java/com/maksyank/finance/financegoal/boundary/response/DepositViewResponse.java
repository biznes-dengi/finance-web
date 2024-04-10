package com.maksyank.finance.financegoal.boundary.response;

import com.maksyank.finance.financegoal.domain.enums.DepositType;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record DepositViewResponse(
        int id,
        DepositType type,
        LocalDateTime fundingDate,
        BigDecimal amount
) { }

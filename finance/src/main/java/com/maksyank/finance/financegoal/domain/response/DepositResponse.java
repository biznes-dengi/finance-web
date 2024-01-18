package com.maksyank.finance.financegoal.domain.response;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record DepositResponse(
        int id,
        String type,
        String description,
        LocalDateTime fundingDate,
        BigDecimal amount
) { }

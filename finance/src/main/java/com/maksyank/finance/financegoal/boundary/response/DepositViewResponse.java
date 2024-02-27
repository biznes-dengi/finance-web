package com.maksyank.finance.financegoal.boundary.response;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record DepositViewResponse(
        int id,
        String type,
        LocalDateTime fundingDate,
        BigDecimal amount
) { }

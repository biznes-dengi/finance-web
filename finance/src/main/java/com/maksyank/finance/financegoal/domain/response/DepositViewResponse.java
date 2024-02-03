package com.maksyank.finance.financegoal.domain.response;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record DepositViewResponse(
        int id,
        String type,
        LocalDateTime fundingDate,
        BigDecimal amount
) { }

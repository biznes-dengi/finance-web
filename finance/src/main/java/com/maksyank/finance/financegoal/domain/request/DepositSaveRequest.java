package com.maksyank.finance.financegoal.domain.request;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record DepositSaveRequest(
        String type,
        String description,
        LocalDateTime fundingDate,
        BigDecimal amount
) { }

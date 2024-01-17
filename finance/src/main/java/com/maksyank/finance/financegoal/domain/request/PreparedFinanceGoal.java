package com.maksyank.finance.financegoal.domain.request;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

// TO DO refactor name
@Data
public class PreparedFinanceGoal {
    private int userId;
    private String title;
    // TO DO must be enum
    private String description;
    private String currency;
    private BigDecimal targetAmount;
    private LocalDateTime deadline;
    private LocalDateTime createdOn;
    // TO DO must be enum
    private String riskProfile;
}

package com.maksyank.finance.financegoal.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class FinanceGoalDTO {
    private int id;
    private String title;
    private String state;
    private String description;
    private BigDecimal amount;
    private BigDecimal targetAmount;
    private LocalDateTime deadline;
    private String riskProfile;
    private LocalDateTime createdOn;
    private LocalDateTime lastChange;
}

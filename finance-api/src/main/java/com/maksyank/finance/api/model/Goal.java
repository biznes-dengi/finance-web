package com.maksyank.finance.api.model;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
public class Goal {
    private int id;
    private String title;
    private String state;
    private String description;
    private BigDecimal targetAmount;
    private LocalDate deadline;
    private LocalDateTime createdOn;
    private LocalDateTime lastChange;
    private Portfolio portfolio;
}

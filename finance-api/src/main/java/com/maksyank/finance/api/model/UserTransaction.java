package com.maksyank.finance.api.model;

import com.maksyank.finance.api.model.base.BaseUserTransaction;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class UserTransaction extends BaseUserTransaction {
    private String title;
    private String description;
    private BigDecimal value;
    private LocalDateTime dateOfAction;
    private String category;
}

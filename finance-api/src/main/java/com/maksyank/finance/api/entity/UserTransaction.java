package com.maksyank.finance.api.entity;

import com.maksyank.finance.api.entity.base.BaseUserTransaction;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class UserTransaction extends BaseUserTransaction {
    private String title;
    private String description;
    private BigDecimal value;
    private LocalDateTime dateOfAction;
    private String category;
}

package com.maksyank.finance.api.entity;

import com.maksyank.finance.api.entity.base.BaseBill;
import lombok.Data;

import java.math.BigDecimal;
import java.util.Collection;

public class Bill extends BaseBill {
    private BigDecimal value;
    private Collection<UserTransaction> userTransaction;
}

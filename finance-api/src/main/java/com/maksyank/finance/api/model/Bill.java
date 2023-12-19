package com.maksyank.finance.api.model;

import com.maksyank.finance.api.model.base.BaseBill;
import lombok.Data;

import java.math.BigDecimal;
import java.util.Collection;

@Data
public class Bill extends BaseBill {
    private BigDecimal value;
    private Collection<UserTransaction> userTransaction;
}

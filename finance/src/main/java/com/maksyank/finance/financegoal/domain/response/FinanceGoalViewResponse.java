package com.maksyank.finance.financegoal.domain.response;

import java.math.BigDecimal;

public record FinanceGoalViewResponse(int id, String title, BigDecimal amount, BigDecimal targetAmount) { }

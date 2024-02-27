package com.maksyank.finance.financegoal.domain.common.enums;

public enum FinanceGoalState {
    ACTIVE("ACTIVE"), ACHIEVED("ACHIEVED");
    public final String state;
    FinanceGoalState(String state) {
        this.state = state;
    }
}

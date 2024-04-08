package com.maksyank.finance.financegoal.domain.enums;

public enum FinanceGoalState {
    ACTIVE("ACTIVE"), ACHIEVED("ACHIEVED");
    public final String state;
    FinanceGoalState(String state) {
        this.state = state;
    }
}

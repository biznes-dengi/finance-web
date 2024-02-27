package com.maksyank.finance.financegoal.domain.common.enums;

public enum FinanceGoalState {
    ACTIVE("ACTIVE"), ACHIEVED("ACHIEVED");
    private final String state;
    FinanceGoalState(String state) {
        this.state = state;
    }

    public String getState() { return state; }
}

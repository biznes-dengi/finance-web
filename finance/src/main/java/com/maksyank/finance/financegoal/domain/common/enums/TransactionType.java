package com.maksyank.finance.financegoal.domain.common.enums;

public enum TransactionType {
    FUND("FUND"), WITHDRAW("WITHDRAW");
    private final String type;
    TransactionType(String type) { this.type = type; }

    public String getType() { return type; }
}

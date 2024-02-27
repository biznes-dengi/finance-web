package com.maksyank.finance.financegoal.domain.common.enums;

public enum TransactionType {
    FUND("FUND"), WITHDRAW("WITHDRAW");
    public final String type;
    TransactionType(String type) { this.type = type; }
}

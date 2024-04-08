package com.maksyank.finance.financegoal.domain.enums;

public enum RiskProfileType {
    CONSERVATIVE("conservative"), MODERATE("moderate"), AGGRESSIVE("aggressive");
    public final String type;
    RiskProfileType(String type) {
        this.type = type;
    }
}

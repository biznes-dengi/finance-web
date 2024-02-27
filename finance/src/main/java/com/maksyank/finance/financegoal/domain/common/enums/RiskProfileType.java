package com.maksyank.finance.financegoal.domain.common.enums;

public enum RiskProfileType {
    CONSERVATIVE("conservative"), MODERATE("moderate"), AGGRESSIVE("aggressive");
    private final String type;
    RiskProfileType(String type) {
        this.type = type;
    }

    public String getType() { return type; }
}

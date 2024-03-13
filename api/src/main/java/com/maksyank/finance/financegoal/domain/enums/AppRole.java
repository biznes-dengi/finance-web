package com.maksyank.finance.financegoal.domain.enums;

public enum AppRole {
    ADMIN("admin"), USER("user");
    public final String role;
    AppRole(String role) {
        this.role = role;
    }
}

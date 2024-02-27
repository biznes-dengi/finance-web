package com.maksyank.finance.financegoal.domain.common.enums;

public enum AppRole {
    ADMIN("admin"), USER("user");
    private String role;
    AppRole(String role) {
        this.role = role;
    }

    public String getRole() { return role; }
}

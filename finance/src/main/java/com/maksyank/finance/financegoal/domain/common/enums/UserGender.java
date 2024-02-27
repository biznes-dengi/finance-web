package com.maksyank.finance.financegoal.domain.common.enums;

public enum UserGender {
    MALE("male"), FEMALE("female");
    private final String gender;
    UserGender(String gender) {
        this.gender = gender;
    }

    public String getGender() { return gender; }
}

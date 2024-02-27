package com.maksyank.finance.financegoal.domain.common.enums;

// TODO add naming to each currency
public enum CurrencyCode {
    EUR("EUR"), USD("USD"), PLN("PLN"), BYN("BYN"), RUB("RUB");
    private final String code;
    CurrencyCode(String code) {
        this.code = code;
    }

    public String getCode() { return code; }
}

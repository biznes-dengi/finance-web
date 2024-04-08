package com.maksyank.finance.financegoal.domain.enums;

// TODO add naming to each currency
public enum CurrencyCode {
    EUR("EUR"), USD("USD"), PLN("PLN"), BYN("BYN"), RUB("RUB");
    public final String code;
    CurrencyCode(String code) {
        this.code = code;
    }
}

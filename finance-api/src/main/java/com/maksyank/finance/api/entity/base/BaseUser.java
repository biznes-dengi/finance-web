package com.maksyank.finance.api.entity.base;

public abstract class BaseUser {
    protected abstract int getId();
    protected abstract String getRole();
    protected abstract String getEmail();
    protected abstract String getPass();

}

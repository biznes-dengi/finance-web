package com.maksyank.finance.api.model;

import com.maksyank.finance.api.model.base.BaseUser;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.Collection;

@Data
public class Account extends BaseUser {
    private String phoneNumber;
    private String firstName;
    private String lastName;
    private LocalDateTime createdOn;
    private LocalDateTime lastLogin;
    private Collection<Portfolio> portfolio;
    private Collection<Bill> bill;
    private Collection<Goal> goal;
}

package com.maksyank.finance.saving.service;

import com.maksyank.finance.saving.domain.Deposit;
import com.maksyank.finance.saving.domain.Saving;
import com.maksyank.finance.saving.domain.enums.DepositType;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public class GeneratorDataSaving {

    public static Saving getTestData_testUpdateBalance_0() {
        Saving saving = new Saving();
        List<Deposit> deposits = new ArrayList<>();
        deposits.add(new Deposit(DepositType.FUND, "test", LocalDateTime.of(2023, 3, 10, 10, 0), new BigDecimal("932.02"), saving));
        deposits.add(new Deposit(DepositType.WITHDRAW, "test", LocalDateTime.of(2023, 3, 11, 9, 0), new BigDecimal("-150.22"), saving));
        deposits.add(new Deposit(DepositType.FUND, "test", LocalDateTime.of(2023, 3, 12, 6, 0), new BigDecimal("222.23"), saving));
        deposits.add(new Deposit(DepositType.WITHDRAW, "test", LocalDateTime.of(2023, 3, 13, 12, 0), new BigDecimal("-99.12"), saving));
        deposits.add(new Deposit(DepositType.FUND, "test", LocalDateTime.of(2023, 3, 14, 15, 0), new BigDecimal("428.93"), saving));
        deposits.add(new Deposit(DepositType.WITHDRAW, "test", LocalDateTime.of(2023, 3, 5, 18, 0), new BigDecimal("-104.54"), saving));

        deposits.add(new Deposit(DepositType.FUND, "test", LocalDateTime.of(2023, 5, 10, 10, 0), new BigDecimal("44.21"), saving));
        deposits.add(new Deposit(DepositType.WITHDRAW, "test", LocalDateTime.of(2023, 5, 11, 9, 0), new BigDecimal("-88.22"), saving));
        deposits.add(new Deposit(DepositType.FUND, "test", LocalDateTime.of(2023, 5, 12, 6, 0), new BigDecimal("-222.23"), saving));
        deposits.add(new Deposit(DepositType.WITHDRAW, "test", LocalDateTime.of(2023, 5, 13, 12, 0), new BigDecimal("-991.12"), saving));
        deposits.add(new Deposit(DepositType.FUND, "test", LocalDateTime.of(2023, 5, 14, 15, 0), new BigDecimal("1092.97"), saving));
        deposits.add(new Deposit(DepositType.WITHDRAW, "test", LocalDateTime.of(2023, 5, 5, 18, 0), new BigDecimal("-104.54"), saving));
        saving.setDeposits(deposits);
        return saving;
    }

    // public static Saving getTestData_testUpdateBalance_1() {}
}

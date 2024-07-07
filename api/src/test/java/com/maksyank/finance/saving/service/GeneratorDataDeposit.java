package com.maksyank.finance.saving.service;

import com.maksyank.finance.saving.domain.Deposit;
import com.maksyank.finance.saving.domain.Saving;
import com.maksyank.finance.saving.domain.enums.DepositType;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public class GeneratorDataDeposit {

    public static Saving getTestData_testProcessGetFundAmountByMonth_01() {
        Saving saving = new Saving();
        List<Deposit> deposits = new ArrayList<>();
        deposits.add(new Deposit(DepositType.FUND, "test", LocalDateTime.of(2023, 1, 10, 18, 20), new BigDecimal("102.88"), saving));
        deposits.add(new Deposit(DepositType.FUND, "test", LocalDateTime.of(2023, 2, 13, 21, 44), new BigDecimal("1402.02"), saving));
        deposits.add(new Deposit(DepositType.FUND, "test", LocalDateTime.of(2023, 2, 28, 23, 59), new BigDecimal("505.02"), saving));
        deposits.add(new Deposit(
                DepositType.FUND, "test",
                LocalDateTime.of(2023, 3, 1, 0, 0),
                new BigDecimal("932.02"),
                saving)
        );
        deposits.add(new Deposit(
                DepositType.FUND, "test",
                LocalDateTime.of(2023, 3, 10, 10, 0),
                new BigDecimal("932.02"),
                saving)
        );
        deposits.add(new Deposit(
                DepositType.WITHDRAW, "test",
                LocalDateTime.of(2023, 3, 11, 9, 0),
                new BigDecimal("-150.22"),
                saving)
        );
        deposits.add(new Deposit(
                DepositType.FUND, "test",
                LocalDateTime.of(2023, 3, 12, 6, 0),
                new BigDecimal("222.23"),
                saving)
        );
        deposits.add(new Deposit(
                DepositType.WITHDRAW, "test",
                LocalDateTime.of(2023, 3, 13, 12, 0),
                new BigDecimal("-99.12"),
                saving)
        );
        deposits.add(new Deposit(
                DepositType.FUND, "test",
                LocalDateTime.of(2023, 3, 14, 15, 0),
                new BigDecimal("428.93"),
                saving)
        );
        deposits.add(new Deposit(
                DepositType.WITHDRAW, "test",
                LocalDateTime.of(2023, 3, 22, 18, 0),
                new BigDecimal("-104.54"), saving)
        );
        deposits.add(new Deposit(
                DepositType.FUND, "test",
                LocalDateTime.of(2023, 3, 31, 23, 59),
                new BigDecimal("932.02"), saving)
        );
        deposits.add(new Deposit(DepositType.FUND, "test", LocalDateTime.of(2023, 4, 1, 0, 0), new BigDecimal("809.32"), saving));
        deposits.add(new Deposit(DepositType.FUND, "test", LocalDateTime.of(2023, 4, 15, 11, 20), new BigDecimal("1222.82"), saving));
        deposits.add(new Deposit(DepositType.FUND, "test", LocalDateTime.of(2023, 5, 16, 12, 25), new BigDecimal("762.32"), saving));
        saving.setDeposits(deposits);
        return saving;
    }

    public static Saving getTestData_testProcessGetFundAmountByMonth_02() {
        Saving saving = new Saving();
        List<Deposit> deposits = new ArrayList<>();
        deposits.add(new Deposit(DepositType.FUND, "test", LocalDateTime.of(2023, 1, 10, 10, 0), new BigDecimal("932.02"), saving));
        deposits.add(new Deposit(DepositType.WITHDRAW, "test", LocalDateTime.of(2023, 1, 11, 9, 0), new BigDecimal("-150.22"), saving));
        deposits.add(new Deposit(DepositType.FUND, "test", LocalDateTime.of(2023, 1, 12, 6, 0), new BigDecimal("222.23"), saving));
        deposits.add(new Deposit(DepositType.WITHDRAW, "test", LocalDateTime.of(2023, 1, 13, 12, 0), new BigDecimal("-99.12"), saving));
        deposits.add(new Deposit(DepositType.FUND, "test", LocalDateTime.of(2023, 1, 14, 15, 0), new BigDecimal("428.93"), saving));
        deposits.add(new Deposit(DepositType.WITHDRAW, "test", LocalDateTime.of(2023, 1, 5, 18, 0), new BigDecimal("-104.54"), saving));
        saving.setDeposits(deposits);
        return saving;
    }

    public static Saving getTestData_testFindDeposit_01() {
        Saving saving = new Saving();
        List<Deposit> deposits = new ArrayList<>();
        deposits.add(new Deposit(101, DepositType.FUND, "test", LocalDateTime.of(2023, 1, 10, 10, 0), new BigDecimal("932.02"), saving));
        deposits.add(new Deposit(102, DepositType.WITHDRAW, "test", LocalDateTime.of(2023, 1, 11, 9, 0), new BigDecimal("-150.22"), saving));
        deposits.add(new Deposit(103, DepositType.FUND, "test", LocalDateTime.of(2023, 1, 12, 6, 0), new BigDecimal("222.23"), saving));
        deposits.add(new Deposit(104, DepositType.WITHDRAW, "test", LocalDateTime.of(2023, 1, 13, 12, 0), new BigDecimal("-99.12"), saving));
        deposits.add(new Deposit(105, DepositType.FUND, "test", LocalDateTime.of(2023, 1, 14, 15, 0), new BigDecimal("428.93"), saving));
        deposits.add(new Deposit(106, DepositType.WITHDRAW, "test", LocalDateTime.of(2023, 1, 5, 18, 0), new BigDecimal("-104.54"), saving));
        saving.setDeposits(deposits);
        return saving;
    }

    public static Saving getTestData_testFindDeposit_02() {
        Saving saving = new Saving();
        List<Deposit> deposits = new ArrayList<>();
        deposits.add(new Deposit(DepositType.FUND, "test", LocalDateTime.of(2023, 1, 10, 10, 0), new BigDecimal("932.02"), saving));
        deposits.add(new Deposit(DepositType.WITHDRAW, "test", LocalDateTime.of(2023, 1, 11, 9, 0), new BigDecimal("-150.22"), saving));
        deposits.add(new Deposit(DepositType.FUND, "test", LocalDateTime.of(2023, 1, 12, 6, 0), new BigDecimal("222.23"), saving));
        deposits.add(new Deposit(DepositType.WITHDRAW, "test", LocalDateTime.of(2023, 1, 13, 12, 0), new BigDecimal("-99.12"), saving));
        deposits.add(new Deposit(DepositType.FUND, "test", LocalDateTime.of(2023, 1, 14, 15, 0), new BigDecimal("428.93"), saving));
        deposits.add(new Deposit(DepositType.WITHDRAW, "test", LocalDateTime.of(2023, 1, 5, 18, 0), new BigDecimal("-104.54"), saving));
        saving.setDeposits(deposits);
        return saving;
    }
}

package com.maksyank.finance.saving.service;

import com.maksyank.finance.saving.domain.Transaction;
import com.maksyank.finance.saving.domain.Saving;
import com.maksyank.finance.saving.domain.enums.CurrencyCode;
import com.maksyank.finance.saving.domain.enums.ImageType;
import com.maksyank.finance.saving.domain.enums.RiskProfileType;
import com.maksyank.finance.saving.domain.enums.TransactionType;
import com.maksyank.finance.saving.dto.SavingDto;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public class GeneratorDataSaving {

    public static Saving getTestData_testUpdateBalance_0() {
        Saving saving = new Saving();
        List<Transaction> transactions = new ArrayList<>();
        transactions.add(new Transaction(TransactionType.DEPOSIT, "test", LocalDateTime.of(2023, 3, 10, 10, 0), new BigDecimal("932.02"), saving));
        transactions.add(new Transaction(TransactionType.WITHDRAW, "test", LocalDateTime.of(2023, 3, 11, 9, 0), new BigDecimal("-150.22"), saving));
        transactions.add(new Transaction(TransactionType.DEPOSIT, "test", LocalDateTime.of(2023, 3, 12, 6, 0), new BigDecimal("222.23"), saving));
        transactions.add(new Transaction(TransactionType.WITHDRAW, "test", LocalDateTime.of(2023, 3, 13, 12, 0), new BigDecimal("-99.12"), saving));
        transactions.add(new Transaction(TransactionType.DEPOSIT, "test", LocalDateTime.of(2023, 3, 14, 15, 0), new BigDecimal("428.93"), saving));
        transactions.add(new Transaction(TransactionType.WITHDRAW, "test", LocalDateTime.of(2023, 3, 5, 18, 0), new BigDecimal("-104.54"), saving));

        transactions.add(new Transaction(TransactionType.DEPOSIT, "test", LocalDateTime.of(2023, 5, 10, 10, 0), new BigDecimal("44.21"), saving));
        transactions.add(new Transaction(TransactionType.WITHDRAW, "test", LocalDateTime.of(2023, 5, 11, 9, 0), new BigDecimal("-88.22"), saving));
        transactions.add(new Transaction(TransactionType.DEPOSIT, "test", LocalDateTime.of(2023, 5, 12, 6, 0), new BigDecimal("-222.23"), saving));
        transactions.add(new Transaction(TransactionType.WITHDRAW, "test", LocalDateTime.of(2023, 5, 13, 12, 0), new BigDecimal("-991.12"), saving));
        transactions.add(new Transaction(TransactionType.DEPOSIT, "test", LocalDateTime.of(2023, 5, 14, 15, 0), new BigDecimal("1092.97"), saving));
        transactions.add(new Transaction(TransactionType.WITHDRAW, "test", LocalDateTime.of(2023, 5, 5, 18, 0), new BigDecimal("-104.54"), saving));
        saving.setTransactions(transactions);
        return saving;
    }

    // public static Saving getTestData_testUpdateBalance_1() {}

    public static SavingDto getTestData_testTargetAmountValidationStep_01() {
        return new SavingDto(
                "test",
                CurrencyCode.EUR,
                "test",
                null,
                LocalDate.of(2025, 8, 18),
                RiskProfileType.MODERATE,
                "",
                ImageType.JPEG
        );
    }

    public static SavingDto getTestData_testTargetAmountValidationStep_02() {
        return new SavingDto(
                "test",
                CurrencyCode.EUR,
                "test",
                BigDecimal.ZERO,
                LocalDate.of(2025, 8, 18),
                RiskProfileType.MODERATE,
                "",
                ImageType.JPEG
        );
    }

    public static SavingDto getTestData_testTargetAmountValidationStep_03() {
        return new SavingDto(
                "test",
                CurrencyCode.EUR,
                "test",
                BigDecimal.valueOf(-120.03),
                LocalDate.of(2025, 8, 18),
                RiskProfileType.MODERATE,
                "",
                ImageType.JPEG
        );
    }

    public static SavingDto getTestData_testTargetAmountValidationStep_04() {
        return new SavingDto(
                "test",
                CurrencyCode.EUR,
                "test",
                BigDecimal.valueOf(120),
                LocalDate.of(2025, 8, 18),
                RiskProfileType.MODERATE,
                "",
                ImageType.JPEG
        );
    }

    public static SavingDto getTestData_testTargetAmountValidationStep_05() {
        return new SavingDto(
                "test",
                CurrencyCode.EUR,
                "test",
                BigDecimal.valueOf(120.1),
                LocalDate.of(2025, 8, 18),
                RiskProfileType.MODERATE,
                "",
                ImageType.JPEG
        );
    }

    public static SavingDto getTestData_testTargetAmountValidationStep_06() {
        return new SavingDto(
                "test",
                CurrencyCode.EUR,
                "test",
                BigDecimal.valueOf(120.182),
                LocalDate.of(2025, 8, 18),
                RiskProfileType.MODERATE,
                "",
                ImageType.JPEG
        );
    }

    public static SavingDto getTestData_testTargetAmountValidationStep_07() {
        return new SavingDto(
                "test",
                CurrencyCode.EUR,
                "test",
                BigDecimal.valueOf(120.18),
                LocalDate.of(2025, 8, 18),
                RiskProfileType.MODERATE,
                "",
                ImageType.JPEG
        );
    }
}

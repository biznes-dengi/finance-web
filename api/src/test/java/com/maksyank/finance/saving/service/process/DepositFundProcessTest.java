package com.maksyank.finance.saving.service.process;

import com.maksyank.finance.saving.exception.NotFoundException;
import com.maksyank.finance.saving.service.GeneratorDataDeposit;
import com.maksyank.finance.saving.service.persistence.SavingPersistence;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.when;
import static org.junit.jupiter.api.Assertions.assertEquals;

@ExtendWith(MockitoExtension.class)
public class DepositFundProcessTest {
    @Mock
    private SavingPersistence savingPersistence;
    @InjectMocks
    private DepositFundProcess depositFundProcess;

    @Test
    @DisplayName("Check if fund deposits will be summed correctly")
    void testProcessGetFundAmountByMonth_01() throws NotFoundException {
        // Given
        final int year = 2023;
        final int month = 3;
        final var saving = GeneratorDataDeposit.getTestData_testProcessGetFundAmountByMonth_01();

        // When
        when(savingPersistence.findByIdAndUserId(Mockito.anyInt(), Mockito.anyInt())).thenReturn(saving);
        final var result = depositFundProcess.processGetFundAmountByMonth(1, year, month,1);

        // Then
        assertEquals(BigDecimal.valueOf(3447.22), result);
    }

    @Test
    @DisplayName("Check if it will throw NotFoundException, if the month do not have any deposits")
    void testProcessGetFundAmountByMonth_02() throws NotFoundException {
        // Given
        final int year = 2023;
        final int month = 8;
        final var saving = GeneratorDataDeposit.getTestData_testProcessGetFundAmountByMonth_02();

        // When
        when(savingPersistence.findByIdAndUserId(Mockito.anyInt(), Mockito.anyInt())).thenReturn(saving);

        // Then
        assertThrows(NotFoundException.class,
                () -> depositFundProcess.processGetFundAmountByMonth(1, year, month,1));
    }
}

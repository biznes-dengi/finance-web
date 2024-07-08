package com.maksyank.finance.saving.service.process;

import com.maksyank.finance.saving.exception.NotFoundException;
import com.maksyank.finance.saving.service.GeneratorDataDeposit;
import com.maksyank.finance.saving.service.persistence.DepositPersistence;
import com.maksyank.finance.saving.service.persistence.SavingPersistence;
import com.maksyank.finance.saving.service.validation.DepositValidationService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.when;
import static org.junit.jupiter.api.Assertions.assertEquals;

@ExtendWith(MockitoExtension.class)
public class DepositProcessTest {
    @Mock
    private DepositPersistence depositPersistence;
    @Mock
    private SavingPersistence savingPersistence;
    @Mock
    private SavingProcess savingProcess;
    @Mock
    private DepositValidationService depositValidationService;
    @InjectMocks
    private DepositProcess depositProcess;

    @Test
    @DisplayName("Check if it will be found deposit by id")
    void testFindDeposit_01() throws NotFoundException {
        // Given
        final int expectedId = 102;
        final int mockedSavingId = 1;
        final int mockerUserId = 1;
        final var saving = GeneratorDataDeposit.getTestData_testFindDeposit_01();

        // When
        when(savingPersistence.findByIdAndUserId(Mockito.anyInt(), Mockito.anyInt())).thenReturn(saving);
        final var result = this.depositProcess.processGetById(expectedId, mockedSavingId, mockerUserId);

        // Then
        assertEquals(expectedId, result.id());
    }

    @Test
    @DisplayName("Check if it will throw NotFoundException, if it will search deposit by not exist id")
    void testFindDeposit_02() throws NotFoundException {
        // Given
        final int expectedId = 11;
        final int mockedSavingId = 1;
        final int mockerUserId = 1;
        final var saving = GeneratorDataDeposit.getTestData_testFindDeposit_02();

        // When
        when(savingPersistence.findByIdAndUserId(Mockito.anyInt(), Mockito.anyInt())).thenReturn(saving);

        // Then
        assertThrows(NotFoundException.class,
                () -> this.depositProcess.processGetById(expectedId, mockedSavingId, mockerUserId));
    }
}

package com.maksyank.finance.saving.service.process;

import com.maksyank.finance.saving.service.persistence.TransactionPersistence;
import com.maksyank.finance.saving.service.persistence.SavingPersistence;
import com.maksyank.finance.saving.service.validation.SavingValidationService;
import com.maksyank.finance.user.service.UserAccountService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
public class SavingProcessTest {
    @Mock
    private SavingPersistence savingPersistence;
    @Mock
    private TransactionPersistence transactionPersistence;
    @Mock
    private SavingValidationService savingValidationService;
    @Mock
    private UserAccountService userAccountService;
    @InjectMocks
    private SavingProcess savingProcess;

    @Test
    @DisplayName("Check if the new deposit value is correctly calculating balance")
    void testUpdateBalance_0() {
        // Given
        // When
        // Then
    }

    @Test
    @DisplayName("Check if it will change status to ACHIEVED")
    void testUpdateBalance_1() {
        // Given
        // When
        // Then
    }
}

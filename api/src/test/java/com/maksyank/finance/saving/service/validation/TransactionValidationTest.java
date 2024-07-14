package com.maksyank.finance.saving.service.validation;

import com.maksyank.finance.saving.dto.TransactionDto;
import com.maksyank.finance.saving.service.GeneratorDataTransaction;
import com.maksyank.finance.saving.service.validation.step.ValidationStep;
import com.maksyank.finance.saving.service.validation.step.transaction.AmountValidationStep;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

public class TransactionValidationTest {
    @Test
    @DisplayName(value = "Test Amount step, check if the amount has no digits after comma")
    public void testAmountValidationStep_01() {
        // Given
        ValidationStep<TransactionDto> stepAmount = new AmountValidationStep.AmountValidationStepScale();
        final var transactionDtoToValid = GeneratorDataTransaction.getTestData_testAmountValidationStep_01();

        // When
        final var response = stepAmount.validate(transactionDtoToValid);

        // Then
        assertFalse(response.isValid());
        assertEquals("The 'amount' field must contain one or two digits after a decimal point.", response.errorMsg());
    }

    @Test
    @DisplayName(value = "Test Amount step, check if the amount has three digits after comma")
    public void testAmountValidationStep_02() {
        // Given
        ValidationStep<TransactionDto> stepAmount = new AmountValidationStep.AmountValidationStepScale();
        final var transactionDtoToValid = GeneratorDataTransaction.getTestData_testAmountValidationStep_02();

        // When
        final var response = stepAmount.validate(transactionDtoToValid);

        // Then
        assertFalse(response.isValid());
        assertEquals("The 'amount' field must contain one or two digits after a decimal point.", response.errorMsg());
    }

    @Test
    @DisplayName(value = "Test Amount step, check if the amount has two digits after comma")
    public void testAmountValidationStep_03() {
        // Given
        ValidationStep<TransactionDto> stepAmount = new AmountValidationStep.AmountValidationStepScale();
        final var transactionDtoToValid = GeneratorDataTransaction.getTestData_testAmountValidationStep_03();

        // When
        final var response = stepAmount.validate(transactionDtoToValid);

        // Then
        assertTrue(response.isValid());
    }

    @Test
    @DisplayName(value = "Test Amount step, " +
            "check if the field 'amount' is correct if type of transaction is DEPOSIT and amount is less then zero")
    public void testAmountValidationStep_04() {
        // Given
        ValidationStep<TransactionDto> stepAmount = new AmountValidationStep.AmountValidationStepCorrectValue();
        final var transactionDtoToValid = GeneratorDataTransaction.getTestData_testAmountValidationStep_04();

        // When
        final var response = stepAmount.validate(transactionDtoToValid);

        // Then
        assertFalse(response.isValid());
        assertEquals("The 'amount' field contain no correct value.", response.errorMsg());
    }

    @Test
    @DisplayName(value = "Test Amount step, " +
            "check if the field 'amount' is correct if type of transaction is DEPOSIT and amount is zero")
    public void testAmountValidationStep_05() {
        // Given
        ValidationStep<TransactionDto> stepAmount = new AmountValidationStep.AmountValidationStepCorrectValue();
        final var transactionDtoToValid = GeneratorDataTransaction.getTestData_testAmountValidationStep_05();

        // When
        final var response = stepAmount.validate(transactionDtoToValid);

        // Then
        assertFalse(response.isValid());
        assertEquals("The 'amount' field contain no correct value.", response.errorMsg());
    }

    @Test
    @DisplayName(value = "Test Amount step, " +
            "check if the field 'amount' is correct if type of transaction is DEPOSIT and amount is greater then zero")
    public void testAmountValidationStep_06() {
        // Given
        ValidationStep<TransactionDto> stepAmount = new AmountValidationStep.AmountValidationStepCorrectValue();
        final var transactionDtoToValid = GeneratorDataTransaction.getTestData_testAmountValidationStep_06();

        // When
        final var response = stepAmount.validate(transactionDtoToValid);

        // Then
        assertTrue(response.isValid());
    }

    @Test
    @DisplayName(value = "Test Amount step, " +
            "check if the field 'amount' is correct if type of transaction is WITHDRAW and amount is less then zero")
    public void testAmountValidationStep_07() {
        // Given
        ValidationStep<TransactionDto> stepAmount = new AmountValidationStep.AmountValidationStepCorrectValue();
        final var transactionDtoToValid = GeneratorDataTransaction.getTestData_testAmountValidationStep_07();

        // When
        final var response = stepAmount.validate(transactionDtoToValid);

        // Then
        assertTrue(response.isValid());
    }

    @Test
    @DisplayName(value = "Test Amount step, " +
            "check if the field 'amount' is correct if type of transaction is WITHDRAW and amount is zero")
    public void testAmountValidationStep_08() {
        // Given
        ValidationStep<TransactionDto> stepAmount = new AmountValidationStep.AmountValidationStepCorrectValue();
        final var transactionDtoToValid = GeneratorDataTransaction.getTestData_testAmountValidationStep_08();

        // When
        final var response = stepAmount.validate(transactionDtoToValid);

        // Then
        assertFalse(response.isValid());
        assertEquals("The 'amount' field contain no correct value.", response.errorMsg());
    }

    @Test
    @DisplayName(value = "Test Amount step, " +
            "check if the field 'amount' is correct if type of transaction is WITHDRAW and amount is greater then zero")
    public void testAmountValidationStep_09() {
        // Given
        ValidationStep<TransactionDto> stepAmount = new AmountValidationStep.AmountValidationStepCorrectValue();
        final var transactionDtoToValid = GeneratorDataTransaction.getTestData_testAmountValidationStep_09();

        // When
        final var response = stepAmount.validate(transactionDtoToValid);

        // Then
        assertFalse(response.isValid());
        assertEquals("The 'amount' field contain no correct value.", response.errorMsg());
    }


}

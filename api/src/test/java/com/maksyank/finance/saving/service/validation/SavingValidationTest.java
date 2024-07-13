package com.maksyank.finance.saving.service.validation;

import com.maksyank.finance.saving.dto.SavingDto;
import com.maksyank.finance.saving.service.GeneratorDataSaving;
import com.maksyank.finance.saving.service.validation.step.ValidationStep;
import com.maksyank.finance.saving.service.validation.step.saving.DeadlineValidationStep;
import com.maksyank.finance.saving.service.validation.step.saving.ImageTypeValidationStep;
import com.maksyank.finance.saving.service.validation.step.saving.ImageValidationStep;
import com.maksyank.finance.saving.service.validation.step.saving.TargetAmountValidationStep;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

public class SavingValidationTest {
    @Test
    @DisplayName(value = "Test TargetAmount step, check if NULL value will pass")
    public void testTargetAmountValidationStep_01() {
        // Given
        ValidationStep<SavingDto> stepTargetAmount = new TargetAmountValidationStep();
        var savingToValid = GeneratorDataSaving.getTestData_testTargetAmountValidationStep_01();

        // When
        var response = stepTargetAmount.validate(savingToValid);

        // Then
        assertTrue(response.isValid());
    }

    @Test
    @DisplayName(value = "Test TargetAmount step, check if targetAmount is 0")
    public void testTargetAmountValidationStep_02() {
        // Given
        ValidationStep<SavingDto> stepTargetAmount = new TargetAmountValidationStep();
        var savingToValid = GeneratorDataSaving.getTestData_testTargetAmountValidationStep_02();

        // When
        var response = stepTargetAmount.validate(savingToValid);

        // Then
        assertFalse(response.isValid());
        assertEquals("The 'target_amount' field must contain positive number.", response.errorMsg());
    }

    @Test
    @DisplayName(value = "Test TargetAmount step, check if targetAmount is less than 0")
    public void testTargetAmountValidationStep_03() {
        // Given
        ValidationStep<SavingDto> stepTargetAmount = new TargetAmountValidationStep();
        var savingToValid = GeneratorDataSaving.getTestData_testTargetAmountValidationStep_03();

        // When
        var response = stepTargetAmount.validate(savingToValid);

        // Then
        assertFalse(response.isValid());
        assertEquals("The 'target_amount' field must contain positive number.", response.errorMsg());
    }

    @Test
    @DisplayName(value = "Test TargetAmount step, check if targetAmount has no digits after comma")
    public void testTargetAmountValidationStep_04() {
        // Given
        ValidationStep<SavingDto> stepTargetAmount = new TargetAmountValidationStep();
        var savingToValid = GeneratorDataSaving.getTestData_testTargetAmountValidationStep_04();

        // When
        var response = stepTargetAmount.validate(savingToValid);

        // Then
        assertFalse(response.isValid());
        assertEquals("The 'target_amount' field must contain two digits after a decimal point.", response.errorMsg());
    }

    @Test
    @DisplayName(value = "Test TargetAmount step, check if targetAmount has one digit after comma")
    public void testTargetAmountValidationStep_05() {
        // Given
        ValidationStep<SavingDto> stepTargetAmount = new TargetAmountValidationStep();
        var savingToValid = GeneratorDataSaving.getTestData_testTargetAmountValidationStep_05();

        // When
        var response = stepTargetAmount.validate(savingToValid);

        // Then
        assertFalse(response.isValid());
        assertEquals("The 'target_amount' field must contain two digits after a decimal point.", response.errorMsg());
    }

    @Test
    @DisplayName(value = "Test TargetAmount step, check if targetAmount has three digits after comma")
    public void testTargetAmountValidationStep_06() {
        // Given
        ValidationStep<SavingDto> stepTargetAmount = new TargetAmountValidationStep();
        var savingToValid = GeneratorDataSaving.getTestData_testTargetAmountValidationStep_06();

        // When
        var response = stepTargetAmount.validate(savingToValid);

        // Then
        assertFalse(response.isValid());
        assertEquals("The 'target_amount' field must contain two digits after a decimal point.", response.errorMsg());
    }

    @Test
    @DisplayName(value = "Test TargetAmount step, check if targetAmount has all valid data")
    public void testTargetAmountValidationStep_07() {
        // Given
        ValidationStep<SavingDto> stepTargetAmount = new TargetAmountValidationStep();
        final var savingToValid = GeneratorDataSaving.getTestData_testTargetAmountValidationStep_07();

        // When
        final var response = stepTargetAmount.validate(savingToValid);

        // Then
        assertTrue(response.isValid());
    }

    @Test
    @DisplayName(value = "Test Deadline step, check if targetAmount is null & deadline exists")
    public void testDeadlineValidationStep_01() {
        // Given
        ValidationStep<SavingDto> stepDeadline = new DeadlineValidationStep();
        final var savingToValid = GeneratorDataSaving.getTestData_testDeadlineValidationStep_01();

        // When
        final var response = stepDeadline.validate(savingToValid);

        // Then
        assertFalse(response.isValid());
        assertEquals("The 'deadline' field can not exist without field 'targetAmount'", response.errorMsg());
    }

    @Test
    @DisplayName(value = "Test Deadline step, check if deadline is null")
    public void testDeadlineValidationStep_02() {
        // Given
        ValidationStep<SavingDto> stepDeadline = new DeadlineValidationStep();
        final var savingToValid = GeneratorDataSaving.getTestData_testDeadlineValidationStep_02();

        // When
        final var response = stepDeadline.validate(savingToValid);

        // Then
        assertTrue(response.isValid());
    }

    @Test
    @DisplayName(value = "Test Deadline step, check if deadline is less than current day")
    public void testDeadlineValidationStep_03() {
        // Given
        ValidationStep<SavingDto> stepDeadline = new DeadlineValidationStep();
        final var savingToValid = GeneratorDataSaving.getTestData_testDeadlineValidationStep_03();

        // When
        final var response = stepDeadline.validate(savingToValid);

        // Then
        assertFalse(response.isValid());
        assertEquals("The 'deadline' field must contain at least the next day.", response.errorMsg());
    }

    @Test
    @DisplayName(value = "Test Deadline step, check if deadline has all valid data")
    public void testDeadlineValidationStep_04() {
        // Given
        ValidationStep<SavingDto> stepDeadline = new DeadlineValidationStep();
        final var savingToValid = GeneratorDataSaving.getTestData_testDeadlineValidationStep_04();

        // When
        final var response = stepDeadline.validate(savingToValid);

        // Then
        assertTrue(response.isValid());
    }

    @Test
    @DisplayName(value = "Test Image step, check if Image is null")
    public void testImageValidationStep_01() {
        // Given
        ValidationStep<SavingDto> stepImage = new ImageValidationStep();
        final var savingToValid = GeneratorDataSaving.getTestData_testImageValidationStep_01();

        // When
        final var response = stepImage.validate(savingToValid);

        // Then
        assertTrue(response.isValid());
    }

    @Test
    @DisplayName(value = "Test ImageType step, check if ImageType is null & Image isn't null")
    public void testImageTypeValidationStep_01() {
        // Given
        ValidationStep<SavingDto> stepImage = new ImageTypeValidationStep();
        final var savingToValid = GeneratorDataSaving.getTestData_testImageTypeValidationStep_01();

        // When
        final var response = stepImage.validate(savingToValid);

        // Then
        assertFalse(response.isValid());
    }

    @Test
    @DisplayName(value = "Test ImageType step, check if ImageType isn't null & Image is null")
    public void testImageTypeValidationStep_02() {
        // Given
        ValidationStep<SavingDto> stepImage = new ImageTypeValidationStep();
        final var savingToValid = GeneratorDataSaving.getTestData_testImageTypeValidationStep_02();

        // When
        final var response = stepImage.validate(savingToValid);

        // Then
        assertFalse(response.isValid());
    }

    @Test
    @DisplayName(value = "Test ImageType step, check if ImageType is null & Image is null")
    public void testImageTypeValidationStep_03() {
        // Given
        ValidationStep<SavingDto> stepImage = new ImageTypeValidationStep();
        final var savingToValid = GeneratorDataSaving.getTestData_testImageTypeValidationStep_03();

        // When
        final var response = stepImage.validate(savingToValid);

        // Then
        assertTrue(response.isValid());
    }

    @Test
    @DisplayName(value = "Test ImageType step, check if ImageType isn't null & Image isn't null")
    public void testImageTypeValidationStep_04() {
        // Given
        ValidationStep<SavingDto> stepImage = new ImageTypeValidationStep();
        final var savingToValid = GeneratorDataSaving.getTestData_testImageTypeValidationStep_04();

        // When
        final var response = stepImage.validate(savingToValid);

        // Then
        assertTrue(response.isValid());
    }
}

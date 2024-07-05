package com.maksyank.finance.saving.dto;

import jakarta.validation.constraints.Size;

public record DepositUpdateDto(
        @Size(max = 100)
        String description
) { }

package com.maksyank.finance.saving.mapper;

import com.maksyank.finance.saving.boundary.request.DepositUpdateRequest;
import com.maksyank.finance.saving.domain.Deposit;
import com.maksyank.finance.saving.domain.Saving;
import com.maksyank.finance.saving.boundary.request.DepositRequest;
import com.maksyank.finance.saving.boundary.response.DepositResponse;
import com.maksyank.finance.saving.boundary.response.DepositViewResponse;
import com.maksyank.finance.saving.dto.DepositDto;
import com.maksyank.finance.saving.dto.DepositUpdateDto;

import java.util.Collection;
import java.util.List;

public class DepositMapper {

    public static DepositResponse entityToResponse(Deposit source) {
        return new DepositResponse(source.getId(), source.getType(), source.getDescription(), source.getFundingDate(), source.getAmount());
    }

    public static DepositViewResponse entityToViewResponse(Deposit source) {
        return new DepositViewResponse(source.getId(), source.getType(), source.getFundingDate(), source.getAmount());
    }

    public static List<DepositViewResponse> entityToViewResponse(Collection<Deposit> source) {
        return source.stream().map(DepositMapper::entityToViewResponse).toList();
    }

    public static Deposit mapToNewEntity(DepositDto source, Saving saving) {
        return new Deposit(source.type(), source.description(), source.fundingDate(), source.amount(), saving);
    }

    public static DepositDto mapToDto(DepositRequest source) {
        return new DepositDto(source.type(), source.description(), source.fundingDate(), source.amount());
    }

    public static DepositUpdateDto mapToUpdateDto(DepositUpdateRequest source) {
        return new DepositUpdateDto(source.description());
    }
}

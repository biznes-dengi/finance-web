package com.maksyank.finance.financegoal.mapper;

import com.maksyank.finance.financegoal.boundary.request.DepositUpdateRequest;
import com.maksyank.finance.financegoal.domain.Deposit;
import com.maksyank.finance.financegoal.domain.FinanceGoal;
import com.maksyank.finance.financegoal.boundary.request.DepositRequest;
import com.maksyank.finance.financegoal.boundary.response.DepositResponse;
import com.maksyank.finance.financegoal.boundary.response.DepositViewResponse;
import com.maksyank.finance.financegoal.dto.DepositDto;
import com.maksyank.finance.financegoal.dto.DepositUpdateDto;

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

    public static Deposit mapToNewEntity(DepositDto source, FinanceGoal financeGoal) {
        return new Deposit(source.type(), source.description(), source.fundingDate(), source.amount(), financeGoal);
    }

    public static DepositDto mapToDto(DepositRequest source) {
        return new DepositDto(source.type(), source.description(), source.fundingDate(), source.amount());
    }

    public static DepositUpdateDto mapToUpdateDto(DepositUpdateRequest source) {
        return new DepositUpdateDto(source.description());
    }
}

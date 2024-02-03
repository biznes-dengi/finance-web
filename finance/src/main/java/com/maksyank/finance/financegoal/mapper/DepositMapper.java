package com.maksyank.finance.financegoal.mapper;

import com.maksyank.finance.financegoal.domain.common.Deposit;
import com.maksyank.finance.financegoal.domain.response.DepositResponse;
import com.maksyank.finance.financegoal.domain.response.DepositViewResponse;

import java.util.Collection;
import java.util.List;

public class DepositMapper {

    public static DepositResponse entityToResponse(Deposit source) {
        return new DepositResponse(source.getId(), source.getType(), source.getDescription(),
                source.getFundingDate(), source.getAmount());
    }

    public static DepositViewResponse entityToViewResponse(Deposit source) {
        return new DepositViewResponse(source.getId(), source.getType(), source.getFundingDate(), source.getAmount());
    }

    public static List<DepositViewResponse> entityToViewResponse(Collection<Deposit> deposits) {
        return deposits.stream().map(DepositMapper::entityToViewResponse).toList();
    }
}

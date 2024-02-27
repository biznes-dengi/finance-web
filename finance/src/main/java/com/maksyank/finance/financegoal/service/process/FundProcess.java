package com.maksyank.finance.financegoal.service.process;

import com.maksyank.finance.financegoal.domain.Deposit;
import com.maksyank.finance.financegoal.domain.FinanceGoal;
import com.maksyank.finance.financegoal.exception.NotFoundException;
import com.maksyank.finance.financegoal.service.repoimpl.FinanceGoalRepoImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.YearMonth;
import java.util.List;
import java.util.Objects;

@Service
public class FundProcess {
    private FinanceGoalRepoImpl financeGoalRepoImpl;

    @Autowired
    FundProcess(FinanceGoalRepoImpl financeGoalRepoImpl) {
        this.financeGoalRepoImpl = financeGoalRepoImpl;
    }

    public BigDecimal processGetFundAmountByMonth(int financeGoalId, int year, int month, int userId) throws NotFoundException {
        final var financeGoal = this.financeGoalRepoImpl.findByIdAndUserId(financeGoalId, userId);

        final var startMonth = LocalDateTime.of(year, month, 1, 0, 0, 0);
        final var endMonth = LocalDateTime.of(year, month, YearMonth.of(year, month).lengthOfMonth(), 23, 59, 59);

        final var foundDepositsByMonth = this.findFundDepositsByMonth(financeGoal, startMonth, endMonth);
        if (foundDepositsByMonth.size() == 0) {
            throw new NotFoundException("Entities 'Deposit' were not found in " + year + "/" + month);
        }
        return this.computeSumAmount(foundDepositsByMonth);
    }

    // TODO critical point. For big data troubles with time of response (maybe move logic to SQL query)
    // TODO change filter fund to enum
    // TODO maybe split logic into methods by filters. It relates from if there's a need for it
    private List<Deposit> findFundDepositsByMonth(FinanceGoal source, LocalDateTime startMonth, LocalDateTime endMonth) {
        return source.getDeposits().stream()
                .filter(deposit -> Objects.equals(deposit.getType(), "fund"))
                .filter(deposit -> deposit.getFundingDate().isAfter(startMonth) && deposit.getFundingDate().isBefore(endMonth))
                .toList();
    }

    // TODO maybe combine with findFundDepositsByMonth() for best performance
    private BigDecimal computeSumAmount(List<Deposit> source) {
        return source.stream().map(Deposit::getAmount).reduce(BigDecimal.ZERO, BigDecimal::add);
    }
}

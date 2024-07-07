package com.maksyank.finance.saving.service.process;

import com.maksyank.finance.saving.domain.Deposit;
import com.maksyank.finance.saving.domain.Saving;
import com.maksyank.finance.saving.domain.enums.DepositType;
import com.maksyank.finance.saving.exception.NotFoundException;
import com.maksyank.finance.saving.service.persistence.SavingPersistence;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.YearMonth;
import java.util.List;

@Service
public class DepositFundProcess {
    private SavingPersistence savingPersistence;

    @Autowired
    DepositFundProcess(SavingPersistence savingPersistence) {
        this.savingPersistence = savingPersistence;
    }

    public BigDecimal processGetFundAmountByMonth(int savingId, int year, int month, int userId) throws NotFoundException {
        final var savingForCalculateAmount = this.savingPersistence.findByIdAndUserId(savingId, userId);

        final var foundDepositsByMonth = this.findFundDepositsByMonth(savingForCalculateAmount, year, month);
        if (foundDepositsByMonth.size() == 0) {
            throw new NotFoundException("Entities 'Deposit' were not found in " + year + "/" + month);
        }
        return this.computeSumAmount(foundDepositsByMonth);
    }

    // TODO critical point. For big data troubles with time of response (maybe move logic to SQL query)
    // TODO change filter fund to enum
    // TODO maybe split logic into methods by filters. It relates from if there's a need for it
    private List<Deposit> findFundDepositsByMonth(Saving source, int year, int month) {
        return source.getDeposits().stream()
                .filter(deposit -> deposit.getType() == DepositType.FUND)
                .filter(deposit -> deposit.getFundingDate().getYear() == year)
                .filter(deposit -> deposit.getFundingDate().getMonthValue() == month)
                .toList();
    }

    // TODO maybe combine with findFundDepositsByMonth() for best performance
    private BigDecimal computeSumAmount(List<Deposit> source) {
        return source.stream().map(Deposit::getAmount).reduce(BigDecimal.ZERO, BigDecimal::add);
    }
}

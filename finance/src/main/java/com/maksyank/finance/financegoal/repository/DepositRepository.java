package com.maksyank.finance.financegoal.repository;

import com.maksyank.finance.financegoal.domain.common.Deposit;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.Optional;

public interface DepositRepository extends JpaRepository<Deposit, Integer>{
    Slice<Deposit> findAllByFinanceGoal_Id(int financeGoalId, Pageable pageable);

    Optional<Collection<Deposit>> findDepositsByFundingDateLessThanEqual(LocalDateTime date);
}

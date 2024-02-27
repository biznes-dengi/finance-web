package com.maksyank.finance.financegoal.repository;

import com.maksyank.finance.financegoal.domain.Deposit;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DepositRepository extends JpaRepository<Deposit, Integer>{
    Slice<Deposit> findAllByFinanceGoal_Id(int financeGoalId, Pageable pageable);
}

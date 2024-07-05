package com.maksyank.finance.saving.repository;

import com.maksyank.finance.saving.domain.Deposit;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DepositRepository extends JpaRepository<Deposit, Integer>{
    Slice<Deposit> findAllBySaving_Id(int financeGoalId, Pageable pageable);
    void deleteAllBySaving_Id(int financeGoalId);
}

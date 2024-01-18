package com.maksyank.finance.financegoal.repository;

import com.maksyank.finance.financegoal.domain.common.FinanceGoal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.Optional;

@Repository
public interface FinanceGoalRepository extends JpaRepository<FinanceGoal, Integer> {

    Optional<FinanceGoal> findByIdAndUserAccount_Id(int id, int userId);

    Optional<Collection<FinanceGoal>> findByStateAndUserAccount_Id(String status, int id);
}

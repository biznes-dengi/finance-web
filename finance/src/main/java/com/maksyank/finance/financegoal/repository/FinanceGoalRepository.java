package com.maksyank.finance.financegoal.repository;

import com.maksyank.finance.financegoal.domain.common.FinanceGoal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.Optional;

@Repository
public interface FinanceGoalRepository extends JpaRepository<FinanceGoal, Integer> {

    Optional<Collection<FinanceGoal>> findByState(String status);
}

package com.maksyank.finance.financegoal.repository;

import com.maksyank.finance.financegoal.domain.common.Deposit;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.Optional;

@Repository
interface DepositRepository extends JpaRepository<Deposit, Integer> {

    Optional<Collection<Deposit>> findDepositsByFundingDateLessThanEqual(LocalDateTime date);

    Optional<Collection<Deposit>> findAllBy(Pageable page);

    Optional<Deposit> findById(int id);
}

package com.maksyank.finance.financegoal.repository;

import com.maksyank.finance.financegoal.domain.common.UserAccount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
interface UserAccountRepository extends JpaRepository<UserAccount, Integer> {

    Optional<UserAccount> findByEmailAndPassword(String email, String password);
}

package com.maksyank.finance.financegoal.persistence;

import com.maksyank.finance.financegoal.domain.FinanceGoal;
import com.maksyank.finance.financegoal.domain.enums.FinanceGoalState;
import com.maksyank.finance.financegoal.exception.DbOperationException;
import com.maksyank.finance.financegoal.exception.NotFoundException;
import com.maksyank.finance.financegoal.repository.FinanceGoalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collection;

@Service
public class FinanceGoalPersistence {
    private FinanceGoalRepository financeGoalRepository;

    @Autowired
    FinanceGoalPersistence(FinanceGoalRepository financeGoalRepository) {
        this.financeGoalRepository = financeGoalRepository;
    }

    public FinanceGoal findByIdAndUserId(int id, int userId) throws NotFoundException {
        return this.financeGoalRepository
                .findByIdAndUserAccount_Id(id, userId)
                .orElseThrow(() -> new NotFoundException("Entity 'Finance Goal' not found by attribute 'id' = " + id));
    }

    public Collection<FinanceGoal> findByStateAndUserId(FinanceGoalState state, int userId) throws NotFoundException {
        return this.financeGoalRepository
                .findByStateAndUserAccount_Id(state, userId)
                .orElseThrow(
                        () -> new NotFoundException("Entities 'Finance Goal' not found by attribute 'state' = " + state.state)
                );
    }

    // TODO refactor handling type
    public void save(FinanceGoal preparedToPersist) throws DbOperationException {
        try {
            this.financeGoalRepository.save(preparedToPersist);
        } catch (Exception e) {
            throw new DbOperationException(e.getMessage(), e);
        }
    }

    // TODO refactor handling type
    public void deleteById(int id) throws DbOperationException {
        try {
            this.financeGoalRepository.deleteById(id);
        } catch (Exception e) {
            throw new DbOperationException(e.getMessage(), e);
        }
    }

    // TODO to think about how we could refactor, because some methods which call that method
    // TODO have to throw new exception if it returns false. It's a little bit stupid.
    // TODO Maybe just throw new exception if false
    public boolean ifExistsByIdAndUserId(int financeGoalId, int userId) {
        return this.financeGoalRepository.existsByIdAndUserAccount_Id(financeGoalId, userId);
    }

}

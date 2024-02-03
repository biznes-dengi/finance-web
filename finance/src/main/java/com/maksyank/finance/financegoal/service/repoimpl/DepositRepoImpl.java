package com.maksyank.finance.financegoal.service.repoimpl;

import com.maksyank.finance.financegoal.domain.common.Deposit;
import com.maksyank.finance.financegoal.exception.NotFoundException;
import com.maksyank.finance.financegoal.repository.DepositRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DepositRepoImpl {
    private DepositRepository depositRepository;

    @Autowired
    DepositRepoImpl(DepositRepository depositRepository) {
        this.depositRepository = depositRepository;
    }

    // TODO (refactor) A client will have the same exceptions two cases:
    // TODO If there were 10 items and they just ran out or were not there originally
    public List<Deposit> findAllByFinanceGoalIdPageable(int financeGoalId, int pageNumber) throws NotFoundException {
        final var response =
                this.depositRepository.findAllByFinanceGoal_Id(financeGoalId, PageRequest.of(pageNumber, 5));

        if (response.getNumberOfElements() == 0) {
            throw new NotFoundException("Entities 'Deposit' not found by attribute " +
                    "'financeGoalId' = " + financeGoalId + ", and by 'pageNumber' = " + pageNumber);
        }
        return response.getContent();
    }
}

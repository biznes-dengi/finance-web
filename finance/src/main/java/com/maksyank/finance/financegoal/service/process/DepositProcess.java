package com.maksyank.finance.financegoal.service.process;

import com.maksyank.finance.financegoal.domain.response.DepositViewResponse;
import com.maksyank.finance.financegoal.exception.NotFoundException;
import com.maksyank.finance.financegoal.mapper.DepositMapper;
import com.maksyank.finance.financegoal.service.repoimpl.DepositRepoImpl;
import com.maksyank.finance.financegoal.service.repoimpl.FinanceGoalRepoImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DepositProcess {
    private DepositRepoImpl depositRepoImpl;
    private FinanceGoalRepoImpl financeGoalRepoImpl;

    @Autowired
    DepositProcess(DepositRepoImpl depositRepoImpl, FinanceGoalRepoImpl financeGoalRepoImpl) {
        this.depositRepoImpl = depositRepoImpl;
        this.financeGoalRepoImpl = financeGoalRepoImpl;
    }

    public List<DepositViewResponse> processGetByPage(int financeGoalId, int pageNumber, int userId) throws NotFoundException {
        boolean ifExists = this.financeGoalRepoImpl.ifExistsByIdAndUserId(financeGoalId, userId);
        if (!ifExists) {
            throw new NotFoundException("Entity 'Finance Goal' not found by attribute 'financeGoalId' = " + financeGoalId);
        }

        final var foundDeposits = this.depositRepoImpl.findAllByFinanceGoalIdPageable(financeGoalId, pageNumber);
        return DepositMapper.entityToViewResponse(foundDeposits);
    }
}

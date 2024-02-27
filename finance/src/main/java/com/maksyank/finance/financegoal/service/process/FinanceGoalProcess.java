package com.maksyank.finance.financegoal.service.process;

import com.maksyank.finance.financegoal.domain.request.FinGoalSaveRequest;
import com.maksyank.finance.financegoal.domain.request.FinGoalUpdateRequest;
import com.maksyank.finance.financegoal.domain.response.FinGoalResponse;
import com.maksyank.finance.financegoal.domain.response.FinGoalViewResponse;
import com.maksyank.finance.financegoal.exception.DbOperationException;
import com.maksyank.finance.financegoal.exception.NotFoundException;
import com.maksyank.finance.financegoal.mapper.FinanceGoalMapper;
import com.maksyank.finance.financegoal.service.repoimpl.FinanceGoalRepoImpl;
import com.maksyank.finance.user.domain.UserAccount;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

// TO DO add validation of all parameters of all methods
@Service
public class FinanceGoalProcess {

    private FinanceGoalRepoImpl financeGoalRepoImpl;
    @Autowired
    FinanceGoalProcess(FinanceGoalRepoImpl financeGoalRepoImpl) {
        this.financeGoalRepoImpl = financeGoalRepoImpl;
    }

    public FinGoalResponse processGetById(int id, int userId) throws NotFoundException {
        final var foundFinanceGoal = this.financeGoalRepoImpl.findByIdAndUserId(id, userId);
        return FinanceGoalMapper.entityToResponse(foundFinanceGoal);
    }

    public List<FinGoalViewResponse> processGetByState(String state, int userId) throws NotFoundException {
        final var foundFinanceGoals = this.financeGoalRepoImpl.findByStateAndUserId(state, userId);
        return FinanceGoalMapper.sourceToViewResponse(foundFinanceGoals);
    }

    public boolean processSave(FinGoalSaveRequest toSaveRequest, UserAccount user) throws DbOperationException {
        final var financeGoalToSave = FinanceGoalMapper.requestToSourceSave(toSaveRequest, user);
        return this.financeGoalRepoImpl.save(financeGoalToSave);
    }

    public boolean processUpdate(int id, FinGoalUpdateRequest newFinanceGoal, UserAccount user)
            throws NotFoundException, DbOperationException
    {
        final var oldFinanceGoal = this.financeGoalRepoImpl.findByIdAndUserId(id, user.getId());
        final var updatedFinanceGoal = FinanceGoalMapper.map(newFinanceGoal, oldFinanceGoal);
        return this.financeGoalRepoImpl.save(updatedFinanceGoal);
    }

    public boolean processDelete(int id) throws DbOperationException {
        return this.financeGoalRepoImpl.deleteById(id);
    }
}

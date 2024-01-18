package com.maksyank.finance.financegoal.mapper;

import com.maksyank.finance.financegoal.domain.common.FinanceGoal;
import com.maksyank.finance.financegoal.domain.request.FinGoalSaveRequest;
import com.maksyank.finance.financegoal.domain.request.FinGoalUpdateRequest;
import com.maksyank.finance.financegoal.domain.response.FinGoalResponse;
import com.maksyank.finance.financegoal.domain.response.FinGoalViewResponse;
import com.maksyank.finance.user.domain.UserAccount;

import java.math.BigDecimal;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

public class FinanceGoalMapper {

    public static List<FinGoalResponse> sourceToResponse(Collection<FinanceGoal> finGoals) {
        return finGoals.stream().map(FinanceGoalMapper::sourceToResponse).collect(Collectors.toList());
    }

    public static FinGoalResponse sourceToResponse(FinanceGoal finGoal) {
        return new FinGoalResponse(finGoal.getId(), finGoal.getTitle(), finGoal.getState(),
                finGoal.getDescription(), finGoal.getAmount(), finGoal.getTargetAmount(),
                finGoal.getDeadline(), finGoal.getRiskProfile()
        );
    }

    public static List<FinGoalViewResponse> sourceToViewResponse(Collection<FinanceGoal> finGoals) {
        return finGoals.stream().map(FinanceGoalMapper::sourceToViewResponse).collect(Collectors.toList());
    }

    public static FinGoalViewResponse sourceToViewResponse(FinanceGoal finGoal) {
        return new FinGoalViewResponse(finGoal.getId(), finGoal.getTitle(),
                finGoal.getAmount(), finGoal.getTargetAmount()
        );
    }

    // TO DO amount from start mocked (from start 0)
    // TO DO separate bussines logic and mapping
    // no impl currency, state, riskProfile
    public static FinanceGoal requestToSourceSave(FinGoalSaveRequest request, UserAccount userAccount) {
        return new FinanceGoal(request.title(), request.state(), request.currency(), request.description(),
                new BigDecimal(0), request.targetAmount(), request.deadline(), request.riskProfile(),
                request.createdOn(), userAccount);
    }

    public static FinanceGoal requestToSourceUpdate(int id, FinGoalUpdateRequest request, UserAccount userAccount) {
        return new FinanceGoal(id, request.title(), request.state(), request.currency(), request.description(),
                request.amount(), request.targetAmount(), request.deadline(), request.riskProfile(),
                request.createdOn(), request.lastChange(), userAccount);
    }

}

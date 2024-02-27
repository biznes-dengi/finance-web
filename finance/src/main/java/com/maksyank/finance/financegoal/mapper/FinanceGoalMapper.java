package com.maksyank.finance.financegoal.mapper;

import com.maksyank.finance.financegoal.domain.FinanceGoal;
import com.maksyank.finance.financegoal.boundary.request.FinGoalSaveRequest;
import com.maksyank.finance.financegoal.boundary.request.FinGoalUpdateRequest;
import com.maksyank.finance.financegoal.boundary.response.FinGoalResponse;
import com.maksyank.finance.financegoal.boundary.response.FinGoalViewResponse;
import com.maksyank.finance.user.domain.UserAccount;

import java.math.BigDecimal;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

public class FinanceGoalMapper {

    public static List<FinGoalResponse> entityToResponse(Collection<FinanceGoal> finGoals) {
        return finGoals.stream().map(FinanceGoalMapper::entityToResponse).collect(Collectors.toList());
    }

    public static FinGoalResponse entityToResponse(FinanceGoal source) {
        return new FinGoalResponse(source.getId(), source.getTitle(), source.getState(),
                source.getDescription(), source.getAmount(), source.getTargetAmount(),
                source.getDeadline(), source.getRiskProfile()
        );
    }

    public static List<FinGoalViewResponse> sourceToViewResponse(Collection<FinanceGoal> finGoals) {
        return finGoals.stream().map(FinanceGoalMapper::sourceToViewResponse).toList();
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

    public static FinanceGoal map(FinGoalUpdateRequest source, FinanceGoal destination) {
        destination.setTitle(source.title());
        destination.setState(source.state());
        destination.setCurrency(source.currency());
        destination.setDescription(source.description());
        destination.setAmount(source.amount());
        destination.setTargetAmount(source.targetAmount());
        destination.setDeadline(source.deadline());
        destination.setRiskProfile(source.riskProfile());
        destination.setCreatedOn(source.createdOn());
        destination.setLastChange(source.lastChange());
        return destination;
    }

}

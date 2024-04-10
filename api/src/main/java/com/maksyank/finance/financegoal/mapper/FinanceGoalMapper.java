package com.maksyank.finance.financegoal.mapper;

import com.maksyank.finance.financegoal.boundary.response.StateOfFinGoalResponse;
import com.maksyank.finance.financegoal.domain.FinanceGoal;
import com.maksyank.finance.financegoal.boundary.request.FinanceGoalRequest;
import com.maksyank.finance.financegoal.boundary.response.FinGoalResponse;
import com.maksyank.finance.financegoal.boundary.response.FinGoalViewResponse;
import com.maksyank.finance.financegoal.domain.ImageFinanceGoal;
import com.maksyank.finance.financegoal.domain.businessrules.InitRulesFinanceGoal;
import com.maksyank.finance.financegoal.dto.FinanceGoalDto;
import com.maksyank.finance.user.domain.UserAccount;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

public class FinanceGoalMapper {

    public static List<FinGoalResponse> entityToResponse(Collection<FinanceGoal> finGoals) {
        return finGoals.stream().map(FinanceGoalMapper::entityToResponse).collect(Collectors.toList());
    }

    public static FinGoalResponse entityToResponse(FinanceGoal source) {
        return new FinGoalResponse(source.getId(), source.getTitle(), source.getState(),
                source.getDescription(), source.getBalance(), source.getTargetAmount(),
                source.getDeadline(), source.getRiskProfile(), source.getImage().getValue()
        );
    }

    public static List<FinGoalViewResponse> sourceToViewResponse(Collection<FinanceGoal> finGoals) {
        return finGoals.stream().map(FinanceGoalMapper::sourceToViewResponse).toList();
    }

    public static FinGoalViewResponse sourceToViewResponse(FinanceGoal source) {
        return new FinGoalViewResponse(source.getId(), source.getTitle(),
                source.getBalance(), source.getTargetAmount(), source.getImage().getValue()
        );
    }

    public static FinanceGoalDto mapToDto(FinanceGoalRequest source) {
        return new FinanceGoalDto(
                source.title(), source.currency(), source.description(), source.targetAmount(),
                source.deadline(), source.riskProfile(), source.image(), source.imageType()
        );
    }

    public static FinanceGoal mapToNewEntity(
            FinanceGoalRequest request,
            InitRulesFinanceGoal rulesFinanceGoal,
            UserAccount userAccount
    ) {
        return new FinanceGoal(
                rulesFinanceGoal, request.title(), request.currency(), request.description(), request.targetAmount(),
                request.deadline(), request.riskProfile(), new ImageFinanceGoal(request.imageType(), request.image()), userAccount
        );
    }

    public static FinanceGoal mapToEntity(FinanceGoalRequest source, FinanceGoal destination) {
        destination.setTitle(source.title());
        destination.setCurrency(source.currency());
        destination.setDescription(source.description());
        destination.setTargetAmount(source.targetAmount());
        destination.setDeadline(source.deadline());
        destination.setRiskProfile(source.riskProfile());
        destination.setImage(new ImageFinanceGoal(source.imageType(), source.image()));
        return destination;
    }

    public static StateOfFinGoalResponse mapToStateResponse(FinanceGoal source) {
        return new StateOfFinGoalResponse(source.getBalance(), source.getState());
    }

}

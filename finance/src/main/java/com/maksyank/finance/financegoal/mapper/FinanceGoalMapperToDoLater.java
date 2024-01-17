package com.maksyank.finance.financegoal.mapper;

import com.maksyank.finance.financegoal.domain.common.FinanceGoal;
import com.maksyank.finance.financegoal.domain.dto.FinanceGoalDTO;
import com.maksyank.finance.financegoal.domain.response.FinanceGoalResponse;
import com.maksyank.finance.financegoal.domain.response.FinanceGoalViewResponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface FinanceGoalMapperToDoLater {

    // TO DO remove that ignoring
    @Mapping(target = "userAccount", ignore = true)
    @Mapping(target = "deposits", ignore = true)
    FinanceGoalDTO sourceToDto(FinanceGoal source);

    @Mapping(target = "state", ignore = true)
    @Mapping(target = "description", ignore = true)
    @Mapping(target = "deadline", ignore = true)
    @Mapping(target = "riskProfile", ignore = true)
    @Mapping(target = "createdOn", ignore = true)
    @Mapping(target = "lastChange", ignore = true)
    FinanceGoalViewResponse sourceToViewResponse(FinanceGoal source);

    FinanceGoal dtoToSource(FinanceGoalDTO dto);

    @Mapping(target = "createdOn", ignore = true)
    @Mapping(target = "lastChange", ignore = true)
    FinanceGoalResponse dtoToResponse(FinanceGoalDTO dto);

    @Mapping(target = "state", ignore = true)
    @Mapping(target = "description", ignore = true)
    @Mapping(target = "deadline", ignore = true)
    @Mapping(target = "riskProfile", ignore = true)
    @Mapping(target = "createdOn", ignore = true)
    @Mapping(target = "lastChange", ignore = true)
    FinanceGoalViewResponse dtoToViewResponse(FinanceGoalDTO dto);
}

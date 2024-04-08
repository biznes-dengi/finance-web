package com.maksyank.finance.financegoal.domain;

import com.maksyank.finance.financegoal.domain.businessrules.InitRulesFinanceGoal;
import com.maksyank.finance.financegoal.domain.enums.CurrencyCode;
import com.maksyank.finance.financegoal.domain.enums.FinanceGoalState;
import com.maksyank.finance.financegoal.domain.enums.RiskProfileType;
import com.maksyank.finance.user.domain.UserAccount;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Collection;

@Data
@NoArgsConstructor
@Entity
@Table(name = "finance_goal")
public class FinanceGoal {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_goal")
    private int id;
    @Column(name = "title")
    private String title;
    @Column(name = "state")
    private FinanceGoalState state;
    @Column(name = "currency")
    private CurrencyCode currency;
    @Column(name = "description")
    private String description;
    @Column(name = "balance")
    private BigDecimal balance;
    @Column(name = "target_amount")
    private BigDecimal targetAmount;
    @Column(name = "deadline")
    private LocalDate deadline;
    @Column(name = "risk_profile")
    private RiskProfileType riskProfile;
    @Embedded
    private FinanceGoalImage image;
    @Column(name = "created_on")
    private LocalDateTime createdOn;
    @Column(name = "last_change")
    private LocalDateTime lastChange;

    @ManyToOne
    @JoinColumn(name = "id_user_account")
    private UserAccount userAccount;

    @OneToMany(mappedBy = "financeGoal", fetch = FetchType.LAZY)
    private Collection<Deposit> deposits;

    public FinanceGoal(InitRulesFinanceGoal initRulesFinanceGoal, String title, CurrencyCode currency, String description,
                       BigDecimal targetAmount, LocalDate deadline, RiskProfileType riskProfile,
                       FinanceGoalImage image, UserAccount userAccount
    ) {
        this.title = title;
        this.state = initRulesFinanceGoal.state();
        this.currency = currency;
        this.description = description;
        this.balance = initRulesFinanceGoal.balance();
        this.targetAmount = targetAmount;
        this.deadline = deadline;
        this.riskProfile = riskProfile;
        this.image = image;
        this.userAccount = userAccount;
    }

    public FinanceGoal(int id, String title, FinanceGoalState state, CurrencyCode currency, String description, BigDecimal balance,
                       BigDecimal targetAmount, LocalDate deadline, RiskProfileType riskProfile,
                       FinanceGoalImage image, LocalDateTime createdOn, LocalDateTime lastChange, UserAccount userAccount
    ) {
        this.id = id;
        this.title = title;
        this.state = state;
        this.currency = currency;
        this.description = description;
        this.balance = balance;
        this.targetAmount = targetAmount;
        this.deadline = deadline;
        this.riskProfile = riskProfile;
        this.image = image;
        this.createdOn = createdOn;
        this.lastChange = lastChange;
        this.userAccount = userAccount;
    }

    // TODO will think if there is need add image to toString
    @Override
    public String toString() {
        return "FinanceGoal(id=" + this.getId() + ", title=" + this.getTitle() +
                ", state=" + this.getState().state + ", currencyCode=" + this.getCurrency().code +
                ", description=" + this.getDescription() + ", amount=" + this.getBalance() +
                ", targetAmount=" + this.getTargetAmount() + ", deadline=" + this.getDeadline() +
                ", riskProfile=" + this.getRiskProfile().type + ", createdOn=" + this.getCreatedOn() +
                ", lastChange=" + this.getLastChange() + ", userAccountId=" + this.getUserAccount().getId() + ")";
    }
}

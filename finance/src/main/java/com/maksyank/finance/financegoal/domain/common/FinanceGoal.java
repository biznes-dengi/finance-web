package com.maksyank.finance.financegoal.domain.common;

import com.maksyank.finance.user.domain.UserAccount;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
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

    // must be enum
    @Column(name = "state")
    private String state;

    // must be enum
    @Column(name = "currency_code")
    private String currencyCode;

    @Column(name = "description")
    private String description;

    @Column(name = "amount")
    private BigDecimal amount;

    @Column(name = "target_amount")
    private BigDecimal targetAmount;

    @Column(name = "deadline")
    private LocalDateTime deadline;

    // must be enum
    @Column(name = "risk_profile")
    private String riskProfile;

    @Column(name = "created_on")
    private LocalDateTime createdOn;

    @Column(name = "last_change")
    private LocalDateTime lastChange;

    @ManyToOne
    @JoinColumn(name = "id_user_account")
    private UserAccount userAccount;

    @OneToMany(mappedBy = "financeGoal", fetch = FetchType.LAZY)
    private Collection<Deposit> deposits;

    public FinanceGoal(String title, String state, String currencyCode, String description, BigDecimal amount,
                       BigDecimal targetAmount, LocalDateTime deadline, String riskProfile,
                       LocalDateTime createdOn, UserAccount userAccount) {
        this.title = title;
        this.state = state;
        this.currencyCode = currencyCode;
        this.description = description;
        this.amount = amount;
        this.targetAmount = targetAmount;
        this.deadline = deadline;
        this.riskProfile = riskProfile;
        this.createdOn = createdOn;
        this.userAccount = userAccount;
    }

    public FinanceGoal(int id, String title, String state, String currencyCode, String description, BigDecimal amount,
                       BigDecimal targetAmount, LocalDateTime deadline, String riskProfile,
                       LocalDateTime createdOn, LocalDateTime lastChange, UserAccount userAccount) {
        this.id = id;
        this.title = title;
        this.state = state;
        this.currencyCode = currencyCode;
        this.description = description;
        this.amount = amount;
        this.targetAmount = targetAmount;
        this.deadline = deadline;
        this.riskProfile = riskProfile;
        this.createdOn = createdOn;
        this.lastChange = lastChange;
        this.userAccount = userAccount;
    }
}

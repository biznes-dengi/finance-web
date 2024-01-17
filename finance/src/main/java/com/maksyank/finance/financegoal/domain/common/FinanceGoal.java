package com.maksyank.finance.financegoal.domain.common;

import com.maksyank.finance.user.domain.UserAccount;
import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Collection;

@Data
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
    @Column(name = "currency")
    private String currency;

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
}

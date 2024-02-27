package com.maksyank.finance.financegoal.domain;

import com.maksyank.finance.financegoal.domain.enums.TransactionType;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@Entity
@Table(name = "deposit")
public class Deposit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_deposit")
    private int id;

    @Column(name = "deposit_type")
    private TransactionType type;

    @Column(name = "description")
    private String description;

    @Column(name = "funding_date")
    private LocalDateTime fundingDate;

    @Column(name = "amount")
    private BigDecimal amount;

    @ManyToOne
    @JoinColumn(name = "id_finance_goal")
    private FinanceGoal financeGoal;

    public Deposit(TransactionType type, String description, LocalDateTime fundingDate, BigDecimal amount, FinanceGoal financeGoal) {
        this.type = type;
        this.description = description;
        this.fundingDate = fundingDate;
        this.amount = amount;
        this.financeGoal = financeGoal;
    }

    @Override
    public String toString() {
        return "Deposit(id=" + this.getId() + ", type=" + this.getType().type + ", description=" +
                this.getDescription() + ", fundingDate=" + this.getFundingDate() + ", amount=" +
                this.getAmount() + ", financeGoalId=" + this.getFinanceGoal().getId() + ")";
    }
}

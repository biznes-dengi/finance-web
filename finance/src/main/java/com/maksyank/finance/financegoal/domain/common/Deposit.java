package com.maksyank.finance.financegoal.domain.common;

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
    private String type;

    @Column(name = "description")
    private String description;

    @Column(name = "funding_date")
    private LocalDateTime fundingDate;

    @Column(name = "amount")
    private BigDecimal amount;

    @ManyToOne
    @JoinColumn(name = "id_goal")
    private FinanceGoal financeGoal;
}

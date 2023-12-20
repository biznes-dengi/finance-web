package com.maksyank.finance.api.entity;

import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "goal")
public class Goal {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_goal")
    private int idGoal;

    @Column(name = "title")
    private String title;

    @Column(name = "state")
    private String state;

    @Column(name = "description")
    private String description;

    @Column(name = "target_amount")
    private BigDecimal targetAmount;

    @Column(name = "deadline")
    private LocalDateTime deadline;

    @Column(name = "created_on")
    private LocalDateTime createdOn;

    @Column(name = "last_change")
    private LocalDateTime lastChange;

    @ManyToOne
    @JoinColumn(name = "id_user_account")
    private UserAccount userAccount;
}

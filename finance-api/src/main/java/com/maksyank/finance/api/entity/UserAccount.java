package com.maksyank.finance.api.entity;

import com.maksyank.finance.api.entity.base.BaseUser;
import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.Collection;

@Entity
@Table(name = "user_account")
public class UserAccount extends BaseUser {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_user_account")
    private int idUserAccount;
    @Column(name = "role")
    private String role;
    @Column(name = "email")
    private String email;

    @Column(name = "pass")
    private String pass;

    @Column(name = "phone_number")
    private String phoneNumber;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "created_on")
    private LocalDateTime createdOn;

    @Column(name = "last_login")
    private LocalDateTime lastLogin;

    @OneToMany(mappedBy = "userAccount")
    private Collection<Goal> goal;

    @Override
    protected int getId() {
        return this.idUserAccount;
    }

    @Override
    protected String getRole() {
        return this.role;
    }

    @Override
    protected String getEmail() {
        return this.email;
    }

    @Override
    protected String getPass() {
        return this.email;
    }
}

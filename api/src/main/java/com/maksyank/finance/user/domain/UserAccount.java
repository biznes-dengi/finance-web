package com.maksyank.finance.user.domain;

import com.maksyank.finance.user.domain.base.BaseUser;
import com.maksyank.finance.user.domain.enums.AppRole;
import com.maksyank.finance.user.domain.enums.UserGender;
import com.maksyank.finance.saving.domain.Saving;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Collection;

@Data
@Entity
@Table(name = "user_account")
public class UserAccount extends BaseUser {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_user_account")
    private int id;

    @Column(name = "role")
    @Enumerated(EnumType.STRING)
    private AppRole role;

    @Column(name = "email")
    private String email;

    @Column(name = "pass")
    private String password;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "gender")
    @Enumerated(EnumType.STRING)
    private UserGender gender;

    @Column(name = "date_of_birth")
    private LocalDate dateOfBirth;

    @Column(name = "phone_number")
    private String phoneNumber;

    @Column(name = "created_on")
    private LocalDateTime createdOn;

    @Column(name = "last_login")
    private LocalDateTime lastLogin;

    @OneToMany(mappedBy = "userAccount", fetch = FetchType.LAZY)
    private Collection<Saving> savings;

    @Override
    public String toString() {
        return "UserAccount(id=" + this.getId() + ", role=" + this.getRole() +
                ", email=" + this.getEmail() + ", password=" + this.getPassword() +
                ", firstName=" + this.getFirstName() + ", lastName=" + this.getLastName() +
                ", gender=" + this.getGender() + ", dateOfBirth=" + this.getDateOfBirth() +
                ", phoneNumber=" + this.getPhoneNumber() + ", createdOn=" + this.getCreatedOn() +
                ", lastLogin=" + this.getLastLogin() + ")";
    }
}

package com.maksyank.finance.financegoal.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Base64;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Embeddable
public class FinanceGoalImage {
    @Column(name = "type_image")
    private String type;
    @Column(name = "image")
    private byte[] value;

    public String getValue() {
        return Base64.getEncoder().encodeToString(this.value);
    }

    public void setValue(byte[] image) {
        this.value = image;
    }

    public void setImage(String image) {
        this.value = Base64.getDecoder().decode(image);
    }
}

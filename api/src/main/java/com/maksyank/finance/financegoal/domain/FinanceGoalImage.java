package com.maksyank.finance.financegoal.domain;

import com.maksyank.finance.financegoal.domain.enums.ImageType;
import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Base64;

@Data
@NoArgsConstructor
@Embeddable
public class FinanceGoalImage {
    @Column(name = "type_image")
    private ImageType type;
    @Column(name = "image")
    private byte[] value;

    public FinanceGoalImage(ImageType type, byte[] value) {
        this.type = type;
        this.setValue(value);
    }

    public FinanceGoalImage(ImageType type, String value) {
        this.type = type;
        this.setValue(value);
    }

    public String getValue() {
        return Base64.getEncoder().encodeToString(this.value);
    }

    public void setValue(byte[] image) {
        this.value = image;
    }

    public void setValue(String image) {
        this.value = Base64.getDecoder().decode(image);
    }
}

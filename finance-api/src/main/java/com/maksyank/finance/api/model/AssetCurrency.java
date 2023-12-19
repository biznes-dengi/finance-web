package com.maksyank.finance.api.model;

import com.maksyank.finance.api.model.base.BaseAsset;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class AssetCurrency extends BaseAsset {
    BigDecimal value;
}

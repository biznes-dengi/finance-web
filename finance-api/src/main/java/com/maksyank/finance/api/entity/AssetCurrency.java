package com.maksyank.finance.api.entity;

import com.maksyank.finance.api.entity.base.BaseAsset;
import lombok.Data;

import java.math.BigDecimal;

public class AssetCurrency extends BaseAsset {
    private BigDecimal value;
}

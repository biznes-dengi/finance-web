package com.maksyank.finance.api.entity;

import com.maksyank.finance.api.entity.base.BasePortfolio;
import lombok.Data;

import java.util.Collection;

public class Portfolio extends BasePortfolio {
    private Collection<AssetCurrency> assetCurrency;
    private Goal goal;
}

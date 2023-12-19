package com.maksyank.finance.api.model;

import com.maksyank.finance.api.model.base.BasePortfolio;
import lombok.Data;

import java.util.Collection;

@Data
public class Portfolio extends BasePortfolio {
    private Collection<AssetCurrency> assetCurrency;
    private Goal goal;
}

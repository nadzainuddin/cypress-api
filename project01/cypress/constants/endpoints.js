const Endpoints = {
    intraday_trade_summary: '/trade-summary',
    intraday_trades_details: '/trade-details/stockcode/{stock_code}',
    gov_issuance_redemption: '/gov-issuances-redemption/year/{year}',
    size_outstanding_amount: '/size-outstanding-amount/year/{year}',
    size_rating_composition: '/size-rating-composition',
    yields_curve: '/yields-curve',
    gen_bond_details: '/general-bond-details',
    bond_rating: '/rating/stock-code/{string}',
    corp_bond: '/corporate-bond'
};

export default Endpoints;
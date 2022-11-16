describe('Verify Auction Endpoints', () => {

    context('GET /auction-result', () => {
        it('Should return all auction result', () => {
            cy.request({
                method: 'GET', 
                url: '/auction-result',
                headers: {
                    'accept': 'application/vnd.BNM.API.v1+json'
                }
            }).should((response) => {
                expect(response.status).to.eq(200)
                expect(Object.keys(response.body.data)).to.have.length(862)
            });
        });
    });

    context('GET /auction-result', () => {
        it('Should return first 10 auction result by stock_code', () => {
            cy.request({
                method: 'GET', 
                url: '/auction-result',
                headers: {
                    'accept': 'application/vnd.BNM.API.v1+json'
                }
            }).then((response) => {
                for(let i = 0; i<5; i++) {
                    let stock = response.body.data[i].stock_code;

                    cy.request({
                        method: 'GET', 
                        url: '/auction-result/stockcode/' + stock,
                        headers: {
                            'accept': 'application/vnd.BNM.API.v1+json'
                        }
                    }).should((response) => {
                        expect(response.body.data[0].stock_code).to.deep.equal(stock);
                    });
                }
            });
        });
    });
});
describe('Covid JHUCSSE api', () => {

    let baseUrl = '/historical';

    context('GET /v3/covid-19/historical', () => {
        it('Should return covid historical data', () => {
            cy.request('GET', baseUrl).should((response) => {
                expect(response.status).to.eq(200)
                
                for(let i = 0; i<50; i++) {
                    
                    let country = response.body[i].country;
                    let province = response.body[i].province;
                    
                    if(province !== null) {
                        cy.request('GET', baseUrl + '/' + country + '/' + province + '?lastdays=2').should((response) => {
                            expect(response.status).to.eq(200)
                            expect(response.body.country).to.eq(country)
                            expect(response.body.province).to.eq(province)
                            expect(Object.keys(response.body.timeline.cases)).to.have.lengthOf(2)
                            expect(Object.keys(response.body.timeline.deaths)).to.have.lengthOf(2)
                            expect(Object.keys(response.body.timeline.recovered)).to.have.lengthOf(2)
                        });
                    }   
                }
            });
        });
    });
});
describe('Covid Vaccine api', () => {

    let baseUrl = '/vaccine';

    context('GET /v3/covid-19/vaccine', () => {
        it('Should return vaccine trial data from RAPS', () => {
            cy.request('GET', baseUrl).should((response) => {
                expect(response.status).to.eq(200)
                expect(parseInt(response.body.totalCandidates)).to.equal(51);
            });
        });
    });

    context('GET /v3/covid-19/vaccine/coverage/countries/{country}', () => {
        it('Should return vaccine trial data from RAPS based on country', () => {
            cy.request('GET', baseUrl + '/coverage/countries').then((response) => {
                let country = response.body[5].country;
                
                cy.request('GET', baseUrl + '/coverage/countries/' + country).should((response) => {
                    expect(response.status).to.eq(200);
                    expect(response.body.country).to.eq(country);
                    expect(response.body.timeline).not.to.be.empty;
                });
            });
        });
    });

    context('GET /v3/covid-19/vaccine/coverage/countries/{country}', () => {
        it('Should return vaccine trial data from RAPS based on first 10 countries available on the list', () => {
            cy.request('GET', baseUrl + '/coverage/countries').then((response) => {
                for(let i = 0; i<10; i++) {
                    let country = response.body[i].country;
                    cy.request('GET', baseUrl + '/coverage/countries/' + country).should((response) => {
                        expect(response.status).to.eq(200);
                        expect(response.body.country).to.eq(country);
                        expect(response.body.timeline).not.to.be.empty;
                    });
                }
            });
        });
    });
});
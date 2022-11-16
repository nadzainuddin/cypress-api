describe('Covid Worldometers api', () => {
    let group_of_states = ['Colorado','Texas','Kentucky','Maryland'];

    context('GET /v3/covid-19/all', () => {
        it('should return global totals covid case', () => {
            cy.request({ method: 'GET', url: '/all'}).should((response) => {
                expect(response.status).to.eq(200)
                expect(response.body.affectedCountries).to.eq(230)
            });
        });
    });

    context('GET /v3/covid-19/states', () => {
        it('should return covid-19 total case for all US states', () => {
            cy.request({ method: 'GET', url: '/states'}).should((response) => {
                expect(response.status).to.eq(200)
                expect(response.body).to.have.length(63)
            });
        });
    });

    context('GET /v3/covid-19/states/{states}', () => {
        it('should return covid-19 total case for specified states', () => {
            cy.request({ method: 'GET', url: '/states'}).should((response) => {
                let state = response.body[0].state;
                cy.request({ method: 'GET', url: '/states/'+ state}).should((response) => {
                    expect(response.status).to.eq(200)
                    expect(response.body.state).to.eq(state)
                });
            });

            let states_group = group_of_states.join(encodeURIComponent(','));
            cy.request({ method: 'GET', url: '/states/'+states_group }).should((response) => {
                expect(response.status).to.eq(200)
                expect(response.body).to.have.length(4)
                for(let x = 0; x < response.body.length; x++) {
                    expect(response.body[x].state).to.contains(group_of_states[x])
                }
            });
        });
    });

    context('GET /v3/covid-19/continents', () => {
        it('Should return covid-19 total case for all continents', () => {
            cy.request({ method: 'GET', url: '/continents' }).should((response) => {
                expect(response.status).to.eq(200)
                expect(response.body).to.have.length(6)
            });
        });
    });

    context('GET /v3/covid-19/continents/{continent}', () => {
        it('Should return covid-19 total case for specific continents', () => {
            cy.request({ method: 'GET', url: '/continents' }).should((response) => {
                for(let i = 0; i<5; i++) {
                    let continent = response.body[i].continent;
                    cy.request({
                        method: 'GET',
                        url: '/continents/'+continent
                    }).should((response) => {
                        expect(response.status).to.eq(200)
                        expect(response.body.continent).to.eq(continent)
                        expect(response.body.countries).to.not.empty;
                    });
                }
            });  
        });
    });
});
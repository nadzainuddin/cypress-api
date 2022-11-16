describe('Pet Store api', () => {

    context('GET /findPetsByStatus', () => {
        it('Should return pet by status', () => {
            cy.request({
                method: 'GET', 
                url: '/findByStatus',
                header: {
                    'key': 'api_key',
                    'value': 'special-key'
                },
                qs: {
                    'status': 'available'
                }
            }).should((response) => {
                expect(response.status).to.eq(200)
                for(let i = 0; i<response.body.length; i++) {
                    expect(response.body[i].status).to.eq('available')
                }
            });
        });
    });


    context('DELETE /{pet}', () => {
        it('Should able to delete pet', () => {
            cy.request({
                method: 'POST', 
                url: '/',
                header: {
                    'key': 'api_key',
                    'value': 'special-key'
                },
                body: {
                    "id": 5533566,
                    "name": "snowy",
                    "status": "available"
                }
            }).then((response) => {
                expect(response.status).to.eq(200)
                cy.log("Pet successfully added")

                let id = response.body.id;

                cy.request({
                    method: 'GET', 
                    url: '/' + id,
                    header: {
                        'key': 'api_key',
                        'value': 'special-key'
                    }
                }).then((response) => {
                    expect(response.status).to.eq(200)
                    expect(response.body.id).to.eq(id)
                    cy.log("Pet is available")

                    cy.request({
                        method: 'DELETE', 
                        url: '/' + id,
                        header: {
                            'key': 'api_key',
                            'value': 'special-key',
                            'api_key': 'api_key'
                        }
                    }).should((response) => {
                        expect(response.status).to.eq(200)
                        cy.log("Pet successfully deleted")
                    });

                    cy.request({
                        method: 'GET', 
                        url: '/' + id,
                        header: {
                            'key': 'api_key',
                            'value': 'special-key'
                        },
                        failOnStatusCode: false
                    }).should((response) => {
                        expect(response.status).to.eq(404)
                        cy.log("Pet not found")
                    });
                });
            });
        });
    });
});
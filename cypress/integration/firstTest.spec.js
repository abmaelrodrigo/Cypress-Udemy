/// <reference types="cypress" />

//const { intersection } = require("cypress/types/lodash")

describe('Our first suite', () => {

  Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
  })

  it('first test', () => {

    cy.visit('/')

    /* cy.get('[class="top-block"]')
       .find('[class="options-wrapper"]').click()
       .then( loginForm =>{
         const email = loginForm.find('[placeholder="Email"]')
         const password = loginForm.find('[placeholder="Senha"]')
         const entrar = loginForm.find('[value="Entrar"]')
         
         
         cy.wrap(email).click().type('abmaeltestes@gmail.com')
         cy.wrap(password).click().type('AB123456#')
         cy.wrap(entrar).click()
 
         
       })*/

    cy.get('[class="top-block"]')
      .find('[class="options-wrapper"]')
      .click().find('[placeholder="Email"]')
      .click().type('abmaeltestes@gmail.com')

    cy.get('[class="top-block"]')
      .find('[class="options-wrapper"]')
      .click().find('[placeholder="Senha"]')
      .click().type('AB123456#')

    cy.get('[class="top-block"]')
      .find('[class="options-wrapper"]')
      .click().find('[value="Entrar"]')
      .click()

    cy.wait(10000)

    cy.get('[class="top-block"]')
      .find('[class="options-wrapper"]')
      .trigger('mouseover')
      .find('[class="greet"]').should('contain', "Olá Abmael Souza")


  })

  it('then and wrap methods', () => {
    cy.visit('/')
    cy.contains('cookie-warning-wrapper')
      .find('[class="accept-cookie-button"]').should('contain', 'ENTENDIDO')
  })

  it('invoke command', () => {
    cy.visit('https://dev.iguatemi365.com/customer/account/create/')


    //cy.get('[for="firstname"]').should('contain','Nome')

    cy.get('[class="field choice newsletter"]').find('[checked="checked"]')
      .invoke('attr', 'checked')
      //.should('contain','checked')
      .then(value => {
        expect(value).to.contain('checked')
      })

  })

  it('assert property', () => {
    cy.visit('https://dev.iguatemi365.com/customer/account/create/')

    //cy.get('[class="field field-name-firstname required"]').find('[class="control"]').trigger('click')
    //.click({force:true}).find('[class="input-text required-entry focus-visible"]')

    // preenchendo o primeiro nome na tela de cadastro 
    cy.get('[class="field field-name-firstname required"]')
      .find('[class="control"]')
      .find('[class="input-text required-entry"]')
      .click({ force: true })
      .type('Abmael', { force: true })
      .invoke('prop', 'value').should('contain', 'Abmael')


  })

  it('radio button', () => {

    cy.visit('https://dev.iguatemi365.com/customer/account/create/')

    cy.get('[class="field choice newsletter"]').find('[id="subscribe_newsletter"]').should('not.be.checked')

  })

  it('lists and dropdowns', () => {
    cy.visit('https://dev.iguatemi365.com/customer/account/create/')

    //1
    //cy.get('[id="gender"]').select('Masculino',{force:true})
    //cy.get('[id="gender"]').invoke('prop','value').should('contain','1')

    //2
    cy.get('[id="gender"]').select('Masculino', { force: true })
      .should('have.value', '1')


  })

  it.only('web datepicker', () => {
    function selectDayFromCurrent(day) {
      let date = new Date()
      date.setDate(date.getDate() + day)
      let futureDay = date.getDate()
      let futureMonth = date.toLocaleString('en-US', { month: 'short' })
      let dateAssert = futureMonth + ' ' + futureDay + ', ' + date.getFullYear()
      cy.get('nb-calendar-navigation').invoke('attr', 'ng-reflect-date').then(dateAttribute => {
        if (!dateAttribute.includes(futureMonth)) {
          cy.get('[data-name="chevron-right"]').click()
          selectDayFromCurrent(day)

        } else {
          cy.get('nb-calendar-day-picker [class="day-cell ng-star-inserted"]').contains(futureDay).click()
        }
      })
      return dateAssert

    }
    
    
    
    cy.visit('http://localhost:4200')
    cy.contains('Forms').click()
    cy.contains('Datepicker').click()




    cy.contains('nb-card', 'Common Datepicker').find('input').then(input => {
      cy.wrap(input).click()
      let dateAssert =  selectDayFromCurrent(40)
      cy.wrap(input).invoke('prop', 'value').should('contain', dateAssert)

      //cy.get('nb-calendar-day-picker').contains('17').click()
    })

  })




})
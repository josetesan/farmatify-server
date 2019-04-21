/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { SubscripcionComponentsPage, SubscripcionDeleteDialog, SubscripcionUpdatePage } from './subscripcion-farmatify.page-object';

const expect = chai.expect;

describe('Subscripcion e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let subscripcionUpdatePage: SubscripcionUpdatePage;
    let subscripcionComponentsPage: SubscripcionComponentsPage;
    let subscripcionDeleteDialog: SubscripcionDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Subscripcions', async () => {
        await navBarPage.goToEntity('subscripcion-farmatify');
        subscripcionComponentsPage = new SubscripcionComponentsPage();
        await browser.wait(ec.visibilityOf(subscripcionComponentsPage.title), 5000);
        expect(await subscripcionComponentsPage.getTitle()).to.eq('farmatifyApp.subscripcion.home.title');
    });

    it('should load create Subscripcion page', async () => {
        await subscripcionComponentsPage.clickOnCreateButton();
        subscripcionUpdatePage = new SubscripcionUpdatePage();
        expect(await subscripcionUpdatePage.getPageTitle()).to.eq('farmatifyApp.subscripcion.home.createOrEditLabel');
        await subscripcionUpdatePage.cancel();
    });

    it('should create and save Subscripcions', async () => {
        const nbButtonsBeforeCreate = await subscripcionComponentsPage.countDeleteButtons();

        await subscripcionComponentsPage.clickOnCreateButton();
        await promise.all([
            subscripcionUpdatePage.setIdMedicamentoInput('5'),
            subscripcionUpdatePage.setIdClienteInput('5'),
            subscripcionUpdatePage.setIdFarmaciaInput('5'),
            subscripcionUpdatePage.farmaciaSelectLastOption(),
            subscripcionUpdatePage.clienteSelectLastOption(),
            subscripcionUpdatePage.idMedicamentoSelectLastOption(),
            subscripcionUpdatePage.idFarmaciaSelectLastOption(),
            subscripcionUpdatePage.idClienteSelectLastOption()
        ]);
        expect(await subscripcionUpdatePage.getIdMedicamentoInput()).to.eq('5');
        expect(await subscripcionUpdatePage.getIdClienteInput()).to.eq('5');
        expect(await subscripcionUpdatePage.getIdFarmaciaInput()).to.eq('5');
        await subscripcionUpdatePage.save();
        expect(await subscripcionUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await subscripcionComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Subscripcion', async () => {
        const nbButtonsBeforeDelete = await subscripcionComponentsPage.countDeleteButtons();
        await subscripcionComponentsPage.clickOnLastDeleteButton();

        subscripcionDeleteDialog = new SubscripcionDeleteDialog();
        expect(await subscripcionDeleteDialog.getDialogTitle()).to.eq('farmatifyApp.subscripcion.delete.question');
        await subscripcionDeleteDialog.clickOnConfirmButton();

        expect(await subscripcionComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});

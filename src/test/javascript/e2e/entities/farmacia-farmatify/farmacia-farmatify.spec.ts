/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { FarmaciaComponentsPage, FarmaciaDeleteDialog, FarmaciaUpdatePage } from './farmacia-farmatify.page-object';

const expect = chai.expect;

describe('Farmacia e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let farmaciaUpdatePage: FarmaciaUpdatePage;
    let farmaciaComponentsPage: FarmaciaComponentsPage;
    let farmaciaDeleteDialog: FarmaciaDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Farmacias', async () => {
        await navBarPage.goToEntity('farmacia-farmatify');
        farmaciaComponentsPage = new FarmaciaComponentsPage();
        await browser.wait(ec.visibilityOf(farmaciaComponentsPage.title), 5000);
        expect(await farmaciaComponentsPage.getTitle()).to.eq('farmatifyApp.farmacia.home.title');
    });

    it('should load create Farmacia page', async () => {
        await farmaciaComponentsPage.clickOnCreateButton();
        farmaciaUpdatePage = new FarmaciaUpdatePage();
        expect(await farmaciaUpdatePage.getPageTitle()).to.eq('farmatifyApp.farmacia.home.createOrEditLabel');
        await farmaciaUpdatePage.cancel();
    });

    it('should create and save Farmacias', async () => {
        const nbButtonsBeforeCreate = await farmaciaComponentsPage.countDeleteButtons();

        await farmaciaComponentsPage.clickOnCreateButton();
        await promise.all([
            farmaciaUpdatePage.setCalleInput('calle'),
            farmaciaUpdatePage.setCodigoPostalInput('codigoPostal'),
            farmaciaUpdatePage.setCiudadInput('ciudad'),
            farmaciaUpdatePage.setProvinciaInput('provincia'),
            farmaciaUpdatePage.setTitularInput('titular')
        ]);
        expect(await farmaciaUpdatePage.getCalleInput()).to.eq('calle');
        expect(await farmaciaUpdatePage.getCodigoPostalInput()).to.eq('codigoPostal');
        expect(await farmaciaUpdatePage.getCiudadInput()).to.eq('ciudad');
        expect(await farmaciaUpdatePage.getProvinciaInput()).to.eq('provincia');
        expect(await farmaciaUpdatePage.getTitularInput()).to.eq('titular');
        await farmaciaUpdatePage.save();
        expect(await farmaciaUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await farmaciaComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Farmacia', async () => {
        const nbButtonsBeforeDelete = await farmaciaComponentsPage.countDeleteButtons();
        await farmaciaComponentsPage.clickOnLastDeleteButton();

        farmaciaDeleteDialog = new FarmaciaDeleteDialog();
        expect(await farmaciaDeleteDialog.getDialogTitle()).to.eq('farmatifyApp.farmacia.delete.question');
        await farmaciaDeleteDialog.clickOnConfirmButton();

        expect(await farmaciaComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});

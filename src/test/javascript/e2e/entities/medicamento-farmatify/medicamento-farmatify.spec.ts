/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { MedicamentoComponentsPage, MedicamentoDeleteDialog, MedicamentoUpdatePage } from './medicamento-farmatify.page-object';

const expect = chai.expect;

describe('Medicamento e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let medicamentoUpdatePage: MedicamentoUpdatePage;
    let medicamentoComponentsPage: MedicamentoComponentsPage;
    let medicamentoDeleteDialog: MedicamentoDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Medicamentos', async () => {
        await navBarPage.goToEntity('medicamento-farmatify');
        medicamentoComponentsPage = new MedicamentoComponentsPage();
        await browser.wait(ec.visibilityOf(medicamentoComponentsPage.title), 5000);
        expect(await medicamentoComponentsPage.getTitle()).to.eq('farmatifyApp.medicamento.home.title');
    });

    it('should load create Medicamento page', async () => {
        await medicamentoComponentsPage.clickOnCreateButton();
        medicamentoUpdatePage = new MedicamentoUpdatePage();
        expect(await medicamentoUpdatePage.getPageTitle()).to.eq('farmatifyApp.medicamento.home.createOrEditLabel');
        await medicamentoUpdatePage.cancel();
    });

    it('should create and save Medicamentos', async () => {
        const nbButtonsBeforeCreate = await medicamentoComponentsPage.countDeleteButtons();

        await medicamentoComponentsPage.clickOnCreateButton();
        await promise.all([
            medicamentoUpdatePage.setNombreInput('nombre'),
            medicamentoUpdatePage.setPvpInput('5'),
            medicamentoUpdatePage.setUnidadesInput('5'),
            medicamentoUpdatePage.stockSelectLastOption()
        ]);
        expect(await medicamentoUpdatePage.getNombreInput()).to.eq('nombre');
        expect(await medicamentoUpdatePage.getPvpInput()).to.eq('5');
        expect(await medicamentoUpdatePage.getUnidadesInput()).to.eq('5');
        await medicamentoUpdatePage.save();
        expect(await medicamentoUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await medicamentoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Medicamento', async () => {
        const nbButtonsBeforeDelete = await medicamentoComponentsPage.countDeleteButtons();
        await medicamentoComponentsPage.clickOnLastDeleteButton();

        medicamentoDeleteDialog = new MedicamentoDeleteDialog();
        expect(await medicamentoDeleteDialog.getDialogTitle()).to.eq('farmatifyApp.medicamento.delete.question');
        await medicamentoDeleteDialog.clickOnConfirmButton();

        expect(await medicamentoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});

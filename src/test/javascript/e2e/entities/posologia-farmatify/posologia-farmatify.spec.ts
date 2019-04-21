/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { PosologiaComponentsPage, PosologiaDeleteDialog, PosologiaUpdatePage } from './posologia-farmatify.page-object';

const expect = chai.expect;

describe('Posologia e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let posologiaUpdatePage: PosologiaUpdatePage;
    let posologiaComponentsPage: PosologiaComponentsPage;
    let posologiaDeleteDialog: PosologiaDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Posologias', async () => {
        await navBarPage.goToEntity('posologia-farmatify');
        posologiaComponentsPage = new PosologiaComponentsPage();
        await browser.wait(ec.visibilityOf(posologiaComponentsPage.title), 5000);
        expect(await posologiaComponentsPage.getTitle()).to.eq('farmatifyApp.posologia.home.title');
    });

    it('should load create Posologia page', async () => {
        await posologiaComponentsPage.clickOnCreateButton();
        posologiaUpdatePage = new PosologiaUpdatePage();
        expect(await posologiaUpdatePage.getPageTitle()).to.eq('farmatifyApp.posologia.home.createOrEditLabel');
        await posologiaUpdatePage.cancel();
    });

    it('should create and save Posologias', async () => {
        const nbButtonsBeforeCreate = await posologiaComponentsPage.countDeleteButtons();

        await posologiaComponentsPage.clickOnCreateButton();
        await promise.all([
            posologiaUpdatePage.setDiasInput('5'),
            posologiaUpdatePage.setHorasInput('5'),
            posologiaUpdatePage.medicamentoSelectLastOption()
        ]);
        expect(await posologiaUpdatePage.getDiasInput()).to.eq('5');
        expect(await posologiaUpdatePage.getHorasInput()).to.eq('5');
        await posologiaUpdatePage.save();
        expect(await posologiaUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await posologiaComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Posologia', async () => {
        const nbButtonsBeforeDelete = await posologiaComponentsPage.countDeleteButtons();
        await posologiaComponentsPage.clickOnLastDeleteButton();

        posologiaDeleteDialog = new PosologiaDeleteDialog();
        expect(await posologiaDeleteDialog.getDialogTitle()).to.eq('farmatifyApp.posologia.delete.question');
        await posologiaDeleteDialog.clickOnConfirmButton();

        expect(await posologiaComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});

/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ClienteComponentsPage, ClienteDeleteDialog, ClienteUpdatePage } from './cliente-farmatify.page-object';

const expect = chai.expect;

describe('Cliente e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let clienteUpdatePage: ClienteUpdatePage;
    let clienteComponentsPage: ClienteComponentsPage;
    let clienteDeleteDialog: ClienteDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Clientes', async () => {
        await navBarPage.goToEntity('cliente-farmatify');
        clienteComponentsPage = new ClienteComponentsPage();
        await browser.wait(ec.visibilityOf(clienteComponentsPage.title), 5000);
        expect(await clienteComponentsPage.getTitle()).to.eq('farmatifyApp.cliente.home.title');
    });

    it('should load create Cliente page', async () => {
        await clienteComponentsPage.clickOnCreateButton();
        clienteUpdatePage = new ClienteUpdatePage();
        expect(await clienteUpdatePage.getPageTitle()).to.eq('farmatifyApp.cliente.home.createOrEditLabel');
        await clienteUpdatePage.cancel();
    });

    it('should create and save Clientes', async () => {
        const nbButtonsBeforeCreate = await clienteComponentsPage.countDeleteButtons();

        await clienteComponentsPage.clickOnCreateButton();
        await promise.all([
            clienteUpdatePage.setUsuarioInput('usuario'),
            clienteUpdatePage.setPasswordInput('password'),
            clienteUpdatePage.setNombreInput('nombre')
        ]);
        expect(await clienteUpdatePage.getUsuarioInput()).to.eq('usuario');
        expect(await clienteUpdatePage.getPasswordInput()).to.eq('password');
        expect(await clienteUpdatePage.getNombreInput()).to.eq('nombre');
        await clienteUpdatePage.save();
        expect(await clienteUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await clienteComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Cliente', async () => {
        const nbButtonsBeforeDelete = await clienteComponentsPage.countDeleteButtons();
        await clienteComponentsPage.clickOnLastDeleteButton();

        clienteDeleteDialog = new ClienteDeleteDialog();
        expect(await clienteDeleteDialog.getDialogTitle()).to.eq('farmatifyApp.cliente.delete.question');
        await clienteDeleteDialog.clickOnConfirmButton();

        expect(await clienteComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});

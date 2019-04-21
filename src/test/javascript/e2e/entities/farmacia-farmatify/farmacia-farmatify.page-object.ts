import { element, by, ElementFinder } from 'protractor';

export class FarmaciaComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-farmacia-farmatify div table .btn-danger'));
    title = element.all(by.css('jhi-farmacia-farmatify div h2#page-heading span')).first();

    async clickOnCreateButton() {
        await this.createButton.click();
    }

    async clickOnLastDeleteButton() {
        await this.deleteButtons.last().click();
    }

    async countDeleteButtons() {
        return this.deleteButtons.count();
    }

    async getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class FarmaciaUpdatePage {
    pageTitle = element(by.id('jhi-farmacia-farmatify-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    calleInput = element(by.id('field_calle'));
    codigoPostalInput = element(by.id('field_codigoPostal'));
    ciudadInput = element(by.id('field_ciudad'));
    provinciaInput = element(by.id('field_provincia'));
    titularInput = element(by.id('field_titular'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setCalleInput(calle) {
        await this.calleInput.sendKeys(calle);
    }

    async getCalleInput() {
        return this.calleInput.getAttribute('value');
    }

    async setCodigoPostalInput(codigoPostal) {
        await this.codigoPostalInput.sendKeys(codigoPostal);
    }

    async getCodigoPostalInput() {
        return this.codigoPostalInput.getAttribute('value');
    }

    async setCiudadInput(ciudad) {
        await this.ciudadInput.sendKeys(ciudad);
    }

    async getCiudadInput() {
        return this.ciudadInput.getAttribute('value');
    }

    async setProvinciaInput(provincia) {
        await this.provinciaInput.sendKeys(provincia);
    }

    async getProvinciaInput() {
        return this.provinciaInput.getAttribute('value');
    }

    async setTitularInput(titular) {
        await this.titularInput.sendKeys(titular);
    }

    async getTitularInput() {
        return this.titularInput.getAttribute('value');
    }

    async save() {
        await this.saveButton.click();
    }

    async cancel() {
        await this.cancelButton.click();
    }

    getSaveButton(): ElementFinder {
        return this.saveButton;
    }
}

export class FarmaciaDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-farmacia-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-farmacia'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}

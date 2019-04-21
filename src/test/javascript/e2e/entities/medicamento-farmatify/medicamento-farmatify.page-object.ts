import { element, by, ElementFinder } from 'protractor';

export class MedicamentoComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-medicamento-farmatify div table .btn-danger'));
    title = element.all(by.css('jhi-medicamento-farmatify div h2#page-heading span')).first();

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

export class MedicamentoUpdatePage {
    pageTitle = element(by.id('jhi-medicamento-farmatify-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    nombreInput = element(by.id('field_nombre'));
    stockInput = element(by.id('field_stock'));
    pvpInput = element(by.id('field_pvp'));
    unidadesInput = element(by.id('field_unidades'));
    subscripcionSelect = element(by.id('field_subscripcion'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setNombreInput(nombre) {
        await this.nombreInput.sendKeys(nombre);
    }

    async getNombreInput() {
        return this.nombreInput.getAttribute('value');
    }

    async setStockInput(stock) {
        await this.stockInput.sendKeys(stock);
    }

    async getStockInput() {
        return this.stockInput.getAttribute('value');
    }

    async setPvpInput(pvp) {
        await this.pvpInput.sendKeys(pvp);
    }

    async getPvpInput() {
        return this.pvpInput.getAttribute('value');
    }

    async setUnidadesInput(unidades) {
        await this.unidadesInput.sendKeys(unidades);
    }

    async getUnidadesInput() {
        return this.unidadesInput.getAttribute('value');
    }

    async subscripcionSelectLastOption() {
        await this.subscripcionSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async subscripcionSelectOption(option) {
        await this.subscripcionSelect.sendKeys(option);
    }

    getSubscripcionSelect(): ElementFinder {
        return this.subscripcionSelect;
    }

    async getSubscripcionSelectedOption() {
        return this.subscripcionSelect.element(by.css('option:checked')).getText();
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

export class MedicamentoDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-medicamento-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-medicamento'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}

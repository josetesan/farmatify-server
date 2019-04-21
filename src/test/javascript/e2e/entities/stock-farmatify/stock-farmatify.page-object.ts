import { element, by, ElementFinder } from 'protractor';

export class StockComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-stock-farmatify div table .btn-danger'));
    title = element.all(by.css('jhi-stock-farmatify div h2#page-heading span')).first();

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

export class StockUpdatePage {
    pageTitle = element(by.id('jhi-stock-farmatify-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    unidadesInput = element(by.id('field_unidades'));
    fechaRepuestaInput = element(by.id('field_fechaRepuesta'));
    farmaciaSelect = element(by.id('field_farmacia'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setUnidadesInput(unidades) {
        await this.unidadesInput.sendKeys(unidades);
    }

    async getUnidadesInput() {
        return this.unidadesInput.getAttribute('value');
    }

    async setFechaRepuestaInput(fechaRepuesta) {
        await this.fechaRepuestaInput.sendKeys(fechaRepuesta);
    }

    async getFechaRepuestaInput() {
        return this.fechaRepuestaInput.getAttribute('value');
    }

    async farmaciaSelectLastOption() {
        await this.farmaciaSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async farmaciaSelectOption(option) {
        await this.farmaciaSelect.sendKeys(option);
    }

    getFarmaciaSelect(): ElementFinder {
        return this.farmaciaSelect;
    }

    async getFarmaciaSelectedOption() {
        return this.farmaciaSelect.element(by.css('option:checked')).getText();
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

export class StockDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-stock-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-stock'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}

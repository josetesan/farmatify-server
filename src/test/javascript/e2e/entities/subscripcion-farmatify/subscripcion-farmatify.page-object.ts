import { element, by, ElementFinder } from 'protractor';

export class SubscripcionComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-subscripcion-farmatify div table .btn-danger'));
    title = element.all(by.css('jhi-subscripcion-farmatify div h2#page-heading span')).first();

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

export class SubscripcionUpdatePage {
    pageTitle = element(by.id('jhi-subscripcion-farmatify-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    fechaInicioInput = element(by.id('field_fechaInicio'));
    fechaFinInput = element(by.id('field_fechaFin'));
    farmaciaSelect = element(by.id('field_farmacia'));
    usuarioSelect = element(by.id('field_usuario'));
    medicamentoSelect = element(by.id('field_medicamento'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setFechaInicioInput(fechaInicio) {
        await this.fechaInicioInput.sendKeys(fechaInicio);
    }

    async getFechaInicioInput() {
        return this.fechaInicioInput.getAttribute('value');
    }

    async setFechaFinInput(fechaFin) {
        await this.fechaFinInput.sendKeys(fechaFin);
    }

    async getFechaFinInput() {
        return this.fechaFinInput.getAttribute('value');
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

    async usuarioSelectLastOption() {
        await this.usuarioSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async usuarioSelectOption(option) {
        await this.usuarioSelect.sendKeys(option);
    }

    getUsuarioSelect(): ElementFinder {
        return this.usuarioSelect;
    }

    async getUsuarioSelectedOption() {
        return this.usuarioSelect.element(by.css('option:checked')).getText();
    }

    async medicamentoSelectLastOption() {
        await this.medicamentoSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async medicamentoSelectOption(option) {
        await this.medicamentoSelect.sendKeys(option);
    }

    getMedicamentoSelect(): ElementFinder {
        return this.medicamentoSelect;
    }

    async getMedicamentoSelectedOption() {
        return this.medicamentoSelect.element(by.css('option:checked')).getText();
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

export class SubscripcionDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-subscripcion-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-subscripcion'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}

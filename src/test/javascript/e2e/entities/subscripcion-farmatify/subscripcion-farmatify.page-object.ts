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
    idMedicamentoInput = element(by.id('field_idMedicamento'));
    idClienteInput = element(by.id('field_idCliente'));
    idFarmaciaInput = element(by.id('field_idFarmacia'));
    farmaciaSelect = element(by.id('field_farmacia'));
    clienteSelect = element(by.id('field_cliente'));
    idMedicamentoSelect = element(by.id('field_idMedicamento'));
    idFarmaciaSelect = element(by.id('field_idFarmacia'));
    idClienteSelect = element(by.id('field_idCliente'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setIdMedicamentoInput(idMedicamento) {
        await this.idMedicamentoInput.sendKeys(idMedicamento);
    }

    async getIdMedicamentoInput() {
        return this.idMedicamentoInput.getAttribute('value');
    }

    async setIdClienteInput(idCliente) {
        await this.idClienteInput.sendKeys(idCliente);
    }

    async getIdClienteInput() {
        return this.idClienteInput.getAttribute('value');
    }

    async setIdFarmaciaInput(idFarmacia) {
        await this.idFarmaciaInput.sendKeys(idFarmacia);
    }

    async getIdFarmaciaInput() {
        return this.idFarmaciaInput.getAttribute('value');
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

    async clienteSelectLastOption() {
        await this.clienteSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async clienteSelectOption(option) {
        await this.clienteSelect.sendKeys(option);
    }

    getClienteSelect(): ElementFinder {
        return this.clienteSelect;
    }

    async getClienteSelectedOption() {
        return this.clienteSelect.element(by.css('option:checked')).getText();
    }

    async idMedicamentoSelectLastOption() {
        await this.idMedicamentoSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async idMedicamentoSelectOption(option) {
        await this.idMedicamentoSelect.sendKeys(option);
    }

    getIdMedicamentoSelect(): ElementFinder {
        return this.idMedicamentoSelect;
    }

    async getIdMedicamentoSelectedOption() {
        return this.idMedicamentoSelect.element(by.css('option:checked')).getText();
    }

    async idFarmaciaSelectLastOption() {
        await this.idFarmaciaSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async idFarmaciaSelectOption(option) {
        await this.idFarmaciaSelect.sendKeys(option);
    }

    getIdFarmaciaSelect(): ElementFinder {
        return this.idFarmaciaSelect;
    }

    async getIdFarmaciaSelectedOption() {
        return this.idFarmaciaSelect.element(by.css('option:checked')).getText();
    }

    async idClienteSelectLastOption() {
        await this.idClienteSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async idClienteSelectOption(option) {
        await this.idClienteSelect.sendKeys(option);
    }

    getIdClienteSelect(): ElementFinder {
        return this.idClienteSelect;
    }

    async getIdClienteSelectedOption() {
        return this.idClienteSelect.element(by.css('option:checked')).getText();
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

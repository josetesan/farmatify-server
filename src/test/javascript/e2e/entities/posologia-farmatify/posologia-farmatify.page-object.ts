import { element, by, ElementFinder } from 'protractor';

export class PosologiaComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-posologia-farmatify div table .btn-danger'));
    title = element.all(by.css('jhi-posologia-farmatify div h2#page-heading span')).first();

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

export class PosologiaUpdatePage {
    pageTitle = element(by.id('jhi-posologia-farmatify-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    diasInput = element(by.id('field_dias'));
    horasInput = element(by.id('field_horas'));
    medicamentoSelect = element(by.id('field_medicamento'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setDiasInput(dias) {
        await this.diasInput.sendKeys(dias);
    }

    async getDiasInput() {
        return this.diasInput.getAttribute('value');
    }

    async setHorasInput(horas) {
        await this.horasInput.sendKeys(horas);
    }

    async getHorasInput() {
        return this.horasInput.getAttribute('value');
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

export class PosologiaDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-posologia-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-posologia'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}

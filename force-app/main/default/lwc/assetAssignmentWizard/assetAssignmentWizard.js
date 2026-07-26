import { LightningElement, track, wire } from 'lwc';
import getAvailableAssets from '@salesforce/apex/AssetManagementService.getAvailableAssets';
import assignAssetToEmployee from '@salesforce/apex/AssetManagementService.assignAssetToEmployee';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

const COLUMNS = [
    { label: 'Asset Number', fieldName: 'Asset_Number__c', type: 'text' },
    { label: 'Asset Name', fieldName: 'Name', type: 'text' },
    { label: 'Brand', fieldName: 'Brand__c', type: 'text' },
    { label: 'Status', fieldName: 'Status__c', type: 'text' }
];

export default class AssetAssignmentWizard extends LightningElement {
    @track currentStep = '1';
    selectedEmployeeId = '';
    selectedAssetId = '';
    selectedAssetName = '';
    @track availableAssets = [];
    columns = COLUMNS;
    isSubmitting = false;

    @wire(getAvailableAssets)
    wiredAssets({ error, data }) {
        if (data) {
            this.availableAssets = data;
        } else if (error) {
            this.showToast('Error', 'Failed to retrieve available assets.', 'error');
        }
    }

    get isStepOne() { return this.currentStep === '1'; }
    get isStepTwo() { return this.currentStep === '2'; }
    get isStepThree() { return this.currentStep === '3'; }

    get showPrevious() { return this.currentStep !== '1'; }
    get showNext() { return this.currentStep !== '3'; }

    get hasAvailableAssets() { return this.availableAssets.length > 0; }

    get isNextDisabled() {
        if (this.currentStep === '1') return !this.selectedEmployeeId;
        if (this.currentStep === '2') return !this.selectedAssetId;
        return false;
    }

    handleEmployeeSelect(event) {
        this.selectedEmployeeId = event.detail.recordId;
    }

    handleAssetSelect(event) {
        const selectedRows = event.detail.selectedRows;
        if (selectedRows.length > 0) {
            this.selectedAssetId = selectedRows[0].Id;
            this.selectedAssetName = selectedRows[0].Name;
        } else {
            this.selectedAssetId = '';
            this.selectedAssetName = '';
        }
    }

    handleNext() {
        if (this.currentStep === '1') this.currentStep = '2';
        else if (this.currentStep === '2') this.currentStep = '3';
    }

    handlePrevious() {
        if (this.currentStep === '3') this.currentStep = '2';
        else if (this.currentStep === '2') this.currentStep = '1';
    }

    async handleAssign() {
        this.isSubmitting = true;
        try {
            await assignAssetToEmployee({
                assetId: this.selectedAssetId,
                employeeId: this.selectedEmployeeId
            });
            this.showToast('Success', 'Asset assigned successfully!', 'success');
            this.resetWizard();
        } catch (error) {
            this.showToast('Error', error.body ? error.body.message : 'Assignment failed.', 'error');
        } finally {
            this.isSubmitting = false;
        }
    }

    resetWizard() {
        this.currentStep = '1';
        this.selectedEmployeeId = '';
        this.selectedAssetId = '';
        this.selectedAssetName = '';
    }

    showToast(title, message, variant) {
        this.dispatchEvent(new ShowToastEvent({ title, message, variant }));
    }
}
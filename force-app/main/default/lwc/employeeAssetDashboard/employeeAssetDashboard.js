import { LightningElement, api, wire, track } from 'lwc';
import getEmployeeDashboardData from '@salesforce/apex/AssetManagementService.getEmployeeDashboardData';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

const ASSET_COLUMNS = [
    { label: 'Asset Number', fieldName: 'Asset_Number__c', type: 'text' },
    { label: 'Asset Name', fieldName: 'Name', type: 'text' },
    { label: 'Brand', fieldName: 'Brand__c', type: 'text' },
    { label: 'Status', fieldName: 'Status__c', type: 'text' }
];

const REQUEST_COLUMNS = [
    { label: 'Request Name', fieldName: 'Name', type: 'text' },
    { label: 'Priority', fieldName: 'Priority__c', type: 'text' },
    { label: 'Status', fieldName: 'Status__c', type: 'text' }
];

export default class EmployeeAssetDashboard extends LightningElement {
    @api recordId; // Automatically captures the Employee__c Record ID from the page
    @track assignedAssets = [];
    @track maintenanceRequests = [];
    assetColumns = ASSET_COLUMNS;
    requestColumns = REQUEST_COLUMNS;
    isLoading = true;

    @wire(getEmployeeDashboardData, { recordId: '$recordId' })
    wiredDashboard({ error, data }) {
        this.isLoading = true;
        if (data) {
            this.assignedAssets = data.assignedAssets || [];
            this.maintenanceRequests = data.maintenanceRequests || [];
            this.isLoading = false;
        } else if (error) {
            this.showToast('Error', 'Failed to load dashboard data.', 'error');
            this.isLoading = false;
        }
    }

    get totalAssets() { return this.assignedAssets.length; }
    get openRequestsCount() { return this.maintenanceRequests.length; }
    get hasAssets() { return this.assignedAssets.length > 0; }
    get hasRequests() { return this.maintenanceRequests.length > 0; }

    showToast(title, message, variant) {
        this.dispatchEvent(new ShowToastEvent({ title, message, variant }));
    }
}
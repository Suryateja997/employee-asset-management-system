import { LightningElement, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import searchAssets from '@salesforce/apex/AssetManagementService.searchAssets';

const COLUMNS = [
    { label: 'Asset Number', fieldName: 'Asset_Number__c', type: 'text' },
    { label: 'Asset Name', fieldName: 'Name', type: 'text' },
    { label: 'Brand', fieldName: 'Brand__c', type: 'text' },
    { label: 'Asset Type', fieldName: 'Asset_Type__c', type: 'text' },
    { label: 'Status', fieldName: 'Status__c', type: 'text' }
];

export default class AssetSearch extends LightningElement {
    searchTerm = '';
    @track assets = [];
    columns = COLUMNS;
    isLoading = false;
    hasSearched = false;

    get hasResults() {
        return this.assets && this.assets.length > 0;
    }

    get showEmptyState() {
        return this.hasSearched && !this.isLoading && (!this.assets || this.assets.length === 0);
    }

    handleInputChange(event) {
        this.searchTerm = event.target.value;
    }

    handleKeyUp(event) {
        if (event.keyCode === 13) {
            this.handleSearch();
        }
    }

    async handleSearch() {
        if (!this.searchTerm || !this.searchTerm.trim()) {
            this.showToast('Warning', 'Please enter a keyword to search.', 'warning');
            return;
        }

        this.isLoading = true;
        this.hasSearched = true;

        try {
            const data = await searchAssets({ searchKey: this.searchTerm });
            this.assets = data;
        } catch (error) {
            this.assets = [];
            this.showToast('Error', 'Unable to retrieve assets.', 'error');
            console.error('Asset search error:', error);
        } finally {
            this.isLoading = false;
        }
    }

    handleReset() {
        this.searchTerm = '';
        this.assets = [];
        this.hasSearched = false;
        this.isLoading = false;
    }

    showToast(title, message, variant) {
        this.dispatchEvent(
            new ShowToastEvent({ title, message, variant })
        );
    }
}
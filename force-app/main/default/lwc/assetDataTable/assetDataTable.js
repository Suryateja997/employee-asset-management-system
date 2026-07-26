import { LightningElement, wire, track } from 'lwc';
import getAllAssets from '@salesforce/apex/AssetManagementService.getAllAssets';
import { refreshApex } from '@salesforce/apex';

const COLUMNS = [
    {
        label: 'Asset Number',
        fieldName: 'Asset_Number__c',
        sortable: true
    },
    {
        label: 'Asset Name',
        fieldName: 'Name',
        sortable: true
    },
    {
        label: 'Brand',
        fieldName: 'Brand__c',
        sortable: true
    },
    {
        label: 'Asset Type',
        fieldName: 'Asset_Type__c',
        sortable: true
    },
    {
        label: 'Status',
        fieldName: 'Status__c',
        sortable: true
    },
    {
        label: 'Assigned To',
        fieldName: 'assignedEmployee',
        sortable: true
    }
];

export default class AssetDataTable extends LightningElement {

    columns = COLUMNS;

    @track assets = [];
    @track displayAssets = [];

    wiredAssetsResult;

    searchKey = '';
    selectedStatus = 'All';

    sortBy = 'Name';
    sortDirection = 'asc';

    isLoading = true;

    statusOptions = [
        { label: 'All', value: 'All' },
        { label: 'Available', value: 'Available' },
        { label: 'Assigned', value: 'Assigned' },
        { label: 'Repair', value: 'Repair' },
        { label: 'Lost', value: 'Lost' },
        { label: 'Retired', value: 'Retired' }
    ];

    @wire(getAllAssets)
    wiredAssets(result) {

        this.wiredAssetsResult = result;

        const { data, error } = result;

        this.isLoading = false;

        if (data) {

            this.assets = data.map(asset => {

                return {

                    ...asset,

                    assignedEmployee:
                        asset.Assigned_To__r
                            ? asset.Assigned_To__r.Name
                            : ''

                };

            });

            this.filterAssets();

        }
        else if (error) {

            console.error(error);

        }
    }

    handleSearch(event) {

        this.searchKey = event.target.value.toLowerCase();

        this.filterAssets();

    }

    handleStatusChange(event) {

        this.selectedStatus = event.detail.value;

        this.filterAssets();

    }

    filterAssets() {

        let data = [...this.assets];

        if (this.searchKey) {

            data = data.filter(asset =>

                (asset.Name || '').toLowerCase().includes(this.searchKey)

                ||

                (asset.Asset_Number__c || '')
                    .toLowerCase()
                    .includes(this.searchKey)

                ||

                (asset.Brand__c || '')
                    .toLowerCase()
                    .includes(this.searchKey)

            );

        }

        if (this.selectedStatus !== 'All') {

            data = data.filter(

                asset => asset.Status__c === this.selectedStatus

            );

        }

        this.displayAssets = data;

    }

    handleSort(event) {

        this.sortBy = event.detail.fieldName;

        this.sortDirection = event.detail.sortDirection;

        let cloneData = [...this.displayAssets];

        cloneData.sort((a, b) => {

            let valueA = a[this.sortBy] || '';

            let valueB = b[this.sortBy] || '';

            return this.sortDirection === 'asc'

                ? (valueA > valueB ? 1 : -1)

                : (valueA < valueB ? 1 : -1);

        });

        this.displayAssets = cloneData;

    }

    refreshTable() {

        this.isLoading = true;

        refreshApex(this.wiredAssetsResult)

            .then(() => {

                this.isLoading = false;

            });

    }

}
import { LightningElement, wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getDashboardStatistics from '@salesforce/apex/AssetManagementService.getDashboardStatistics';

export default class AssetDashboardCards extends LightningElement {

    dashboard = {};

    isLoading = true;

    @wire(getDashboardStatistics)
    wiredDashboard({ error, data }) {

        this.isLoading = false;

        if (data) {
            this.dashboard = data;
        }
        else if (error) {

            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error',
                    message: 'Unable to load dashboard statistics.',
                    variant: 'error'
                })
            );

            console.error(error);
        }
    }

}
import { LightningElement, api, wire } from 'lwc';
import getBoatTypes from '@salesforce/apex/BoatDataService.getBoatTypes';
export default class BoatSearchForm extends LightningElement {

    selectedBoatTypeId = '';

    // Private
    error = undefined;
    
    searchOptions;
    @wire(getBoatTypes)
    boatTypes({ data, error }) {
        if (data) {
            this.searchOptions = data.map(type => {
                return { label: type.Name, value: type.Id };
            });
            this.searchOptions.unshift({ label: 'All Types', value: '' });
        } else if (error) {
            this.searchOptions = undefined;
            this.error = error;
        }
    }
    // Fires event that the search option has changed.
    // passes boatTypeId (value of this.selectedBoatTypeId) in the detail
    handleSearchOptionChange(event) {
        this.selectedBoatTypeId = event.detail.value;
        console.log('BoatSearchForm boat type: ', this.selectedBoatTypeId)
        // Create the const searchEvent        
        const searchEvent = new CustomEvent('search', { 
            detail: {
                boatTypeId: this.selectedBoatTypeId
            }
        });
        this.dispatchEvent(searchEvent);
    }
}
import { Component, View, bootstrap, Input } from 'angular2/angular2';
import { KendoDropDownList, KendoDatePicker, KendoButton } from './KendoComponent.es6';

@Component({
    selector: 'my-app'
})
@View({
    template: `
    <div>
        <input data-role="dropdownlist" [bound]="{dataSource: options,
            dataTextField: 'text',
            dataValueField: 'value',
            index: 0,
            change: onDropDownChange,
            value: selectedValue }" />
    </div>
    <div>
        <input data-role="datepicker" [bound]="{
            value: selectedDate,
            change: onDateChange
        }" />
    </div>
    <div>
        <div>Currently selected value : {{selectedValue}}</div>
        <div>Currently selected date : {{selectedDate}}</div>
        <button data-role="button" (click)="selectBar()">Select Bar</button>
    </div>
    `,
    directives: [KendoDropDownList, KendoDatePicker, KendoButton]
})
class AppComponent {
    constructor() {
        this.options = [
            { text: 'Foo', value: '1' },
            { text: 'Bar', value: '2' },
            { text: 'Bazz', value: '3' }
        ];
        this.selectedValue = '1';
        this.selectedDate = '1/1/2005';
        this.onDropDownChange = this.onDropDownChange.bind(this);
        this.onDateChange = this.onDateChange.bind(this);
    }
    onDropDownChange(e) {
        this.selectedValue = e.sender.value();
    }
    onDateChange(e) {
        this.selectedDate = e.sender.value();
    }
    selectBar(boundStuff) {
        this.selectedValue = '2';
    }
}

document.addEventListener('DOMContentLoaded', function() {
  bootstrap(AppComponent);
});


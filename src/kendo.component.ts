import { Component, View, Inject, Input, Output, ElementRef } from 'angular2/core';

export class KendoComponent {
    public _element;
    public _kWidget;
    private _kendoKeys;
    private _hadFirstRender: boolean = false;
    protected role: string;
    protected bound;
    protected value;
    protected widgetName: string;
    
    constructor(elementRef: ElementRef, widgetName: string) {
        this._element = elementRef.nativeElement;
        this.widgetName = widgetName; //should be overridden by inheritors
        if(!widgetName) {
            console.error('widgetName is required for KendoComponent');
        }
    }
    render() {
        this._kWidget = jQuery(this._element)[this.widgetName](this.bound);
        this._kendoKeys = [];
        for(var key in this._kWidget) {
            this._kendoKeys.push(key);
        }
    }
    ngOnChanges(changes) {
        if(changes.value) {
            !this._kWidget && this.render()
            this._kWidget.data(this.widgetName).value(this.value);
            return;
        }
        
        if(!this._kendoKeys || !this._kendoKeys.length) {
            this.render();
            this._hadFirstRender = true;
            return;
        }
        
        if(changes.bound) {
            outer: for(var propKey in changes.bound) {
                for(var kendoKeyIndex = 0; kendoKeyIndex < this._kendoKeys.length; kendoKeyIndex++) {
                    var kendoKey = this._kendoKeys[kendoKeyIndex];
                    if(propKey === kendoKey) {
                        if(typeof this._kWidget[kendoKey] === 'function') {
                            this._kWidget[kendoKey](changes.bound[propKey]);
                        }
                        continue outer;
                    }
                }
            }
        }
        this.render();
    }
    ngOnInit() {
        !this._hadFirstRender && this.render();
    }
    ngOnDestroy() {
        var kElement = jQuery(this._element);
        kElement.data(this.widgetName).destroy();
        kElement.empty();
    }
};

// function createCommonKendoComponent(selector: string, widgetName: string) {
//     @Component({
//         selector: selector,
//         template: '<ng-content></ng-content>'
//     })
//     class CommonComponent extends KendoComponent {
//         @Input() bound;
//         @Input() role: string;
        
//         constructor(elementRef: ElementRef) {            
//             super(elementRef, widgetName);
//         }
//     }
//     return CommonComponent;
// }

const template = '<ng-content></ng-content>';

@Component({ selector: '[data-role=dropdownlist]', template })
export class KendoDropDownList extends KendoComponent { @Input() bound; @Input() role: string; @Input() value; constructor(elementRef: ElementRef) { super(elementRef, 'kendoDropDownList'); } }
@Component({ selector: '[data-role=datepicker]', template })
export class KendoDatePicker extends KendoComponent { @Input() bound; @Input() role: string; @Input() value; constructor(elementRef: ElementRef) { super(elementRef, 'kendoDatePicker'); } }
@Component({ selector: '[data-role=autocomplete]', template })
export class KendoAutoComplete extends KendoComponent { @Input() bound; @Input() role: string; @Input() value; constructor(elementRef: ElementRef) { super(elementRef, 'kendoAutoComplete'); } }
@Component({ selector: '[data-role=button]', template })
export class KendoButton extends KendoComponent { @Input() bound; @Input() role: string; @Input() value; constructor(elementRef: ElementRef) { super(elementRef, 'kendoButton'); } }
@Component({ selector: '[data-role=colorpalette]', template })
export class KendoColorPalette extends KendoComponent { @Input() bound; @Input() role: string; @Input() value; constructor(elementRef: ElementRef) { super(elementRef, 'kendoColorPalette'); } }
@Component({ selector: '[data-role=colorpicker]', template })
export class KendoColorPicker extends KendoComponent { @Input() bound; @Input() role: string; @Input() value; constructor(elementRef: ElementRef) { super(elementRef, 'kendoColorPicker'); } }
@Component({ selector: '[data-role=datetimepicker]', template })
export class KendoDateTimePicker extends KendoComponent { @Input() bound; @Input() role: string; @Input() value; constructor(elementRef: ElementRef) { super(elementRef, 'kendoDateTimePicker'); } }
@Component({ selector: '[data-role=editor]', template })
export class KendoEditor extends KendoComponent { @Input() bound; @Input() role: string; @Input() value; constructor(elementRef: ElementRef) { super(elementRef, 'kendoEditor'); } }
@Component({ selector: '[data-role=maskedtextbox]', template })
export class KendoMaskedTextBox extends KendoComponent { @Input() bound; @Input() role: string; @Input() value; constructor(elementRef: ElementRef) { super(elementRef, 'kendoMaskedTextBox'); } }
@Component({ selector: '[data-role=multiselect]', template })
export class KendoMultiSelect extends KendoComponent { @Input() bound; @Input() role: string; @Input() value; constructor(elementRef: ElementRef) { super(elementRef, 'kendoMultiSelect'); } }
@Component({ selector: '[data-role=numerictextbox]', template })
export class KendoNumericTextBox extends KendoComponent { @Input() bound; @Input() role: string; @Input() value; constructor(elementRef: ElementRef) { super(elementRef, 'kendoNumericTextBox'); } }
@Component({ selector: '[data-role=slider]', template })
export class KendoSlider extends KendoComponent { @Input() bound; @Input() role: string; @Input() value; constructor(elementRef: ElementRef) { super(elementRef, 'kendoSlider'); } }
@Component({ selector: '[data-role=timepicker]', template })
export class KendoTimePicker extends KendoComponent { @Input() bound; @Input() role: string; @Input() value; constructor(elementRef: ElementRef) { super(elementRef, 'kendoTimePicker'); } }
@Component({ selector: '[data-role=upload]', template })
export class KendoUpload extends KendoComponent { @Input() bound; @Input() role: string; @Input() value; constructor(elementRef: ElementRef) { super(elementRef, 'kendoUpload'); } }
@Component({ selector: '[data-role=mobileswitch]', template })
export class KendoMobileSwitch extends KendoComponent { @Input() bound; @Input() role: string; @Input() value; constructor(elementRef: ElementRef) { super(elementRef, 'kendoMobileSwitch'); } }
@Component({ selector: '[data-role=mobilebuttongroup]', template })
export class KendoMobileButtonGroup extends KendoComponent { @Input() bound; @Input() role: string; @Input() value; constructor(elementRef: ElementRef) { super(elementRef, 'kendoMobileButtonGroup'); } }
@Component({ selector: '[data-role=menu]', template })
export class KendoMenu extends KendoComponent { @Input() bound; @Input() role: string; @Input() value; constructor(elementRef: ElementRef) { super(elementRef, 'kendoMenu'); } }
@Component({ selector: '[data-role=panelbar]', template })
export class KendoPanelBar extends KendoComponent { @Input() bound; @Input() role: string; @Input() value; constructor(elementRef: ElementRef) { super(elementRef, 'kendoPanelBar'); } }
@Component({ selector: '[data-role=tabstrip]', template })
export class KendoTabStrip extends KendoComponent { @Input() bound; @Input() role: string; @Input() value; constructor(elementRef: ElementRef) { super(elementRef, 'kendoTabStrip'); } }
@Component({ selector: '[data-role=toolbar]', template })
export class KendoToolBar extends KendoComponent { @Input() bound; @Input() role: string; @Input() value; constructor(elementRef: ElementRef) { super(elementRef, 'kendoToolBar'); } }
@Component({ selector: '[data-role=treeview]', template })
export class KendoTreeView extends KendoComponent { @Input() bound; @Input() role: string; @Input() value; constructor(elementRef: ElementRef) { super(elementRef, 'kendoTreeView'); } }
@Component({ selector: '[data-role=calendar]', template })
export class KendoCalendar extends KendoComponent { @Input() bound; @Input() role: string; @Input() value; constructor(elementRef: ElementRef) { super(elementRef, 'kendoCalendar'); } }
@Component({ selector: '[data-role=gantt]', template })
export class KendoGantt extends KendoComponent { @Input() bound; @Input() role: string; @Input() value; constructor(elementRef: ElementRef) { super(elementRef, 'kendoGantt'); } }
@Component({ selector: '[data-role=scheduler]', template })
export class KendoScheduler extends KendoComponent { @Input() bound; @Input() role: string; @Input() value; constructor(elementRef: ElementRef) { super(elementRef, 'kendoScheduler'); } }
@Component({ selector: '[data-role=grid]', template })
export class KendoGrid extends KendoComponent { @Input() bound; @Input() role: string; @Input() value; constructor(elementRef: ElementRef) { super(elementRef, 'kendoGrid'); } }
@Component({ selector: '[data-role=listview]', template })
export class KendoListView extends KendoComponent { @Input() bound; @Input() role: string; @Input() value; constructor(elementRef: ElementRef) { super(elementRef, 'kendoListView'); } }
@Component({ selector: '[data-role=pager]', template })
export class KendoPager extends KendoComponent { @Input() bound; @Input() role: string; @Input() value; constructor(elementRef: ElementRef) { super(elementRef, 'kendoPager'); } }
@Component({ selector: '[data-role=pivotgrid]', template })
export class KendoPivotGrid extends KendoComponent { @Input() bound; @Input() role: string; @Input() value; constructor(elementRef: ElementRef) { super(elementRef, 'kendoPivotGrid'); } }
@Component({ selector: '[data-role=pivotconfigurator]', template })
export class KendoPivotConfigurator extends KendoComponent { @Input() bound; @Input() role: string; @Input() value; constructor(elementRef: ElementRef) { super(elementRef, 'kendoPivotConfigurator'); } }
@Component({ selector: '[data-role=treelist]', template })
export class KendoTreeList extends KendoComponent { @Input() bound; @Input() role: string; @Input() value; constructor(elementRef: ElementRef) { super(elementRef, 'kendoTreeList'); } }
@Component({ selector: '[data-role=notification]', template })
export class KendoNotification extends KendoComponent { @Input() bound; @Input() role: string; @Input() value; constructor(elementRef: ElementRef) { super(elementRef, 'kendoNotification'); } }
@Component({ selector: '[data-role=responsivepanel]', template })
export class KendoResponsivePanel extends KendoComponent { @Input() bound; @Input() role: string; @Input() value; constructor(elementRef: ElementRef) { super(elementRef, 'kendoResponsivePanel'); } }
@Component({ selector: '[data-role=splitter]', template })
export class KendoSplitter extends KendoComponent { @Input() bound; @Input() role: string; @Input() value; constructor(elementRef: ElementRef) { super(elementRef, 'kendoSplitter'); } }
@Component({ selector: '[data-role=tooltip]', template })
export class KendoToolTip extends KendoComponent { @Input() bound; @Input() role: string; @Input() value; constructor(elementRef: ElementRef) { super(elementRef, 'kendoToolTip'); } }
@Component({ selector: '[data-role=window]', template })
export class KendoWindow extends KendoComponent { @Input() bound; @Input() role: string; @Input() value; constructor(elementRef: ElementRef) { super(elementRef, 'kendoWindow'); } }
@Component({ selector: '[data-role=draggable]', template })
export class KendoDraggable extends KendoComponent { @Input() bound; @Input() role: string; @Input() value; constructor(elementRef: ElementRef) { super(elementRef, 'kendoDraggable'); } }
@Component({ selector: '[data-role=droptarget]', template })
export class KendoDropTarget extends KendoComponent { @Input() bound; @Input() role: string; @Input() value; constructor(elementRef: ElementRef) { super(elementRef, 'kendoDropTarget'); } }
@Component({ selector: '[data-role=progressbar]', template })
export class KendoProgressBar extends KendoComponent { @Input() bound; @Input() role: string; @Input() value; constructor(elementRef: ElementRef) { super(elementRef, 'kendoProgressBar'); } }
@Component({ selector: '[data-role=sortable]', template })
export class KendoSortable extends KendoComponent { @Input() bound; @Input() role: string; @Input() value; constructor(elementRef: ElementRef) { super(elementRef, 'kendoSortable'); } }
@Component({ selector: '[data-role=chart]', template })
export class KendoChart extends KendoComponent { @Input() bound; @Input() role: string; @Input() value; constructor(elementRef: ElementRef) { super(elementRef, 'kendoChart'); } }
@Component({ selector: '[data-role=barcode]', template })
export class KendoBarCode extends KendoComponent { @Input() bound; @Input() role: string; @Input() value; constructor(elementRef: ElementRef) { super(elementRef, 'kendoBarCode'); } }
@Component({ selector: '[data-role=qrcode]', template })
export class KendoQRCode extends KendoComponent { @Input() bound; @Input() role: string; @Input() value; constructor(elementRef: ElementRef) { super(elementRef, 'kendoQRCode'); } }
@Component({ selector: '[data-role=linearguage]', template })
export class KendoLinearGuage extends KendoComponent { @Input() bound; @Input() role: string; @Input() value; constructor(elementRef: ElementRef) { super(elementRef, 'kendoLinearGuage'); } }
@Component({ selector: '[data-role=radialguage]', template })
export class KendoRadialGuage extends KendoComponent { @Input() bound; @Input() role: string; @Input() value; constructor(elementRef: ElementRef) { super(elementRef, 'kendoRadialGuage'); } }
@Component({ selector: '[data-role=diagram]', template })
export class KendoDiagram extends KendoComponent { @Input() bound; @Input() role: string; @Input() value; constructor(elementRef: ElementRef) { super(elementRef, 'kendoDiagram'); } }
@Component({ selector: '[data-role=map]', template })
export class KendoMap extends KendoComponent { @Input() bound; @Input() role: string; @Input() value; constructor(elementRef: ElementRef) { super(elementRef, 'kendoMap'); } }
@Component({ selector: '[data-role=flatcolorpicker]', template })
export class KendoFlatColorPicker extends KendoComponent { @Input() bound; @Input() role: string; @Input() value; constructor(elementRef: ElementRef) { super(elementRef, 'kendoFlatColorPicker'); } }


// export var KendoDropDownList = createCommonKendoComponent('[data-role=dropdownlist]', 'kendoDropDownList');
// export var KendoDatePicker = createCommonKendoComponent('[data-role=datepicker]', 'kendoDatePicker');
// export var KendoAutoComplete = createCommonKendoComponent('[data-role=autocomplete]', 'kendoAutoComplete');
// export var KendoButton = createCommonKendoComponent('[data-role=button]', 'kendoButton');
// export var KendoColorPalette = createCommonKendoComponent('[data-role=colorpalette]', 'kendoColorPalette');
// export var KendoColorPicker = createCommonKendoComponent('[data-role=colorpicker]', 'kendoColorPicker');
// export var KendoDateTimePicker = createCommonKendoComponent('[data-role=datetimepicker]', 'kendoDateTimePicker');
// export var KendoEditor = createCommonKendoComponent('[data-role=editor]', 'kendoEditor');
// export var KendoMaskedTextBox = createCommonKendoComponent('[data-role=maskedtextbox]', 'kendoMaskedTextBox');
// export var KendoMultiSelect = createCommonKendoComponent('[data-role=multiselect]', 'kendoMultiSelect');
// export var KendoNumericTextBox = createCommonKendoComponent('[data-role=numerictextbox]', 'kendoNumericTextBox');
// export var KendoSlider = createCommonKendoComponent('[data-role=slider]', 'kendoSlider');
// export var KendoTimePicker = createCommonKendoComponent('[data-role=timepicker]', 'kendoTimePicker');
// export var KendoUpload = createCommonKendoComponent('[data-role=upload]', 'kendoUpload');
// export var KendoMobileSwitch = createCommonKendoComponent('[data-role=mobileswitch]', 'kendoMobileSwitch');
// export var KendoMobileButtonGroup = createCommonKendoComponent('[data-role=mobilebuttongroup]', 'kendoMobileButtonGroup');
// export var KendoMenu = createCommonKendoComponent('[data-role=menu]', 'kendoMenu');
// export var KendoPanelBar = createCommonKendoComponent('[data-role=panelbar]', 'kendoPanelBar');
// export var KendoTabStrip = createCommonKendoComponent('[data-role=tabstrip]', 'kendoTabStrip');
// export var KendoToolBar = createCommonKendoComponent('[data-role=toolbar]', 'kendoToolBar');
// export var KendoTreeView = createCommonKendoComponent('[data-role=treeview]', 'kendoTreeView');
// export var KendoCalendar = createCommonKendoComponent('[data-role=calendar]', 'kendoCalendar');
// export var KendoGantt = createCommonKendoComponent('[data-role=gantt]', 'kendoGantt');
// export var KendoScheduler = createCommonKendoComponent('[data-role=scheduler]', 'kendoScheduler');
// export var KendoGrid = createCommonKendoComponent('[data-role=grid]', 'kendoGrid');
// export var KendoListView = createCommonKendoComponent('[data-role=listview]', 'kendoListView');
// export var KendoPager = createCommonKendoComponent('[data-role=pager]', 'kendoPager');
// export var KendoPivotGrid = createCommonKendoComponent('[data-role=pivotgrid]', 'kendoPivotGrid');
// export var KendoPivotConfigurator = createCommonKendoComponent('[data-role=pivotconfigurator]', 'kendoPivotConfigurator');
// export var KendoTreeList = createCommonKendoComponent('[data-role=treelist]', 'kendoTreeList');
// export var KendoNotification = createCommonKendoComponent('[data-role=notification]', 'kendoNotification');
// export var KendoResponsivePanel = createCommonKendoComponent('[data-role=responsivepanel]', 'kendoResponsivePanel');
// export var KendoSplitter = createCommonKendoComponent('[data-role=splitter]', 'kendoSplitter');
// export var KendoToolTip = createCommonKendoComponent('[data-role=tooltip]', 'kendoToolTip');
// export var KendoWindow = createCommonKendoComponent('[data-role=window]', 'kendoWindow');
// export var KendoDraggable = createCommonKendoComponent('[data-role=draggable]', 'kendoDraggable');
// export var KendoDropTarget = createCommonKendoComponent('[data-role=droptarget]', 'kendoDropTarget');
// export var KendoProgressBar = createCommonKendoComponent('[data-role=progressbar]', 'kendoProgressBar');
// export var KendoSortable = createCommonKendoComponent('[data-role=sortable]', 'kendoSortable');
// export var KendoChart = createCommonKendoComponent('[data-role=chart]', 'kendoChart');
// export var KendoBarCode = createCommonKendoComponent('[data-role=barcode]', 'kendoBarCode');
// export var KendoQRCode = createCommonKendoComponent('[data-role=qrcode]', 'kendoQRCode');
// export var KendoLinearGuage = createCommonKendoComponent('[data-role=linearguage]', 'kendoLinearGuage');
// export var KendoRadialGuage = createCommonKendoComponent('[data-role=radialguage]', 'kendoRadialGuage');
// export var KendoDiagram = createCommonKendoComponent('[data-role=diagram]', 'kendoDiagram');
// export var KendoMap = createCommonKendoComponent('[data-role=map]', 'kendoMap');
// export var KendoFlatColorPicker = createCommonKendoComponent('[data-role=flatcolorpicker]', 'kendoFlatColorPicker');

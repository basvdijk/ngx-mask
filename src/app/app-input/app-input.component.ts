import { Component, ElementRef, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './app-input.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AppInputComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => AppInputComponent),
      multi: true
    }
  ]
})
export class AppInputComponent implements OnInit, ControlValueAccessor {

  // get accessor
  public get value(): any {
    return this.innerValue;
  }

  // set accessor including call the onchange callback
  public set value(value: any) {
    if (value !== this.innerValue) {
      this.innerValue = value;
      this.onChangeCallback(value);
    }
  }
  
  // The internal data model
  private innerValue = '';

  public constructor() {}

  public ngOnInit() {
  }

  // Set touched on blur
  public onBlur() {
    this.onTouchedCallback();
  }

  // From ControlValueAccessor interface
  public writeValue(value: any) {
    if (value !== this.innerValue) {
      this.innerValue = value;
    }
  }

  // From ControlValueAccessor interface
  public registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  // From ControlValueAccessor interface
  public registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }
  // Placeholders for the callbacks which are later provided
  // by the Control Value Accessor
  private onTouchedCallback: () => void = () => {};
  private onChangeCallback: (_: any) => void = () => {};
}

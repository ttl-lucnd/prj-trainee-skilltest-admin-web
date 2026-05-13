import { DateRange } from "react-day-picker";

export interface TimeOption {
  value: number;
  label: string;
  disabled: boolean;
}

export interface BuildTimeOptions {
  use12HourFormat?: boolean;
  value: Date;
  formatStr: string;
  hour: number;
  minute: number;
  second: number;
  ampm: number;
}

export type DateTimePickerProps = {
  /**
   * The modality of the popover. When set to true, interaction with outside elements will be disabled and only popover content will be visible to screen readers.
   * If you want to use the datetime picker inside a dialog, you should set this to true.
   * @default false
   */
  modal?: boolean;
  /**
   * The datetime value to display and control.
   */
  value?: Date;
  /**
   * Callback function to handle datetime changes.
   */
  onChange?: (date: Date | undefined) => void;
  /**
   * The placeholder to display when the datetime picker is empty.
   * @default undefined
   */
  placeholder?: string;
  /**
   * The format to display the datetime.
   * @default undefined
   */
  dateFormat?: string;
  /**
   * The minimum datetime value allowed.
   * @default undefined
   */
  min?: Date;
  /**
   * The maximum datetime value allowed.
   */
  max?: Date;
  /**
   * The timezone to display the datetime in, based on the date-fns.
   * For a complete list of valid time zone identifiers, refer to:
   * https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
   * @default undefined
   */
  timezone?: string;
  /**
   * Whether the datetime picker is disabled.
   * @default false
   */
  disabled?: boolean;
  /**
   * Whether to show the time picker.
   * @default false
   */
  hideTime?: boolean;
  /**
   * Whether to use 12-hour format.
   * @default false
   */
  use12HourFormat?: boolean;
  /**
   * Whether to show the clear button.
   * @default false
   */
  allowClear?: boolean;
  /**
   * Custom class names for the component.
   */
  classNames?: {
    /**
     * Custom class names for the trigger (the button that opens the picker).
     */
    trigger?: string;
  };
  timePicker?: {
    hour?: boolean;
    minute?: boolean;
    second?: boolean;
  };
  size?: 'sm' | 'md' | 'lg';
  /**
   * The status of the datetime picker.
   * @default undefined
   */
  status?: 'error' | 'warning' | 'success';
  /**
   * Custom render function for the trigger.
   */
  renderTrigger?: (props: DateTimeRenderTriggerProps) => React.ReactNode;
};

export type DateTimeRenderTriggerProps = {
  value?: Date;
  open?: boolean;
  timezone?: string;
  disabled?: boolean;
  use12HourFormat?: boolean;
  setOpen?: (open: boolean) => void;
};

export type DateRangePickerProps = {
  /**
   * The modality of the popover. When set to true, interaction with outside elements will be disabled and only popover content will be visible to screen readers.
   * If you want to use the datetime picker inside a dialog, you should set this to true.
   * @default false
   */
  modal?: boolean;
  /**
   * The datetime value to display and control.
   */
  value?: DateRange;
  /**
   * Callback function to handle datetime changes.
   */
  onChange?: (date: DateRange | undefined) => void;
  /**
   * The placeholder to display when the datetime picker is empty.
   * @default undefined
   */
  placeholder?: string;
  /**
   * The format to display the datetime.
   * @default undefined
   */
  dateFormat?: string;
  /**
   * The minimum datetime value allowed.
   * @default undefined
   */
  min?: Date;
  /**
   * The maximum datetime value allowed.
   */
  max?: Date;
  /**
   * The timezone to display the datetime in, based on the date-fns.
   * For a complete list of valid time zone identifiers, refer to:
   * https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
   * @default undefined
   */
  timezone?: string;
  /**
   * Whether the datetime picker is disabled.
   * @default false
   */
  disabled?: boolean;
  /**
   * Whether to show the time picker.
   * @default false
   */
  hideTime?: boolean;
  /**
   * Whether to use 12-hour format.
   * @default false
   */
  use12HourFormat?: boolean;
  /**
   * Whether to show the clear button.
   * @default false
   */
  allowClear?: boolean;
  /**
   * Custom class names for the component.
   */
  classNames?: {
    /**
     * Custom class names for the trigger (the button that opens the picker).
     */
    trigger?: string;
  };
  timePicker?: {
    hour?: boolean;
    minute?: boolean;
    second?: boolean;
  };
  size?: 'sm' | 'md' | 'lg';
  /**
   * The status of the datetime picker.
   * @default undefined
   */
  status?: 'error' | 'warning' | 'success';
  /**
   * Custom render function for the trigger.
   */
  renderTrigger?: (props: DateRangeRenderTriggerProps) => React.ReactNode;
};

export type DateRangeRenderTriggerProps = {
  value?: DateRange;
  open?: boolean;
  timezone?: string;
  disabled?: boolean;
  use12HourFormat?: boolean;
  setOpen?: (open: boolean) => void;
};
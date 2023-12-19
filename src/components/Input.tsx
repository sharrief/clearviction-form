import { ExclamationCircleIcon } from '@heroicons/react/20/solid'

/**
 * The props for the Input component
 */
export interface InputProps {
  /** The name of the input */
  name: string;
  /** The label to display above the input */
  label?: string;
  /** The prefix to display before the input value */
  prefix?: string;
  /** The current value of the input */
  value: string;
  /** Whether the control is disabled */
  disabled: boolean;
  /** The type of the input element */
  type: 'email' | 'text';
  /** The handler for changes to the input value */
  onChange: (value: string) => void;
  /** Whether a value is require to be valid */
  required?: boolean;
  /** Whether the current value is invalid */
  invalid?: boolean;
  /** The message to display when the value is invalid */
  invalidMessage?: string;
}

/**
 * Renders an Input component
 * @param {InputProps} props The properties for the Input component. See {@link InputProps}
 */
export default function Input({
  name, label, prefix, disabled,
  value, type, onChange,
  required, invalid, invalidMessage }: InputProps) {
  return (
    <div>
      {label &&<label htmlFor="company-website" className="block text-sm font-medium leading-6 text-gray-900">
        {label}
      </label>}
      <div className="relative mt-2">
        <div className={`flex rounded-md shadow-sm ring-1 ring-inset ${invalid ? 'ring-red-500' : 'ring-gray-300'} focus-within:ring-2 focus-within:ring-inset ${invalid ? 'focus:ring-red-500' : 'focus:ring-neutral-600'} sm:max-w-md`}>
          {prefix && <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">{prefix}</span>}
          <input
            name={name}
            type={type}
            className={`block flex-1 border-0 bg-transparent py-1.5 ${prefix ? 'pl-0':'pl-2'} text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"`}
            value={value}
            onChange={({ target: { value } }) => onChange(value)}
            required={required}
            aria-invalid={invalid}
            disabled={disabled}
          />
        </div>
        {invalid &&
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
          </div>}
      </div>
      {invalidMessage &&
        <p className="mt-2 text-sm text-red-600" id="email-error">
          {invalidMessage}
        </p>}
    </div>
  )
}
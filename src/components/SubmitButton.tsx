/**
 * The props for the Button
 */
export interface SubmitButtonProps {
  /** The button label */
  label: string;
  /** Whether the button renders as disabled */
  disabled?: boolean;
}

/**
 * Renders a SubmitButton
 * @param {SubmitButtonProps} props The properties for the SubmitButton component. See {@link SubmitButtonProps}
 */
export default function SubmitButton({label, disabled}: SubmitButtonProps) {
  return (
    <div>
      <button
        data-testid="Submit-button"
        type="submit"
        disabled={disabled}
        className="flex w-full justify-center rounded-md bg-neutral-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-neutral-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-600"
      >
        {label}
      </button>
    </div>
  )
}
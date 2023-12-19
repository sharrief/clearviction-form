import React from 'react';
import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import SubmitButton, { SubmitButtonProps } from '@/components/SubmitButton';

jest.mock("@/util/messages.en", () => ({
  prompt: 'Test Prompt',
  invalidEmail: 'Invalid Email',
  invalidGitHubURL: 'Invalid URL',
}));

describe('SubmitButton component', () => {
  const props: SubmitButtonProps = {
    label: 'Click here'
  };
  it('initially renders correctly', async () => {
    render(<SubmitButton {...props} />);
    expect(screen.getByTestId('Submit-button')).toHaveTextContent(props.label!)
  });
  it('can be disabled', async () => {
    render(<SubmitButton {...props} disabled={true}/>);
    expect(screen.getByTestId('Submit-button')).toBeDisabled()
  });
})
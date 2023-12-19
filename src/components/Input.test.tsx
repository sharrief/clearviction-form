import React from 'react';
import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import Input, { InputProps } from '@/components/Input';

jest.mock("@/util/messages.en", () => ({
  prompt: 'Test Prompt',
  invalidEmail: 'Invalid Email',
  invalidGitHubURL: 'Invalid URL',
}));

describe('Input component', () => {
  const props: InputProps = {
    name: 'testInput', label: 'Enter your name',
    value: '', disabled: false, type: 'text',
    onChange: jest.fn()
  };
  it('initially renders correctly', async () => {
    render(<Input {...props} />);
    expect(screen.getByTestId('Input-label')).toHaveTextContent(props.label!)
    expect(screen.getByTestId('Input-input')).toHaveValue('');
    expect(screen.queryByTestId('Input-prefix')).toBeNull();
    expect(screen.queryByTestId('Input-errorIcon')).toBeNull();
    expect(screen.queryByTestId('Input-errorMessage')).toBeNull();
  });
  it('displays entered value', async () => {
    render(<Input {...props} value="John" />);
    expect(screen.getByTestId('Input-label')).toHaveTextContent(props.label!)
    expect(screen.getByTestId('Input-input')).toHaveValue('John');
    expect(screen.queryByTestId('Input-prefix')).toBeNull();
    expect(screen.queryByTestId('Input-errorIcon')).toBeNull();
    expect(screen.queryByTestId('Input-errorMessage')).toBeNull();
  })
  it('displays the prefix', async () => {
    render(<Input {...props} prefix="First name" />);
    expect(screen.getByTestId('Input-label')).toHaveTextContent(props.label!)
    expect(screen.getByTestId('Input-input')).toHaveValue('');
    expect(screen.queryByTestId('Input-prefix')).toBeInTheDocument();
    expect(screen.queryByTestId('Input-prefix')).toHaveTextContent("First name");
    expect(screen.queryByTestId('Input-errorIcon')).toBeNull();
    expect(screen.queryByTestId('Input-errorMessage')).toBeNull();
  })
  it('shows error icon', async () => {
    render(<Input {...props} invalidMessage={'Invalid input'} />);
    expect(screen.getByTestId('Input-label')).toHaveTextContent(props.label!)
    expect(screen.getByTestId('Input-input')).toHaveValue('');
    expect(screen.queryByTestId('Input-prefix')).toBeNull();
    expect(screen.queryByTestId('Input-errorIcon')).not.toBeInTheDocument();
    expect(screen.queryByTestId('Input-errorMessage')).toBeInTheDocument();
    expect(screen.queryByTestId('Input-errorMessage')).toHaveTextContent('Invalid input');
  })
  it('can be disabled', async () => {
    render(<Input {...props} disabled={true} />);
    expect(screen.getByTestId('Input-label')).toHaveTextContent(props.label!)
    expect(screen.getByTestId('Input-input')).toHaveValue('');
    expect(screen.getByTestId('Input-input')).toBeDisabled();
    expect(screen.queryByTestId('Input-prefix')).toBeNull();
    expect(screen.queryByTestId('Input-errorIcon')).not.toBeInTheDocument();
    expect(screen.queryByTestId('Input-errorMessage')).not.toBeInTheDocument();
  })
})
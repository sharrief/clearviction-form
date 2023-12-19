import React from 'react';
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import Form from '@/components/Form';

jest.mock("@/util/messages.en", () => ({
  emailLabel: "Email address",
  urlLabel: "GitHub repo URL",
  submitLabel: 'Submit',
  prompt: 'Test Prompt',
}));

const mockedFetch = jest.fn(async () => ({
    status: 200,
    statusText: '',
    json: async () => ({
       message: 'Success' 
    }),
  })
) as jest.Mock;

global.fetch = mockedFetch;

describe('useGitHubForm', () => {
  let message: HTMLElement
  let emailInput: HTMLElement
  let urlInput: HTMLElement
  let submitButton: HTMLElement

  beforeEach(() => {
    render(<Form />)
    message = screen.getByTestId('message');
    emailInput = screen.getByLabelText('Email address');
    urlInput = screen.getByLabelText('GitHub repo URL');
    submitButton = screen.getByText('Submit');
  })
  it('renders the form', async () => {
    expect(message).toHaveTextContent("Test Prompt");
  })
  it('allows email input', async () => {
    await userEvent.type(emailInput, 'john@smith.com');
    expect(emailInput).toHaveValue('john@smith.com')
  })
  it('allows URL input', async () => {
    await userEvent.type(urlInput, 'user/repo');
    expect(urlInput).toHaveValue('user/repo')
  })
  it('submits the form', async () => {
    await userEvent.type(emailInput, 'john@smith.com');
    await userEvent.type(urlInput, 'user/repo');
    await userEvent.click(submitButton);
    expect(message).toHaveTextContent('Success')
  })
})
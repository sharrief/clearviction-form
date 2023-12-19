import messages from "@/util/messages.en";
import { useEffect, useState } from "react";

/** The values returned by the useGitHubForm hook. */
export interface GitHubFormControls {
  /** The email form value */
  email: string;
  /** The onChange handler for setting the email */
  setEmail: (value: string) => void;
  /** Flag for whether the email address is valid */
  emailValid: boolean;
  /** The message to display when the email address is invalid */
  emailInvalidMessage: string;
  /** The GitHub site url, which prefixes the specified user and repository */
  prefix: string;
  /** The GitHub repo url */
  url: string;
  /** Flag for whether the url is valid */
  urlValid: boolean;
  /** The onChange handler for setting the GitHub repo url */
  setUrl: (value: string) => void;
  /** The message to display when the GitHub repo url is invalid */
  urlInvalidMessage: string;
  /** The handler for submitting the form */
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  /** Flag for whether the form is busy processing a request */
  busy: boolean;
  /** Whether the form request was sucessful */
  success: boolean;
  /** The message returned by the submission endpoint */
  message: string;
}

/**
 * 
 * @param defaultMessage The default prompt to display for the form
 * @returns Controls for interacting with the form. See {@link GitHubFormControls}
 */
function useGitHubForm(defaultMessage: string): GitHubFormControls {
  /** See {@link GitHubFormControls} for info on these state vars */
  const [email, _setEmail] = useState('');
  const setEmail = (value: string) => !success && _setEmail(value);
  const [emailInvalidMessage, setEmailInvalidMessage] = useState('');
  const [url, _setUrl] = useState('');
  const setUrl = (value: string) => !success && _setUrl(value);
  const [urlInvalidMessage, setURLInvalidMessage] = useState('');
  const [busy, setBusy] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState(defaultMessage);

  //* Grab the URL prefix from environment configuration
  const prefix = process.env.NEXT_PUBLIC_GITHUB_REPO_URL_PREFIX;

  //* Regular expressions for validaing user input
  const emailValid = (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}$/).test(email);
  const urlValid = (/^[a-zA-Z0-9._%+-]+\/[a-zA-Z0-9._%+-]+$/).test(url);
  
  //* If the user corrects an invalid email, remove the error message
  useEffect(() => {
    if (emailValid) setEmailInvalidMessage('')
  }, [emailValid])

  //* Grab the form POST endpoint from environment configuration
  const endpoint = process.env.NEXT_PUBLIC_FORM_POST_ENDPOINT;

  //* Handles validating input and submitting the request
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // TODO add logging/instrumentation
    e.preventDefault();
    //* Only allow one successful form submission
    if (success) return;

    //* Update input validation messages on invalid input during submission
    if (!emailValid) setEmailInvalidMessage(messages.invalidEmail)
    if (!urlValid) setURLInvalidMessage(messages.invalidGitHubURL)

    //* Send the request if input is valid
    if (emailValid && urlValid) {
      setBusy(true);
      const requestBody = {
        email, githubRepoUrl: `${prefix}${url}`
      }
      const res = await fetch(endpoint, {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: new Headers({"content-type": "application/json"})
      })
      if (res.status !== 200) {
        setMessage(res.statusText);
      } else {
        const result = await res.json();
        if (result.error) setMessage(result.error);
        if (result.message) { 
          setMessage(result.message);
          setSuccess(true);
        }
      }
      setBusy(false);
    }
  }
  return {
    email, setEmail,
    emailValid, 
    emailInvalidMessage,
    prefix,
    url, setUrl, urlValid,
    urlInvalidMessage,
    onSubmit,
    busy,
    success,
    message,
  }
}

export default useGitHubForm;
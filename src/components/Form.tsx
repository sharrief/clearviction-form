'use client'
import React from "react"
import Input from "@/components/Input";
import SubmitButton from "@/components/SubmitButton";
import useGitHubForm from "@/hooks/useGitHubForm";
import messages from "@/util/messages.en";

export default function Form() {
  const { 
    email, setEmail, emailValid, emailInvalidMessage,
    prefix, url, setUrl, urlValid, urlInvalidMessage,
    success, message, onSubmit, busy,
  } = useGitHubForm(messages.prompt)
  const disabled = busy || success;
  return (
    <form className="space-y-6" action="#" onSubmit={onSubmit} noValidate>
      <p data-testid="message" className="mt-10 text-center text-sm text-neutral-600 dark:text-white">
        {message}
      </p>
      <Input
        name="email"
        label={messages.emailLabel}
        value={email}
        required={true}
        type='email'
        onChange={(value) => setEmail(value)}
        invalid={!emailValid}
        invalidMessage={emailInvalidMessage}
        disabled={disabled}
      />
      <Input
        name="githubRepoUrl"
        label={messages.urlLabel}
        prefix={prefix}
        value={url}
        required={true}
        type='text'
        onChange={(value) => setUrl(value)}
        invalid={!urlValid}
        invalidMessage={urlInvalidMessage}
        disabled={disabled}
      />
      <SubmitButton label={messages.submitLabel} disabled={disabled}/>
    </form>
  )
}
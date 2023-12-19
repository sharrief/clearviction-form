declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_GITHUB_REPO_URL_PREFIX: string;
      NEXT_PUBLIC_FORM_POST_ENDPOINT: string;
    }
  }
}

export {}
export interface FormField {
  name: string;
  type: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  minLength?: number;
  value?: string;
}

export interface SubmitButtonConfig {
  text: string;
  loadingText: string;
}

export interface DemoCredentials {
  enabled: boolean;
  username: string;
  password: string;
}

export interface FormLink {
  href: string;
  text: string;
  class: string;
}

export interface FormConfig {
  fields: FormField[];
  submitButton: SubmitButtonConfig;
  demoCredentials: DemoCredentials;
  links: FormLink[];
}

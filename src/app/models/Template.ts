export interface Template {
  id: number;
  name: string;
  title: string;
  email: boolean;
  subject: string;
  email_template: string;
  sms: boolean;
  sms_template: string;
  updated_at: string;
}

export interface TemplateFilter {
  search?: string;
}

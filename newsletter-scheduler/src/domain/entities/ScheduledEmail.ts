type ScheduledEmailProps = {
  id: string;
  template: string;
  variables: Record<string, string>;
  sent: boolean;
  scheduleDate: number;
};

export class ScheduledEmail {
  public readonly id: string;
  public readonly template: string;
  public readonly variables: Record<string, string>;
  public readonly sent: boolean;
  public readonly scheduleDate: number;

  constructor(props: ScheduledEmailProps) {
    this.id = props.id;
    this.template = props.template;
    this.variables = props.variables;
    this.sent = props.sent;
    this.scheduleDate = props.scheduleDate;
  }
}

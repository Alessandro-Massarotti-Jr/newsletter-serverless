export class EmailTemplate {
  protected name: string;
  protected template: string;
  protected title: string;

  constructor(props: { name: string; template: string; title: string }) {
    this.name = props.name;
    this.template = props.template;
    this.title = props.title;
  }

  public getTemplate(variables?: Record<string, string>): string {
    let finalTemplate = this.template;

    for (const variableName in variables) {
      finalTemplate = finalTemplate.replace(
        `:${variableName}`,
        variables[variableName]
      );
    }

    return finalTemplate;
  }

  public getTitle(): string {
    return this.title;
  }
}

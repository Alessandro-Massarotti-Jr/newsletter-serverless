type SubscriberProps = {
  email: string;
  id: string;
};

export class Subscriber {
  public id: string;
  public email: string;

  constructor(props: SubscriberProps) {
    this.email = props.email;
    this.id = props.id;
  }
}

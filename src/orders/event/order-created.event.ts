export const EVENT_KEY_ORDER_CREATED = 'order.created';

export interface OrderCreatedEventOptionsPayload {}

export interface OrderCreatedEventOptions {
  orderUniqueId: string;
  payload: OrderCreatedEventOptionsPayload;
}

export class OrderCreatedEvent {
  orderUniqueId: string;
  payload: OrderCreatedEventOptionsPayload;

  constructor(private options: OrderCreatedEventOptions) {
    this.orderUniqueId = options.orderUniqueId;
    this.payload = options.payload;
  }
}

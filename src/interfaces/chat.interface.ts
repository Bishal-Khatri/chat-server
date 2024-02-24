export interface Chat {
  id?: number;
  name: string;
  is_group: boolean;
  last_message_id?: number;
  admin_id: number;
  receiver_id: number;
}

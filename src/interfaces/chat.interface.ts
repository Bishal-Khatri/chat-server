export interface Chat {
  id: number;
  name: string;
  is_group: boolean;
  last_message?: string;
  admin_id: number;
  receiver_id: number;
  inbox_hash: string;
}

export interface StatusInterface {
  code: string;
  description: string;
  dateTime?: Date;
  unity: UnityInterface;
  destiny?: UnityInterface;
}

export interface UnityInterface {
  city: string;
  state: string;
  type: string;
}
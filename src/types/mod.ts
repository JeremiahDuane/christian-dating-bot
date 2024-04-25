namespace Mod {
  export enum ModAction {
    BAN = "BAN",
    MUTE = "MUTE",
    MESSAGE_REMOVAL = "MESSAGE_REMOVAL",
  }

  export interface ModLogMessage {
    message: string;
    action: ModAction;
    mod: string;
  }
}
export = Mod;

import { Schema } from 'mongoose';
import { Context, NarrowedContext, Scenes } from 'telegraf';
import { Update, Message } from 'telegraf/typings/core/types/typegram';

interface WizardSessionData extends Scenes.WizardSessionData {
  code: string;
  description: string;
  userID: Schema.Types.ObjectId;
  trackID: Schema.Types.ObjectId | string;
  inativeUserCallBack: NodeJS.Timeout;
}

export interface WizardSceneInterface
  extends NarrowedContext<
    Context<Update>,
    {
      message: Update.New & Update.NonChannel & Message.TextMessage;
      update_id: number;
    }
  > {
  scene: Scenes.SceneContextScene<WizardSceneInterface, WizardSessionData>;
  wizard: Scenes.WizardContextWizard<WizardSceneInterface>;
  userID: Schema.Types.ObjectId;
  trackID: Schema.Types.ObjectId | string;
}

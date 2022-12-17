import { Context, NarrowedContext, Scenes } from 'telegraf';
import { Update, Message } from 'telegraf/typings/core/types/typegram';

interface WizardSessionData extends Scenes.WizardSessionData {
  nome: string;
  idade: string;
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
}

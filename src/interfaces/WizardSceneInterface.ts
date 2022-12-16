import { Context, NarrowedContext } from 'telegraf';
import { Update, Message } from 'telegraf/typings/core/types/typegram';
import { SceneContextScene } from 'telegraf/typings/scenes';

export interface BaseSceneInterface
  extends NarrowedContext<
    Context<Update>,
    {
      message: Update.New & Update.NonChannel & Message.TextMessage;
      update_id: number;
    }
  > {
  scene: SceneContextScene<BaseSceneInterface>;
}

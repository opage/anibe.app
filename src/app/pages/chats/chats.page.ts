import { Component, OnInit, ViewChild } from '@angular/core';
import { IChat, IUserSelf } from 'src/app/services/interfaces';
import { Router } from '@angular/router';
import { ChatService } from 'src/app/services/chat.service';
import { ModalController } from '@ionic/angular';
import { ChatCreatePage } from '../chat-create/chat-create.page';
import { Storage } from '@ionic/storage';
import { Firebase } from '@ionic-native/firebase/ngx';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.page.html',
  styleUrls: ['./chats.page.scss'],
})
export class ChatsPage implements OnInit {

  public chats: IChat[] = [];
  @ViewChild('myList') private slidingList: any;

  private userlocal: IUserSelf;

  constructor(
    private router: Router,
    private cs: ChatService,
    private modalController: ModalController,
    private storage: Storage,
    private firebase: Firebase
  ) { }

  async ngOnInit() {
    await this.load();

    this.userlocal = await this.storage.get('user_local');
    await this.firebase.setScreenName('chats');
  }

  public async createChat(chatinfo?: IChat) {
    const modal = await this.modalController.create({
      component: ChatCreatePage,
      componentProps: {
         title: chatinfo ? 'Редактирование' : 'Создание нового чата',
        info: chatinfo
      }
    });
    await modal.present();
    await modal.onDidDismiss();
    await this.load();
  }

  public async update(event: any) {
    this.load()
      .then(() => event.target.complete())
      .catch(() => event.target.cansel());
  }

  public async open(id: string) {
    this.router.navigateByUrl(`/chat-id/${id}`);
  }

  public async remove(id: string) {
    await this.cs.deleteChat(id);
    await this.load();
    await this.slidingList.closeOpened();
  }

  private async load(): Promise<any> {
    if (this.chats === []) {
      await this.slidingList.closeOpened();
    }
    this.chats = await this.cs.getAll();
  }

  public async ionViewWillLeave() {
    // заглушка, иногда пользователь не использует у коментов доп кнопки
    try {
      await this.slidingList.closeOpened();
    } catch (e) {
      console.log(e);
    }
  }
}

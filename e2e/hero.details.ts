import {by, element} from 'protractor';
import {By} from 'selenium-webdriver';
import {HeroDetailsPage} from './hero.details.po';

export interface Details {
  id: string,
  name: string
}

export class HeroDetails implements Details {
  id: string;
  name: string;
  public static async fromDetailsPage() {
    return new HeroDetails(
      await HeroDetailsPage.id(),
      await HeroDetailsPage.currentName());
  }
  public static async fromSelectedHeroInList() {
    const id = await element(by.css('li.selected .badge')).getText();
    const name = await element(by.css('li.selected .hero-element')).getText();
    return new HeroDetails(id, name.replace(id + ' ', ''));
  }
  public constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  };


}

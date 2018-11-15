import {by, element} from 'protractor';
import {By} from 'selenium-webdriver';
import {HeroDetails} from './hero.details';
import {putText} from './lib/utils';

function inputNameLocator(): By {
  return by.css('input');
}

export class HeroDetailsPage {
  public static async id(): Promise<string> {
    const id = await element(by.xpath('//my-hero-detail//label/..')).getText();
    return await id.replace('id: ', '');
  }
  public static async currentName(): Promise<string> {
    return await element(inputNameLocator()).getAttribute('value');
  }
  public static async setName(newName: string): Promise<void> {
    await putText(inputNameLocator(), newName);
  }
  public static async getBack(): Promise<void> {
    await element(by.css('button')).click();
  }
  public static async save(): Promise<void> {
    await element(by.cssContainingText('button', 'Save')).click();
  }
}

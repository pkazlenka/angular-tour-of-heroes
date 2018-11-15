import {browser, by, element, ElementFinder} from 'protractor';
import {putText} from './lib/utils';
import {By} from 'selenium-webdriver';

function nthHeroLocator(position: number): By {
  return by.css('li:nth-child(' + position + ')');
}
export class HeroesPage {
  public static async tableName(): Promise<string> {
    return await element(by.css('my-heroes > h2')).getText();
  }
  public static async selectHeroInPosition(position: number): Promise<void> {
    const until = browser.ExpectedConditions;
    await browser.wait(until.presenceOf(element(nthHeroLocator(position))));
    await element(nthHeroLocator(position)).click();
  }
  public static async goToSelectedHeroDetails(): Promise<void> {
    await element(by.cssContainingText('button', 'View Details')).click();
  }
  public static async list(): Promise<string[]> {
    const result: string[] = [];
    const heroesNamesElements = await element.all(by.css('.hero-element'));
    for (const elem of heroesNamesElements) {
      const text = await elem.getText();
      await result.push(text.split(' ').slice(1, 100).join(' '));
    }
    return await result;
  }
  public static async addNewHero(heroName: string): Promise<void> {
    await element(by.cssContainingText('button', 'New Hero')).click();
    await putText(by.css('div[_ngcontent-c2] input'), heroName);
    await element(by.cssContainingText('button', 'Save')).click();
  }

  public static async deleteHero(position: number): Promise<void> {
    await element(by.css('li:nth-child(' + position + ') button')).click();
  }
}

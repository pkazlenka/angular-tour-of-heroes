import {browser, by, element, ElementFinder, protractor} from 'protractor';
import {By} from 'selenium-webdriver';

export class DashboardPage {
  private static searchResultLocator(): By {
    return by.className('search-result');
  }

  private static heroBox(): By {
    return by.className('hero');
  }
  static async searchFor(searchPhrase: string): Promise<void> {
    await browser.findElement(by.id('search-box')).sendKeys(searchPhrase + '\n');
  }
  static async searchResults(): Promise<string[]> {
    const result = await [];
    const searchResultsElements = await element.all(DashboardPage.searchResultLocator());
    for (const elem of searchResultsElements) {
      result.push(await elem.getText());
    }
    return await result;
  }
  static async chooseHeroNumber(numberInRow: number): Promise<void> {
    const heroElements =  await element.all(this.heroBox());
    await heroElements[numberInRow - 1].click();
  }
  static async goToHeroesTab(): Promise<void> {
    await element(by.css('[routerlink="/heroes"]')).click();
  }
}

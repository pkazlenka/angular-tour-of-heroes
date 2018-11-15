import {async} from 'q';
import {element} from 'protractor';
import {By} from 'selenium-webdriver';

export async function putText(locator: By, text: string): Promise<void> {
  const input = await element(locator);
  await input.click();
  await input.clear();
  await input.sendKeys(text);
}

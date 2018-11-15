import { BlankPage } from './app.po';
import {browser} from 'protractor';
import {Pages} from './lib/pages';
import {DashboardPage} from './dashboard.po';
import {HeroDetails} from './hero.details';
import {HeroesPage} from './heroes.po';
import {HeroDetailsPage} from './hero.details.po';

describe('blank App', () => {
  let page: BlankPage;

  beforeEach(() => {
    page = new BlankPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Tour of Heroes');
  });
  it ('should display correct search results', async () => {
    await browser.get(Pages.DASHBOARD);
    await DashboardPage.searchFor('na');
    await expect(await DashboardPage.searchResults()).toEqual(['Narco', 'Dynama', 'Tornado']);
  });
  it ('should show hero details from dashboard', async () => {
    await browser.get(Pages.DASHBOARD);
    await DashboardPage.chooseHeroNumber(2);
    await expect(HeroDetails.fromDetailsPage())
      .toEqual(new HeroDetails('13', 'Bombasto'),
        'Details don\'t match');
  });
  it ('should switch to heroes tab from dashboard', async () => {
    await browser.get(Pages.DASHBOARD);
    await DashboardPage.goToHeroesTab();
    await expect(HeroesPage.tableName()).toEqual('My Heroes')
  });
  it ('should show hero details in heroes list', async () => {
    await browser.get(Pages.HEROES);
    await HeroesPage.selectHeroInPosition(3);
    await expect(HeroDetails.fromSelectedHeroInList())
      .toEqual(new HeroDetails('13', 'Bombasto'),
        'Details don\'t match');
  });
  it ('should show hero details from heroes list', async () => {
    await browser.get(Pages.HEROES);
    await HeroesPage.selectHeroInPosition(3);
    const expectedDetails = await HeroDetails.fromSelectedHeroInList();
    await HeroesPage.goToSelectedHeroDetails();
    await expect(HeroDetails.fromDetailsPage())
      .toEqual(expectedDetails,
        'Details don\'t match');
  });
  it ('should not change hero\'s name if not saved', async () => {
    await browser.get(Pages.HEROES);
    await HeroesPage.selectHeroInPosition(3);
    const expectedDetails = await HeroDetails.fromSelectedHeroInList();
    await HeroesPage.goToSelectedHeroDetails();
    await HeroDetailsPage.setName('Hello');
    await HeroDetailsPage.getBack();
    await HeroesPage.selectHeroInPosition(3);
    await expect(HeroDetails.fromSelectedHeroInList())
      .toEqual(expectedDetails,
        'Details don\'t match');
  });
  it ('should allow to create a new hero', async () => {
    const newHero = 'Dolan';
    await browser.get(Pages.HEROES);
    const expectedHeroesList = await HeroesPage.list();
    await expectedHeroesList.push(newHero);
    await HeroesPage.addNewHero(newHero);
    await expect(await HeroesPage.list()).toEqual(expectedHeroesList,
      'New hero was not added to list');
  });
  it ('should allow to edit a new hero', async () => {
    const newName = 'Gooby';
    await browser.get(Pages.HEROES);
    await HeroesPage.selectHeroInPosition(3);
    const expectedDetails = await HeroDetails.fromSelectedHeroInList();
    expectedDetails.name = newName;
    await HeroesPage.goToSelectedHeroDetails();
    await HeroDetailsPage.setName(newName);
    await HeroDetailsPage.save();
    await HeroesPage.selectHeroInPosition(3);
    await expect(HeroDetails.fromSelectedHeroInList())
      .toEqual(expectedDetails,
        'Details don\'t match');
  });
  it ('should allow to delete a hero', async () => {
    const positionInListToDelete = 3;
    await browser.get(Pages.HEROES);
    const expectedHeroesList = await HeroesPage.list();
    await expectedHeroesList.splice(positionInListToDelete - 1, 1);
    await HeroesPage.deleteHero(positionInListToDelete);
    await expect(await HeroesPage.list()).toEqual(expectedHeroesList,
      'Hero was not deleted from list');
  });
});

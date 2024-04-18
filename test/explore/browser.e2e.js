import { api } from '@node-e2e/cli/api/index.js';

import {
  exploreDataset as dataset,
  lockPassword,
} from '../../dataset/index.js';
import {
  pages,
  ExploreHelper,
  ExploreDynamicEntryType,
  DevHelper,
  util,
} from '../../config/setup.js';

const {
  app,
  homePage,
  exploreIndexPage,
  exploreBrowserPage,
  exploreTabManagePage,
  exploreOptionPage,
  settingPage,
} = pages;

describe('explore - browser', () => {
  before(async () => {
    await api.globalStore.clear();
    await api.waitUntilAppInit();
    await api.back();
    await homePage.clickSettingBtn();
    await settingPage.waitEntryPage();
    await settingPage.enableDev();
    await settingPage.enableDevOverLay();
  });

  beforeEach(async () => {
    await DevHelper.clearBrowserData();
    await app.toHomePage();
  });

  // it(
  //   'OK-24738 - browser manage - 1',
  //   api.platformChain
  //     .ios()
  //     .android()
  //     .bind(
  //       util.forEachAsync(dataset.threeTab, async ({ input, output }) => {
  //         await homePage.clickDiscoveryBtn();
  //         // 点击「Browser」- 无窗口不显示工具栏
  //         await exploreIndexPage.waitEntryPage();
  //         await ExploreHelper.createTab(
  //           input.searchTerms[0],
  //           ExploreDynamicEntryType.INDEX_SEARCH,
  //         );
  //         await exploreBrowserPage.switchContextToWebView();
  //         // 手势上下滑动页面 - 手势下拉刷新 - 上下滑动正常，刷新成功
  //         await exploreBrowserPage.inWebviewCheckFresh(async () => {
  //           await exploreBrowserPage.scrollUp();
  //           await exploreBrowserPage.waitForPageLoadComplete();
  //         });
  //         await exploreBrowserPage.switchContextToAppView();
  //         await exploreBrowserPage.scrollDown();
  //         await exploreBrowserPage.checkToolBarExistsStatusWithExpect(false);
  //         await exploreBrowserPage.scrollUp();
  //         await exploreBrowserPage.checkToolBarExistsStatusWithExpect(true);
  //         await exploreBrowserPage.clickToolBarTabsBtn();
  //         await exploreTabManagePage.clickDoneBtn();

  //         await ExploreHelper.createTab(
  //           input.searchTerms[1],
  //           ExploreDynamicEntryType.TOOLBAR,
  //         );

  //         await exploreBrowserPage.switchContextToWebView();
  //         await exploreBrowserPage.inWebviewCheckFresh(async () => {
  //           await exploreBrowserPage.switchContextToAppView();
  //           await exploreBrowserPage.clickToolBarOptionsBtn();
  //           await exploreOptionPage.clickReloadBtn();
  //           await exploreBrowserPage.switchContextToWebView();
  //         });
  //         await exploreBrowserPage.switchContextToAppView();

  //         await exploreBrowserPage.clickToolBarOptionsBtn();
  //         await exploreOptionPage.clickBookmarkBtn();
  //         await exploreBrowserPage.clickToolBarOptionsBtn();
  //         await exploreOptionPage.checkBookmarkedWithExpect();

  //         await exploreBrowserPage.clickToolBarOptionsBtn();
  //         await exploreOptionPage.clickPinBtn();
  //         await exploreBrowserPage.clickToolBarOptionsBtn();
  //         await exploreOptionPage.checkPinedWithExpect();

  //         await exploreBrowserPage.clickToolBarOptionsBtn();
  //         await exploreOptionPage.clickShareBtn();
  //         await exploreOptionPage.checkShareOpenWithExpect();
  //         await exploreOptionPage.closeShareMenu();
  //         await exploreBrowserPage.clickToolBarOptionsBtn();
  //         await exploreOptionPage.clickOpenBtn();
  //         await exploreOptionPage.checkOpenBrowserWithExpect();
  //         await api.activeApp();
  //         await exploreBrowserPage.clickToolBarOptionsBtn();
  //         await exploreOptionPage.clickBackToHomeBtn();
  //         await exploreBrowserPage.checkToolBarExistsStatusWithExpect(true);
  //         await exploreBrowserPage.scrollDown();
  //         await exploreBrowserPage.checkToolBarExistsStatusWithExpect(false);
  //         await exploreBrowserPage.scrollUp();

  //         await exploreBrowserPage.checkToolBarExistsStatusWithExpect(true);
  //       }),
  //     ),
  // );

  it(
    'OK-24738 - browser manage - 2',
    api.platformChain
      .ios()
      .android()
      .bind(
        util.forEachAsync(dataset.threeTab, async ({ input, output }) => {
          await homePage.clickDiscoveryBtn();
          await exploreIndexPage.waitEntryPage();

          await util.forEachAsync(input.searchTerms, async term => {
            await ExploreHelper.createTab(term);
          })();

          await app.restart();
          await app.toHomePage();
          await homePage.clickDiscoveryBtn();
          await exploreIndexPage.waitEntryPage();
          await exploreBrowserPage.clickToolBarTabsBtn();

          await exploreBrowserPage.waitTabContainerLoad();
          await exploreBrowserPage.checkTabsCountWithExpect(3);

          await exploreBrowserPage.clickInactiveTab();
          await exploreBrowserPage.clickToolBarTabsBtn();

          // active tab
          await ExploreHelper.longPressTabCheckFnWithExpect(true, 2);
          // inactive tab
          await ExploreHelper.longPressTabCheckFnWithExpect(false, 1);

          await exploreBrowserPage.longClickTab();
          await exploreOptionPage.clickPinBtn();

          await exploreBrowserPage.longClickPinnedTab();
          await exploreOptionPage.clickBookmarkBtn();

          await exploreBrowserPage.longClickPinnedTab();
          await exploreOptionPage.checkBookmarkedWithExpect();
          await exploreOptionPage.clickShareBtn();
          await exploreOptionPage.checkShareOpenWithExpect();
          await exploreOptionPage.closeShareMenu();

          await exploreBrowserPage.longClickPinnedTab();
          await exploreOptionPage.clickRemovePinBtn();

          await exploreBrowserPage.longClickTab();
          await exploreOptionPage.clickPinBtn();
          await exploreBrowserPage.longClickPinnedTab();
          await exploreOptionPage.clickClosePinTabBtn();
          await exploreIndexPage.checkSearchBtnExisting(); // 自动到首页
        }),
      ),
  );

  it(
    'OK-24738 - electron browser manage - 1',
    api.platformChain.electron().bind(
      util.forEachAsync(dataset.oneTab, async ({ input, output }) => {
        await homePage.clickDiscoveryBtn();
        await exploreIndexPage.waitEntryPage();

        await exploreIndexPage.clickFirstDapp();
        await exploreBrowserPage.waitForWebviewLoad();
        await exploreBrowserPage.checkNavDisableStatusWithExpect(true, true);

        await exploreBrowserPage.clickInWebViewNav();
        await exploreBrowserPage.waitForWebviewLoad();
        await exploreBrowserPage.checkNavDisableStatusWithExpect(true, false);

        await exploreBrowserPage.clickBrowserGoBack();
        await exploreBrowserPage.checkNavDisableStatusWithExpect(false, true);
        await exploreBrowserPage.clickBrowserGoForward();
        await exploreBrowserPage.checkNavDisableStatusWithExpect(true, false);

        await exploreBrowserPage.inWebviewCheckFresh(async () => {
          await exploreBrowserPage.clickBrowserReload();
        });

        await exploreBrowserPage.clickBrowserBookmark();
        await exploreBrowserPage.checkBrowserBookmarkedWithExpect(true);

        await exploreBrowserPage.clickBrowserPin();
        await exploreBrowserPage.checkBrowserPinedWithExpect(true);

        // await exploreIndexPage.shortCutCreateTab();
        // await exploreIndexPage.search(input.searchTerm);
        // await exploreIndexPage.waitForSearchResult();
        // await exploreIndexPage.clickSearchResultByIndex(1);
        // await exploreBrowserPage.waitForWebviewLoad();
        // await exploreBrowserPage.inWebviewCheckFresh(async () => {
        //   await exploreBrowserPage.shortCutFreshTab();
        // });
        // await exploreBrowserPage.checkNavDisableStatusWithExpect(true, true);
        // await exploreBrowserPage.clickInWebViewNav();
        // await exploreBrowserPage.waitForWebviewLoad();
        // await exploreBrowserPage.checkNavDisableStatusWithExpect(true, false);
        // await exploreBrowserPage.shortCutGoBack();
        // await exploreBrowserPage.checkNavDisableStatusWithExpect(false, true);
        // await exploreBrowserPage.shortCutGoForward();
        // await exploreBrowserPage.checkNavDisableStatusWithExpect(false, true);
      }),
    ),
  );

  it(
    'OK-24739 - Browser General rules - Close Non-Pinned Tabs When Pinned Tabs Exist',
    api.platformChain
      .ios()
      .android()
      .electron()
      .bind(
        util.forEachAsync(dataset.threeTab, async ({ input, output }) => {
          await homePage.clickDiscoveryBtn();
          await exploreIndexPage.waitEntryPage();

          await util.forEachAsync(input.searchTerms, async term => {
            await ExploreHelper.createTab(term);
          })();

          await exploreBrowserPage.clickToolBarTabsBtn();

          await exploreBrowserPage.longClickTab();
          await exploreOptionPage.clickPinBtn();

          await api.platformChain.electron().run(async () => {
            await homePage.clickDiscoveryBtn();
            await exploreBrowserPage.clickToolBarOptionsBtn();
            await exploreBrowserPage.clickCloseAllTabElectronBtn();
          });
          await api.platformChain
            .ios()
            .android()
            .run(async () => {
              await exploreBrowserPage.clickCloseAllTabBtn();
            });

          await exploreBrowserPage.checkTabsCountWithExpect(0);
          await exploreBrowserPage.checkPinTabCountWithExpect(1);
        }),
      ),
  );

  it(
    'OK-24739 - Browser General rules - Close All Tabs When No Pinned Tabs Exist',
    api.platformChain
      .ios()
      .android()
      .electron()
      .bind(
        util.forEachAsync(dataset.threeTab, async ({ input, output }) => {
          await homePage.clickDiscoveryBtn();
          await exploreIndexPage.waitEntryPage();

          await util.forEachAsync(input.searchTerms, async term => {
            await ExploreHelper.createTab(term);
          })();

          await api.platformChain
            .ios()
            .android()
            .run(async () => {
              await exploreBrowserPage.clickToolBarTabsBtn();
              await exploreBrowserPage.clickCloseAllTabBtn();
            });

          await api.platformChain
            .not()
            .ios()
            .android()
            .run(async () => {
              await homePage.clickDiscoveryBtn();
              await exploreBrowserPage.clickToolBarOptionsBtn();
              await exploreBrowserPage.clickCloseAllTabBtn();
            });

          await exploreIndexPage.assertCurrentPage();
        }),
      ),
  );

  it(
    'OK-24739 - Browser General rules - Close When Only One Non-Pinned Tab or One Pinned Tab Exists',
    api.platformChain
      .ios()
      .android()
      .electron()
      .bind(
        util.forEachAsync(dataset.twoTab, async ({ input, output }) => {
          await homePage.clickDiscoveryBtn();
          await exploreIndexPage.waitEntryPage();

          await util.forEachAsync(input.searchTerms, async term => {
            await ExploreHelper.createTab(term);
          })();

          await exploreBrowserPage.clickToolBarTabsBtn();

          await exploreBrowserPage.longClickTab();
          await exploreOptionPage.clickPinBtn();

          await api.platformChain.electron().run(async () => {
            await homePage.clickDiscoveryBtn();
            await exploreBrowserPage.clickToolBarOptionsBtn();
            await exploreBrowserPage.clickCloseAllTabElectronBtn();
          });
          await api.platformChain
            .ios()
            .android()
            .run(async () => {
              await exploreBrowserPage.clickCloseAllTabBtn();
            });
          await exploreIndexPage.assertCurrentPage();
        }),
      ),
  );

  it(
    'OK-24739 - Browser General rules - Close Current Selected Tab',
    api.platformChain
      .ios()
      .android()
      .electron()
      .bind(
        util.forEachAsync(dataset.twoTab, async ({ input, output }) => {
          await homePage.clickDiscoveryBtn();
          await exploreIndexPage.waitEntryPage();

          await util.forEachAsync(input.searchTerms, async term => {
            await ExploreHelper.createTab(term);
          })();

          await exploreBrowserPage.clickToolBarTabsBtn();
          await exploreBrowserPage.clickFirstTab();
          await exploreBrowserPage.clickToolBarTabsBtn();
          await exploreBrowserPage.longClickActiveTab();
          await exploreOptionPage.clickCloseTabBtn();
          await exploreBrowserPage.checkActiveTabExists();
        }),
      ),
  );

  it(
    'OK-24739 - Browser General rules - Max Window Limit Reached',
    api.platformChain
      .ios()
      .android()
      .bind(
        util.forEachAsync(dataset.maxTab, async ({ input, output }) => {
          await homePage.clickDiscoveryBtn();
          await exploreIndexPage.waitEntryPage();

          await util.forEachAsync(input.searchTerms, async term => {
            await ExploreHelper.createTab(term);
          })();

          await exploreBrowserPage.clickToolBarAddBtn();
          await app.toastShouldDisplayed();
        }),
      ),
  );

  it(
    'OK-24739 - Browser General rules - Click Address Bar',
    api.platformChain
      .ios()
      .android()
      .electron()
      .bind(
        util.forEachAsync(dataset.oneTab, async ({ input, output }) => {
          await homePage.clickDiscoveryBtn();
          await exploreIndexPage.waitEntryPage();

          await ExploreHelper.createTab(input.searchTerms);
          await exploreBrowserPage.waitForWebviewLoad();

          let urlBrowser = await exploreBrowserPage.getSearchInputText();
          console.log('>>>>>>>>>>>>> urlBrowser', urlBrowser);

          await exploreBrowserPage.clickSearchInput();
          await exploreIndexPage.checkSearchInputTextEqualWithExpect(
            urlBrowser,
          );
        }),
      ),
  );

  it(
    'OK-24739 - Browser General rules - Visit Illegal URL',
    api.platformChain
      .ios()
      .android()
      .electron()
      .bind(
        util.forEachAsync(dataset.illegalURL, async ({ input, output }) => {
          await homePage.clickDiscoveryBtn();
          await exploreIndexPage.waitEntryPage();
          await exploreIndexPage.clickSearchBtn();
          await exploreIndexPage.search(input.searchTerm);
          await exploreIndexPage.waitForSearchResult();
          // 首页搜索打开新标签页
          await exploreIndexPage.hideKeyboard();
          await exploreIndexPage.clickSearchResultByIndex(0);
          await exploreBrowserPage.waitForWebViewLoad();
          await exploreBrowserPage.checkToolBarExistsStatusWithExpect();
        }),
      ),
  );
});

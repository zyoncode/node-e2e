describe('Recording ', () => {
  it('Feature 添加钱包', async () => {
    reporter.addLabel('foo', 'bar');
    reporter.addStory('addStory');
    reporter.addDescription('描述', 'text');

    await reporter.step('my step name', async (s1) => {
      s1.label('foo', 'bar');
      s1.tag('p0');
      s1.description('添加钱包');

      await s1.step('my child step 2 name', async (s2) => {
        await browser.takeScreenshot();

        platformChain
          .ios()
          .android()
          .run(async () => {
            await browser.pause(5000);
          });
        platformChain.web().run(async () => {
          await browser.url(process.env.BASEURL);
          await browser.cdp('Browser', 'setPermission', {
            permission: 'notifications',
            setting: 'granted', // 或 'denied'
          });
        });

        await browser
          .$("[data-testid='welcome_action__create_wallet']")
          .click();
        await browser.$("[data-testid='setup_password']").click();
        await browser.$("[data-testid='setup_password']").setValue('12345678');
        await browser.$("[data-testid='setup_confirm_password']").click();
        await browser
          .$("[data-testid='setup_confirm_password']")
          .setValue('12345678');
        await browser.$("[data-testid='setup_continue']").click();
        await browser.$("[data-testid='setup_continue']").click();
        await browser
          .$("[data-testid='secondary_show_recovery_phrase']")
          .click();
        await browser.$("[data-testid='mnemonic_card_copy']").click();
        await browser
          .$("[data-testid='phrase_sheet_i_have_saved_the_phrase']")
          .click();
        await browser.pause(5000);
        await s2.step('my child step 3 name', async (s3) => {
          s3.story('完成添加钱包');
          await browser
            .$("[data-testid='process_auto_typing_action__lets_go2']")
            .click();
          await browser.pause(5000);
          await browser.$("[data-testid='modal_button_primary']").click();
        });
      });
    });
  });
});

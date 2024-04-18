describe('test 发现页 ', () => {
  it('2 story', async () => {
    await platformChain
      .ios()
      .android()
      .run(async () => {
        await play('2', {}, (context) => {
          //console.log('最终的上下文:', context);
        });
      });
  });
});

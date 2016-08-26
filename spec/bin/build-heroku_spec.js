import {childProcess} from 'node-promise-es6';

describe('build-heroku', () => {
  it('outputs "3...2...1...Hello World!"', async () => {
    const {stdout} = await childProcess.exec('build-heroku');
    expect(stdout.trim()).toBe('3...2...1...Hello World!');
  });
});

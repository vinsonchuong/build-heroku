import Directory from 'directory-helpers';
import register from 'test-inject';

const inject = register({
  project: {
    setUp: () => new Directory('project'),
    tearDown: async (project) => await project.remove()
  }
});

describe('build-cloudfoundry', () => {
  it('acts during the config stage', async () => {
    const directory = new Directory('.');
    const {stage} = await directory.read('package.json');
    expect(stage).toBe('config');
  });

  it('writes a static.json', inject(async ({project}) => {
    await project.create();
    await project.execJs(`
      import { run } from 'esnext-async';
      import buildHeroku from '../src';
      run(async () => {
        await buildHeroku();
      });
    `);

    expect(await project.read('dist/static.json')).toEqual({
      https_only: true,
      root: './',
      routes: {
        '/**': 'index.html'
      }
    });
  }));
});

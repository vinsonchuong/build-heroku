import Directory from 'directory-helpers';

const directory = new Directory('.');
export default async function() {
  await directory.write({
    'dist/static.json': {
      https_only: true,
      root: './',
      routes: {
        '/**': 'index.html'
      }
    }
  });
}

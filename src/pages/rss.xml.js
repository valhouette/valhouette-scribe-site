import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const posts = await getCollection('blogs', ({ data }) => !data.draft);
  const sorted = posts.sort(
    (a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf()
  );

  return rss({
    title: 'Valhouette Scribe',
    description: 'Essays on the depth of presence in a hyperconnected world.',
    site: context.site,
    items: sorted.map(post => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.publishDate,
      link: `/blog/${post.id}/`,
    })),
    customData: `<language>en-gb</language>`,
  });
}

import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE_DESCRIPTION, SITE_TITLE } from '../consts';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
	const posts = (await getCollection('posts'))
		.filter((post) => post.data.draft === false)
		.sort((a, b) => b.data.published.valueOf() - a.data.published.valueOf());

	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site ?? 'https://kai-blog.pages.dev',
		items: posts.map((post) => ({
			title: post.data.title,
			pubDate: post.data.published,
			description: post.data.excerpt ?? '',
			link: `/posts/${post.id}/`,
		})),
	});
}

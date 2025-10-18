export const NAV_PAGES = ['about', 'projects', 'blog']

export interface BlogPost {
  url: string
  frontmatter: {
    title: string
    preview: string
    publishedAt: string
    tags: string[]
  }
}

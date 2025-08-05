export function slugify(name: string): string {
  return name.replace(/\s+/g, "-");
}

export function deslugify(slug: string): string {
  return slug.replace(/-/g, " ");
}

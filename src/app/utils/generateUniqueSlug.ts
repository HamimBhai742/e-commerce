import slugify from "slugify";

type SlugExistsFn = (slug: string) => Promise<boolean>;

export async function generateUniqueSlug(
  value: string,
  slugExists: SlugExistsFn
): Promise<string> {
  const baseSlug = slugify(value, {
    lower: true,
    strict: true,
    trim: true,
  });

  let slug = baseSlug;
  let counter = 1;

  while (await slugExists(slug)) {
    slug = `${baseSlug}-${counter}`;
    counter++;
  }

  return slug;
}

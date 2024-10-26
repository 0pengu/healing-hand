/**
 * This wrapper lets you handle errors inside of your control flow.
 * @param promise The promise to catch errors from.
 * @returns [undefined, T] if the promise resolves successfully, [Error] otherwise.
 * @example
 * ```tsx
 * const [error, blogs] = await db.blogs.findUnique({
  where: {
      name: "Hello, world!",
    },
  });

  if (error) {
    console.error(error);
  }

  console.log(blogs);
 */
export async function tryCatch<T>(
  promise: Promise<T>,
): Promise<[undefined, T] | [Error]> {
  try {
    const data = await promise;
    return [undefined, data] as [undefined, T];
  } catch (error) {
    return [error as Error];
  }
}

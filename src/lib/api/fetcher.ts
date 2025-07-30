export async function fetcher<T>(
  url: string,
  method: string = "GET",
  options: RequestInit = {}
): Promise<T> {
  console.log(`[FETCH] ${method} ${url}`);

  try {
    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
      ...options,
    });

    if (!res.ok) {
      const error = await res.json().catch(() => ({}));
      throw new Error(`Fetch error (${res.status}): ${JSON.stringify(error)}`);
    }

    return res.json();
  } catch (err) {
    console.error(`[FETCH FAILED] ${method} ${url}`);
    console.error(err);
    throw err;
  }
}

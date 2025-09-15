interface FetchApiOptions {
  method?: HttpMethod;
  data?: unknown;
  headers?: Record<string, string>;
}

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'HEAD' | 'OPTIONS';

export async function fetchApi(
  api: string,
  { method = 'GET', data = null, headers = {} }: FetchApiOptions = {}
): Promise<Response> {
  try {
    const options: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      ...(data && method !== 'GET' ? { body: JSON.stringify(data) } : {}),
    };

    const response = await fetch(api, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response;
  } catch (error) {
    console.error('Fetch Error:', error);
    throw error;
  }
}
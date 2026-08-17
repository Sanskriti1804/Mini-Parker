import { useState, useEffect, useCallback } from "react";
import Constants from "expo-constants";
//useState - store state
//useEffect - runs code bc smthth happened or changes - run the api call when the component needs it
//useCallback - remembers a fnn so react doesnt create a new fnn every render

// Resolve API host: local Expo in __DEV__, else EXPO_PUBLIC_SERVER_URL (deployed)
const getBaseUrl = () => {
  const hostUri = Constants.expoConfig?.hostUri;
  if (__DEV__ && hostUri) {
    return `http://${hostUri}`;
  }
  return process.env.EXPO_PUBLIC_SERVER_URL ?? "";
};

//fetchApi - talks to the server (Neon API routes via Expo)
export const fetchAPI = async (url: string, options?: RequestInit) => {
  try {
    const baseUrl = getBaseUrl();
    const requestUrl = url.startsWith("http") ? url : `${baseUrl}${url}`;

    const response = await fetch(requestUrl, {
      ...options,
      // Needed so user+api.ts can parse JSON body for Neon insert
      headers: {
        "Content-Type": "application/json",
        ...(options?.headers ?? {}),
      },
    });
    if (!response.ok) {
      // Must throw — otherwise failed Neon writes look like success
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    //converts the json response into a js obj
    return await response.json();
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};

//useFetch - custom hook - manages api call - like what should react ui should do when the api call is happening
export const useFetch = <T>(url: string, options?: RequestInit) => {
  const [data, setData] = useState<T | null>(null); //successful api data
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  //to keep the fnn stable b/w renders unless url changes
  const fetchData = useCallback(async () => {
    // Skip empty urls (e.g. home tested without a signed-in user)
    if (!url) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await fetchAPI(url, options);
      setData(result.data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, [url, options]);

  //call the api when the hook is first used and whenever fetchData changes
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  //refetch - manaully call api again
  return { data, loading, error, refetch: fetchData };
};

import { useState, useEffect, useRef } from "react";
import {fetchHandler} from "../utils/fetchHandler.ts";


//usePrevious: TRACK PREVIOUS STATE
export const usePrevious = function <T>(value: T): T | undefined {
  const ref = useRef<T | undefined>(undefined);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}
/* Example usage:
const [count, setCount] = useState(0);
const prevCount = usePrevious(count);

return (
  <p>
    Now: {count}, Before: {prevCount}
  </p>
); */

//useFetch:  SIMPLIFY API CALLS
export const useFetch = function <T>(url: string) {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
  
    useEffect(() => {
      const fetchData = async () => {
        setLoading(true);
        try {
          const response = await fetchHandler(url);
          const result = await response.json();
          setData(result);
        } catch (err) {
          setError(err as Error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchData();
    }, [url]);
  
    return { data, loading, error };
  }
  /* Example usage:
  const { data, loading, error } = useFetch<User[]>('/users');

if (loading) return <p>Loading...</p>;
if (error) return <p>Error: {error.message}</p>;

return <ul>{data?.map(user => <li key={user[.]id}>{user[.]name}</li>)}</ul>; */

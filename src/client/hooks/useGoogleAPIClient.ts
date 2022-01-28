import { useQuery } from 'react-query';
import { gapi } from 'gapi-script';

// Promise resolved when gapi.client is loaded.
const loadGapiClient = new Promise<void>(resolve => {
  gapi.load('client', () => {
    resolve();
  });
});

// Asynchronously load the Google API from the specified discovery URL.
export default function useGoogleAPIClient(apiName: string, version: string) {
  const { isLoading } = useQuery(['useGoogleAPIClient', apiName, version], async () => {
    await loadGapiClient;
    await gapi.client.load(apiName, version);
  });
  return !isLoading;
}

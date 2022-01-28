/// <reference types="@types/google.script.client-side" />
/// <reference types="@types/gapi.client.drive" />
import { useQuery } from 'react-query';
import server from '../utils/server';
import useGoogleAPIClient from './useGoogleAPIClient';

export default function useDriveAbout(fields: string = 'user') {
  const driveApiLoaded = useGoogleAPIClient('drive', 'v3');
  return useQuery(
    'useDriveAbout',
    async () => {
      const token = (await server.serverFunctions.getOAuth2AccessToken()) as string;
      gapi.auth.setToken({ access_token: token, error: '', expires_in: '0', state: '' });
      return (await gapi.client.drive.about.get({ fields })).result;
    },
    {
      enabled: driveApiLoaded,
    }
  );
}

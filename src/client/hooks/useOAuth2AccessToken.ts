/// <reference types="@types/google.script.client-side" />
import { useQuery } from 'react-query';
import server from '../utils/server';

export default function useOAuth2AccessToken() {
  return useQuery(
    'useOAuth2AccessToken',
    async () => (await server.serverFunctions.getOAuth2AccessToken()) as string
  );
}

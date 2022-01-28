/// <reference types="@types/google.script.client-side" />
import React from 'react';
import { useAsync } from 'react-use';
import server from '../../utils/server';

export default function useOAuth2AccessToken() {
  const [token, setToken] = React.useState<string>();
  useAsync(async () => {
    setToken(await server.serverFunctions.getOAuth2AccessToken());
  });
  return token;
}

import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.agendagrilo.app',
  appName: 'AgendaGrilo',
  webDir: 'dist/front-Agenda/browser',

  server: {
    cleartext: true
  }
};

export default config;

import * as dotenv from 'dotenv';
import * as path from 'path';
import { MinecraftImageEnv, StackConfig } from './types';
import { stringAsBoolean, stringAsNumberArray } from './util';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const resolveMinecraftEnvVars = (json = ''): MinecraftImageEnv => {
  const defaults = { EULA: 'TRUE' };
  try {
    return {
      ...defaults,
      ...JSON.parse(json),
    };
  } catch (e) {
    console.error(
      'Unable to resolve .env value for MINECRAFT_IMAGE_ENV_VARS_JSON.\
      Defaults will be used'
    );
    return defaults;
  }
};

export const resolveConfig = (): StackConfig => ({
  domainName: process.env.DOMAIN_NAME || '',
  subdomainPart: process.env.SUBDOMAIN_PART || 'minecraft',
  subdomainNameservers: JSON.parse(process.env.SUBDOMAIN_NAMESERVERS ?? '[]'),
  serverRegion: process.env.SERVER_REGION || 'us-east-1',
  minecraftEdition:
    process.env.MINECRAFT_EDITION === 'bedrock' ? 'bedrock' : 'java',
  shutdownMinutes: process.env.SHUTDOWN_MINUTES || '20',
  startupMinutes: process.env.STARTUP_MINUTES || '10',
  useFargateSpot: stringAsBoolean(process.env.USE_FARGATE_SPOT) || false,
  taskCpu: +(process.env.TASK_CPU || 1024),
  taskMemory: +(process.env.TASK_MEMORY || 2048),
  vpcId: process.env.VPC_ID || '',
  minecraftImageEnv: resolveMinecraftEnvVars(
    process.env.MINECRAFT_IMAGE_ENV_VARS_JSON
  ),
  snsEmailAddress: process.env.SNS_EMAIL_ADDRESS || '',
  twilio: {
    phoneFrom: process.env.TWILIO_PHONE_FROM || '',
    phoneTo: process.env.TWILIO_PHONE_TO || '',
    accountId: process.env.TWILIO_ACCOUNT_ID || '',
    authCode: process.env.TWILIO_AUTH_CODE || '',
  },
  discord: {
    webhookUrls: process.env.DISCORD_WEBHOOK_URLS || '',
  },
  debug: stringAsBoolean(process.env.DEBUG) || false,
  extraTcpPorts: stringAsNumberArray(process.env.EXTRA_TCP_PORTS) || [],
  extraUdpPorts: stringAsNumberArray(process.env.EXTRA_UDP_PORTS) || [],
  useGeyser: stringAsBoolean(process.env.USE_GEYSER) || false,
});

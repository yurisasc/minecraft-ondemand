export const constants = {
  CLUSTER_NAME: process.env.CLUSTER_NAME ?? 'minecraft',
  SERVICE_NAME: process.env.SERVICE_NAME ?? 'minecraft-server',
  MC_SERVER_CONTAINER_NAME: 'minecraft-server',
  WATCHDOG_SERVER_CONTAINER_NAME: 'minecraft-ecsfargate-watchdog',
  DOMAIN_STACK_REGION: 'us-east-1',
  ECS_VOLUME_NAME: 'data',
  HOSTED_ZONE_SSM_PARAMETER: 'MinecraftHostedZoneID',
  LAUNCHER_LAMBDA_ARN_SSM_PARAMETER: 'LauncherLambdaRoleArn',
  JAVA_EDITION_DOCKER_IMAGE: 'itzg/minecraft-server:java8-multiarch',
  BEDROCK_EDITION_DOCKER_IMAGE: 'itzg/minecraft-bedrock-server',
};

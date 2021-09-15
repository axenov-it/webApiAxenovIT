interface TransportConfigProdInterface {
  secure: string;
  service: string;
  host: string;
  port: string;
  auth: {
    user: string;
    pass: string;
  };
}

interface TransportConfigDevInterface {
  host: string;
  port: string;
}

interface EnvOptionsResultInterface {
  to: string;
  fromDomain: string;
  transportConfig: TransportConfigDevInterface | TransportConfigProdInterface;
}

export const getMailerOptions = (): EnvOptionsResultInterface => {
  const {
    MAILER_HOST,
    MAILER_PORT,
    MAILER_SECURE,
    MAILER_SERVICE,
    MAILER_USER,
    MAILER_PASS,
    MAILER_TO,
    MAILER_FROM_DOMAIN,
  } = process.env;

  const transportProdConfig = {
    secure: MAILER_SECURE,
    service: MAILER_SERVICE,
    host: MAILER_HOST,
    port: MAILER_PORT,
    auth: {
      user: MAILER_USER,
      pass: MAILER_PASS,
    },
  };

  const transportDevConfig = {
    host: MAILER_HOST,
    port: MAILER_PORT,
  };

  return {
    to: MAILER_TO,
    fromDomain: MAILER_FROM_DOMAIN,
    transportConfig:
      process.env.MODE !== "development"
        ? transportProdConfig
        : transportDevConfig,
  };
};

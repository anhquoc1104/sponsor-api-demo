module.exports = {
  apps: [
    {
      name: 'ADMIN-API',
      script: "./build/apps/admin-service/main.js",
      env: {
        "NODE_ENV": "dev",
      },
      output: "./data/logs/sponsor-api/sponsor-api-admin.log",
      error: "./data/logs/sponsor-api/sponsor-api-admin.log",
      merge_logs: true,
      instances: 1,
      autorestart: true,
      listen_timeout: 10000,
      restart_delay: 10000,
      exec_mode: 'cluster'
    },
    {
      name: 'PUBLISHER-API',
      script: "./build/apps/publisher-service/main.js",
      env: {
        "NODE_ENV": "dev",
      },
      output: "./data/logs/sponsor-api/sponsor-api-publisher.log",
      error: "./data/logs/sponsor-api/sponsor-api-publisher.log",
      merge_logs: true,
      instances: 1,
      autorestart: true,
      listen_timeout: 10000,
      restart_delay: 10000,
      exec_mode: 'cluster'
    },
    {
      name: 'CLIENT-API',
      script: "./build/apps/client-service/main.js",
      env: {
        "NODE_ENV": "dev",
      },
      output: "./data/logs/sponsor-api/sponsor-api-client.log",
      error: "./data/logs/sponsor-api/sponsor-api-client.log",
      merge_logs: true,
      instances: 1,
      autorestart: true,
      listen_timeout: 10000,
      restart_delay: 10000,
      exec_mode: 'cluster'
    },
    {
      name: 'SCHEDULER-API',
      script: "./build/apps/scheduler-service/main.js",
      env: {
        "NODE_ENV": "dev",
      },
      output: "./data/logs/sponsor-api/sponsor-api-scheduler.log",
      error: "./data/logs/sponsor-api/sponsor-api-scheduler.log",
      merge_logs: true,
      instances: 1,
      autorestart: true,
      listen_timeout: 10000,
      restart_delay: 10000,
      exec_mode: 'cluster'
    },
  ],
};
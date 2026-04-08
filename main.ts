class AppConfig {
    private static instance: AppConfig;

    appName    = "NotifyApp";
    smtpServer = "smtp.example.com";
    maxRetries = 3;

    private constructor() {}

    static getInstance(): AppConfig {
        if (!AppConfig.instance) AppConfig.instance = new AppConfig();
        return AppConfig.instance;
    }
}

interface Notification {
    send(): void;
}

abstract class BaseNotification implements Notification {

    send(): void {
        const config = AppConfig.getInstance();
        let attempts = 0;

        while (attempts < config.maxRetries) {
            try {
                this.sendNotification();
                break;
            } catch (e) {
                console.log("Falha no envio.");
                attempts++;
            }
        }
    }

    protected abstract sendNotification(): void;
}

class EmailNotification extends BaseNotification {
    sendNotification() {
        const config = AppConfig.getInstance();
        console.log(`Enviando email ${config.smtpServer}...`);
    }
}

class SMSNotification extends BaseNotification {
    sendNotification() {
        console.log(`Enviando SMS...`);
    }
}

class PushNotification extends BaseNotification {
    sendNotification() {
        console.log(`Enviando Push...`);
    }
}

class EmailNotificationFactory {
    static create(): Notification {
        return new EmailNotification();
    }
}

class SMSNotificationFactory {
    static create(): Notification {
        return new SMSNotification();
    }
}

class PushNotificationFactory {
    static create(): Notification {
        return new PushNotification();
    }
}

const cfg = AppConfig.getInstance();
console.log(`App: ${cfg.appName} | SMTP: ${cfg.smtpServer}\n`);

EmailNotificationFactory.create().send();
SMSNotificationFactory.create().send();
PushNotificationFactory.create().send();

import { SubscriptionPlatform } from "@/utils";
import { IPackage } from "../subjects/interfaces";

export enum SubscriptionSummary {
    PREV_1_WEEK = 'prev1Week',
    PREV_1_MONTH = 'prev1Month',
    PREV_3_MONTHS = 'prev3Months',
    PREV_1_YEAR = 'prev1Year',
    TOTAL = 'total',
}

type SubscriptionPlatformSummaries = {
    [K in SubscriptionPlatform]: Record<SubscriptionSummary, number>;
};

export interface ISubscription extends SubscriptionPlatformSummaries {
    id: string;
    name: string;
}

export enum SubscriptionStatusLogType {
    PURCHASE = 'purchase',
    RESTORE = 'restore',
    RENEWAL = 'renewal',
    CANCELLATION = 'cancellation',
    EXPIRED = 'expired',
    REFUNDED = 'refunded',
    UNKNOWN = 'unknown',
}

export interface ISaleDetail {
    id: string;
    userId: string,
    userSubscriptionId: string,
    subjectSubscriptionPackageId: string,
    platform: SubscriptionPlatform,
    type: SubscriptionStatusLogType,
    actionAt: Date,
    email: string,
    amount: number,
    startDate: Date,
    endDate: Date,
    package: IPackage,
}

export enum FormType {
    CREATE = 'create',
    UPDATE = 'update',
}

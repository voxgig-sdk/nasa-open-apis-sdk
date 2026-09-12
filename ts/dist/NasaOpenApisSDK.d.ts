import { MarsPhotoEntity } from './entity/MarsPhotoEntity';
import { PlanetaryEntity } from './entity/PlanetaryEntity';
export type * from './NasaOpenApisTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { NasaOpenApisEntityBase } from './NasaOpenApisEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
declare class NasaOpenApisSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    _rawRequest(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    MarsPhoto(entopts?: Record<string, any>): MarsPhotoEntity;
    Planetary(entopts?: Record<string, any>): PlanetaryEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): NasaOpenApisSDK;
    tester(testopts?: any, sdkopts?: any): NasaOpenApisSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof NasaOpenApisSDK;
export { stdutil, config, BaseFeature, NasaOpenApisEntityBase, NasaOpenApisSDK, SDK, };

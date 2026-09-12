import { NasaOpenApisEntityBase } from '../NasaOpenApisEntityBase';
import type { NasaOpenApisSDK } from '../NasaOpenApisSDK';
import type { Control } from '../types';
import type { Planetary, PlanetaryLoadMatch } from '../NasaOpenApisTypes';
declare class PlanetaryEntity extends NasaOpenApisEntityBase<Planetary> {
    constructor(client: NasaOpenApisSDK, entopts: any);
    make(this: PlanetaryEntity): PlanetaryEntity;
    load(this: any, reqmatch?: PlanetaryLoadMatch, ctrl?: Control): Promise<PlanetaryEntity>;
}
export { PlanetaryEntity };

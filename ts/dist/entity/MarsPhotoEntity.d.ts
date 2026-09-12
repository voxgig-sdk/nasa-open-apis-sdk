import { NasaOpenApisEntityBase } from '../NasaOpenApisEntityBase';
import type { NasaOpenApisSDK } from '../NasaOpenApisSDK';
import type { Control } from '../types';
import type { MarsPhoto, MarsPhotoListMatch } from '../NasaOpenApisTypes';
declare class MarsPhotoEntity extends NasaOpenApisEntityBase<MarsPhoto> {
    constructor(client: NasaOpenApisSDK, entopts: any);
    make(this: MarsPhotoEntity): MarsPhotoEntity;
    list(this: any, reqmatch?: MarsPhotoListMatch, ctrl?: Control): Promise<MarsPhotoEntity[]>;
}
export { MarsPhotoEntity };

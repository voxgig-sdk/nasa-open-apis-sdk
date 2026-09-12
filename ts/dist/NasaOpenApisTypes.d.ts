export interface MarsPhoto {
    camera: Record<string, any>;
    earth_date: string;
    id: number;
    img_src: string;
    rover: Record<string, any>;
    sol: number;
}
export interface MarsPhotoListMatch {
    rover_id: string;
    api_key: string;
    camera?: string;
    earth_date?: string;
    page?: number;
    sol?: number;
}
export interface Planetary {
}
export interface PlanetaryLoadMatch {
    api_key: string;
    count?: number;
    date?: string;
    end_date?: string;
    start_date?: string;
    thumb?: boolean;
    $action?: string;
    [action: string]: any;
}

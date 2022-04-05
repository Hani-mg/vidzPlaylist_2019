import{ Video } from './video.model';

export class PlayList {
    public    entitled: string;
    public   user: any;
    public   videos: Array<Video>;
    public   _id: string;

        constructor(entitled: string, user: any,  videos: Array<Video>, id: string ) {
            this.entitled = entitled;
            this.user = user;
            this.videos = videos;
            this._id = id;
        }
}
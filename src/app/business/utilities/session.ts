import { User } from '../models/user.model';

export class Session {
    connected: User;
    connectedStatus: boolean;

    constructor() {
        /*this.connected = this.activiteService.getConnected();

        if(this.connected == null){
            alert('Erreur : vous devez vous connecter!!!')

            window.location.href='login';
        }*/
       // this.checkLogin();
    }
    checkLogin() {
        if (localStorage.getItem('currentUser') == null ) {
            alert('Erreur : vous devez vous connecter');
            window.location.href = 'login';
        } else {
            this.connected = JSON.parse(localStorage.getItem('currentUser'));
            this.connectedStatus=true;
        }

    }

    setConnectedUser() {
        if (localStorage.getItem('currentUser') != null ) {
            this.connected = JSON.parse(localStorage.getItem('currentUser'));
            this.connectedStatus=true;
        }
    }

    disconnect() {
        localStorage.clear();
        this.connectedStatus=false;
    }
}
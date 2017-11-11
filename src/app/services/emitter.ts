export enum EEmitterStatus {
    Loaded,
    Loading,
    NotLoaded
}

export interface IEmitter {
    onChange: (f: Function) => void;
    offChange: (f: Function) => void;
    emit: () => void;
    getStatus: () => EEmitterStatus;
    setStatus: (status: EEmitterStatus) => void;
    listeners: Function[];
    status: EEmitterStatus;
}

export class Emitter implements IEmitter {

    listeners = [];
    status = EEmitterStatus.NotLoaded;

    constructor() {}

    onChange = (f: Function) => {
        this.listeners.push(f);
    }

    offChange = (f: Function) => {
        const index = this.listeners.findIndex(fu => fu === f);
        if (index) {
            this.listeners.splice(index, 1);
        } else {
            console.error('Cant find index offChange: ' + index + ', for functions' + f);
        }
    }

    emit = () => {
        this.listeners.forEach(f => f());
    }

    getStatus = () => {
        return this.status;
    }

    setStatus = (status: EEmitterStatus) => {
        this.status = status;
    }
}

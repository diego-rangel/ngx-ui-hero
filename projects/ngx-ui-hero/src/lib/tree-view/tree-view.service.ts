import { EventEmitter, Injectable } from '@angular/core';

@Injectable()
export class TreeViewService {
    onSelecionChanged = new EventEmitter<any>();

    constructor() {
    }
}
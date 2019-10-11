import * as _ from 'lodash';

import { ElementRef, EventEmitter, Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';

import { TutorialAction } from '../classes/tutorial-action';
import { TutorialTask } from '../classes/tutorial-task';

declare var $: any;
declare var localStorage: any;

@Injectable()
export class TutorialService {
    onStepChanged = new EventEmitter<TutorialTask>();
    onStart = new EventEmitter();
    onExit = new EventEmitter();

    private _tasks: Array<TutorialTask>;
    private _runningTasks: Array<TutorialTask>;
    private _currentTaskIndex: number = -1;
    private _render: Renderer2;
    private colorPlaceholder: string;
    private unlistenKeyboardArrows: Function;

    private OVERLAY_ID = 'tutorial-orverlay';
    private BLOCKER_ID = 'element-blocker';
    private BLOCK_ID = 'element-tutorial-block';
    private BLOCK_ARROW_ID = 'element-tutorial-block-arrow';
    private BLOCK_TITLE_ID = 'element-tutorial-block-title';
    private BLOCK_BODY_ID = 'element-tutorial-block-body';
    private BLOCK_CONTROLS_ID = 'element-tutorial-block-controls';
    private BLOCK_CONTROL_PREV_ID = 'element-tutorial-block-prev-control';
    private BLOCK_CONTROL_NEXT_ID = 'element-tutorial-block-next-control';
    private BLOCK_CONTROL_INFO_ID = 'element-tutorial-block-info-control';
    private BLOCK_CONTROL_EXIT_ID = 'element-tutorial-block-exit-control';

    constructor(
        private rendererFactory: RendererFactory2,
        private router: Router
    ) {
        this._render = rendererFactory.createRenderer(null, null);

        this.router.events.subscribe((event) => {
            if (event instanceof NavigationStart) {
                this.resetTasks();
            }
        });
    }

    addAction(action: TutorialAction, element: ElementRef): void {
        let index: number = -1;

        if (!this._tasks) {
            this._tasks = new Array<TutorialTask>();
        } else {
            for (let i = 0; i < this._tasks.length; i++) {
                if (this._tasks[i].element.nativeElement.tagName == element.nativeElement.tagName
                    && this._tasks[i].action.title == action.title 
                    && this._tasks[i].action.text == action.text) {
                    
                    index = i;
                    break;
                }
            }
        }

        let task = { 
            action: action, 
            element: element
        };

        if (index >= 0) {
            this._tasks[index] = task;
        } else {
            this._tasks.push(task);
        }
    }

    playAll(): void {
        if (this._currentTaskIndex >= 0) return;

        setTimeout(() => {
            let tasks = this._tasks.filter(x => x.element && x.element.nativeElement && x.element.nativeElement.isConnected);
            if (!tasks || tasks.length == 0) return;

            tasks = _.orderBy(tasks, ['action.order'], ['asc']);

            this.play(tasks);
        });
    }
    playByKey(key: string, onlyOnce?: boolean): void {
        if (this._currentTaskIndex >= 0) return;
        
        setTimeout(() => {
            if (onlyOnce && this.getLocalStorage(key)) return;

            let tasks = this._tasks.filter(x => x.element && x.element.nativeElement && x.element.nativeElement.isConnected && x.action.key == key);
            if (!tasks || tasks.length == 0) return;

            tasks = _.orderBy(tasks, ['action.order'], ['asc']);

            this.play(tasks);

            if (onlyOnce) {
                this.setLocalStorage(key, key);
            }
        });
    }
    moveNext(): void {
        if (this._currentTaskIndex >= this._runningTasks.length - 1) {
            this.exit();
            return;
        }

        this.destroyCurrentTask();
        this._currentTaskIndex += 1;
        this.renderCurrentTask();
        this.notifyStepHasChanged();
    }
    movePrev(): void {
        if (this._currentTaskIndex == 0) return;

        this.destroyCurrentTask();
        this._currentTaskIndex -= 1;
        this.renderCurrentTask();
        this.notifyStepHasChanged();
    }
    exit(): void {
        this.destroyCurrentTask();
        this.destroyOverlay();
        this.stopListeningKeyboardArrows();

        this._currentTaskIndex = -1;
        this._runningTasks = null;

        this.onExit.emit();
    }
    resetTasks(): void {
        this._tasks = new Array<TutorialTask>();
    }

    private play(tasks: Array<TutorialTask>): void {
        this.onStart.emit();

        this._currentTaskIndex = 0;
        this._runningTasks = tasks;
        this.renderOverlay();
        this.renderCurrentTask();
        this.notifyStepHasChanged();
        this.startListeningKeyboardArrows();
    }

    //rendering
    private renderCurrentTask(): void {
        if (this._currentTaskIndex < 0) return;

        let task = this._runningTasks[this._currentTaskIndex];

        this.renderElement(task);
        this.scrollToCurrentElementBlock();
    }
    private renderElement(task: TutorialTask): void {
        this._render.setStyle(task.element.nativeElement, 'position', 'relative');
        this._render.setStyle(task.element.nativeElement, 'zIndex', '9001');

        this.renderElementBlocker(task.element);
        this.renderElementColorWhiteIfText(task.element);
        this.renderElementTutorialBlock(task);
    }
    private renderElementBlocker(el: ElementRef): void {
        let blocker = this.createElementBlocker();

        this._render.insertBefore(el.nativeElement.parentNode, blocker, el.nativeElement);
    }
    private renderElementTutorialBlock(task: TutorialTask): void {
        let block = this.createTutorialBlockElement(task);
        this.handleTutorialBlockPosition(block, task.element);

        this._render.insertBefore(task.element.nativeElement.parentNode, block, task.element.nativeElement);
    }
    private renderElementColorWhiteIfText(el: ElementRef): void {
        if (this.isCurrentElementText()) {
            this.colorPlaceholder = getComputedStyle(el.nativeElement, null).getPropertyValue('color');

            this._render.setStyle(el.nativeElement, 'color', '#FFF');
        }        
    }
    private renderOverlay(): void {
        let overlay = this.createOverLay();

        this._render.appendChild(document.body, overlay);
    }
    
    //element creations
    private createOverLay(): any {
        let overlay = this._render.createElement('div');
        this._render.setAttribute(overlay, 'id', this.OVERLAY_ID);
        this._render.setStyle(overlay, 'position', 'fixed');
        this._render.setStyle(overlay, 'width', '100%');
        this._render.setStyle(overlay, 'height', '100%');
        this._render.setStyle(overlay, 'backgroundColor', 'rgba(41, 41, 41, 0.89)');
        this._render.setStyle(overlay, 'top', '0');
        this._render.setStyle(overlay, 'zIndex', '9000');
        this._render.setStyle(document.body, 'overflow', 'hidden');

        return overlay;
    }
    private createElementBlocker(): any {
        let blocker = this._render.createElement('div');
        this._render.setAttribute(blocker, 'id', this.BLOCKER_ID);
        this._render.setStyle(blocker, 'background-color', '#00000024');
        this._render.setStyle(blocker, 'position', 'fixed');
        this._render.setStyle(blocker, 'top', '0');
        this._render.setStyle(blocker, 'left', '0');
        this._render.setStyle(blocker, 'bottom', '0');
        this._render.setStyle(blocker, 'right', '0');
        this._render.setStyle(blocker, 'zIndex', '9002');

        return blocker;
    }
    private createTutorialBlockElement(task: TutorialTask): any {
        let block = this._render.createElement('div');
        this._render.setAttribute(block, 'id', this.BLOCK_ID);
        this._render.setStyle(block, 'position', 'fixed');
        this._render.setStyle(block, 'zIndex', '9003');
        this._render.setStyle(block, 'border', '3px solid #FFF');
        this._render.setStyle(block, 'borderRadius', '5px');
        this._render.setStyle(block, 'minWidth', '200px');
        this._render.setStyle(block, 'maxWidth', '350px');        
        this._render.setStyle(block, 'transition', 'opacity .3s ease-in-out');

        this.hideTutorialBlockElement(block);
        
        this._render.appendChild(block, this.createTutorialBlockArrow());

        if (task.action.title) {
            this._render.appendChild(block, this.createTutorialBlockTitleElement(task.action.title));
        }
        
        this._render.appendChild(block, this.createTutorialBlockBodyElement(task.action.text));
        this._render.appendChild(block, this.createTutorialBlockControls());

        return block;
    }
    private createTutorialBlockArrow(): any {
        let arrow = this._render.createElement('div');

        this._render.setAttribute(arrow, 'id', this.BLOCK_ARROW_ID);
        this._render.setStyle(arrow, 'position', 'absolute');
        this._render.setStyle(arrow, 'zIndex', '9003');
        this._render.setStyle(arrow, 'width', '0');
        this._render.setStyle(arrow, 'height', '0');
        this._render.setStyle(arrow, 'border-top', '12px solid transparent');
        this._render.setStyle(arrow, 'border-bottom', '12px solid transparent');        

        return arrow;
    }
    private createTutorialBlockTitleElement(title: string): any {
        let blockTitle = this._render.createElement('div');
        let blockTitleText = this._render.createText(title);
        let btnExit = this.createTutorialBlockExitControl();

        this._render.setAttribute(blockTitle, 'id', this.BLOCK_TITLE_ID);
        this._render.setStyle(blockTitle, 'display', 'flex');
        this._render.setStyle(blockTitle, 'align-items', 'center');
        this._render.setStyle(blockTitle, 'backgroundColor', '#EEEEEE');
        this._render.setStyle(blockTitle, 'color', 'rgb(84, 84, 84)');
        this._render.setStyle(blockTitle, 'padding', '10px 12px');
        this._render.setStyle(blockTitle, 'borderRadius', '5px 5px 0px 0px');
        this._render.setStyle(blockTitle, 'borderBottom', '1px solid rgb(214, 214, 214)');
        this._render.setStyle(blockTitle, 'font-size', '16px');
        this._render.setStyle(blockTitle, 'font-weight', '600');
        this._render.setStyle(blockTitle, 'text-transform', 'uppercase');
        this._render.setStyle(blockTitle, 'margin', '-2px -2px 0px -2px');        

        if (blockTitleText) {
            this._render.setStyle(blockTitle, 'fontSize', '16px');
            this._render.setStyle(blockTitle, 'fontWeight', '600');
            this._render.appendChild(blockTitle, blockTitleText);
        }
        
        this._render.appendChild(blockTitle, btnExit);

        return blockTitle;
    }
    private createTutorialBlockBodyElement(text: string): any {
        let blockBody = this._render.createElement('div');
        let blockBodyText = this._render.createText(text);

        this._render.setAttribute(blockBody, 'id', this.BLOCK_BODY_ID);
        this._render.setStyle(blockBody, 'backgroundColor', '#FFF');
        this._render.setStyle(blockBody, 'padding', '10px 10px 20px 10px');

        if (blockBodyText) {
            this._render.setStyle(blockBody, 'fontSize', '14px');
            this._render.setStyle(blockBody, 'fontWeight', 'normal');
            this._render.appendChild(blockBody, blockBodyText);
        }

        return blockBody;
    }
    private createTutorialBlockControls(): any {
        let controls = this._render.createElement('div');

        this._render.setAttribute(controls, 'id', this.BLOCK_CONTROLS_ID);
        this._render.setStyle(controls, 'backgroundColor', '#FFF');
        this._render.setStyle(controls, 'padding', '10px 12px');
        this._render.setStyle(controls, 'borderRadius', '0px 0px 5px 5px');
        this._render.setStyle(controls, 'margin', '0 -2px -2px -2px');
        this._render.setStyle(controls, 'display', 'flex');
        this._render.setStyle(controls, 'align-items', 'center');
        this._render.setStyle(controls, 'justify-content', 'flex-end');

        this._render.appendChild(controls, this.createTutorialBlockInfoControl());   
        this._render.appendChild(controls, this.createTutorialBlockPrevControl());
        this._render.appendChild(controls, this.createTutorialBlockNextControl());     

        return controls;
    }
    private createTutorialBlockPrevControl(): any {
        let button = this._render.createElement('button');
        let icone = this._render.createElement('i');
        
        this._render.setAttribute(button, 'id', this.BLOCK_CONTROL_PREV_ID);
        this._render.addClass(button, 'btn');
        this._render.addClass(button, 'btn-sm');
        this._render.addClass(button, 'btn-primary');
        this._render.addClass(button, 'mr-1');
        this._render.addClass(icone, 'fa');
        this._render.addClass(icone, 'fa-arrow-left');
        this._render.appendChild(button, icone);

        if (this._currentTaskIndex == 0) {
            this._render.setAttribute(button, 'disabled', 'disabled');
        } else {
            this._render.listen(button, 'click', () => {
                this.movePrev();
            });
        }

        return button;
    }
    private createTutorialBlockNextControl(): any {
        let button = this._render.createElement('button');
        let icone = this._render.createElement('i');
        
        this._render.setAttribute(button, 'id', this.BLOCK_CONTROL_NEXT_ID);
        this._render.addClass(button, 'btn');
        this._render.addClass(button, 'btn-sm');
        this._render.addClass(button, 'mr-1');
        this._render.addClass(icone, 'fa');        
        this._render.appendChild(button, icone);

        if (this._currentTaskIndex >= this._runningTasks.length - 1) {
            this._render.addClass(icone, 'fa-times');
            this._render.addClass(button, 'btn-outline-primary');
        } else {
            this._render.addClass(icone, 'fa-arrow-right');
            this._render.addClass(button, 'btn-primary');
        }

        this._render.listen(button, 'click', () => {
            this.moveNext();
        });

        return button;
    }
    private createTutorialBlockExitControl(): any {
        let icone = this._render.createElement('i');
        
        this._render.setAttribute(icone, 'id', this.BLOCK_CONTROL_EXIT_ID);
        this._render.addClass(icone, 'ml-auto');
        this._render.addClass(icone, 'fa');
        this._render.addClass(icone, 'fa-times');
        this._render.setStyle(icone, 'cursor', 'pointer');

        this._render.listen(icone, 'click', () => {
            this.exit();
        });

        return icone;
    }
    private createTutorialBlockInfoControl(): any {
        let span = this._render.createElement('small');
        
        this._render.setAttribute(span, 'id', this.BLOCK_CONTROL_INFO_ID);
        this._render.addClass(span, 'mr-auto');
        this._render.setStyle(span, 'fontSize', '12px');
        this._render.setStyle(span, 'fontWeight', 'normal');
        this._render.appendChild(span, this._render.createText(`${this._currentTaskIndex + 1}/${this._runningTasks.length}`));

        return span;
    }

    //element destroy
    private destroyCurrentTask(): void {
        this.destroyElementById(this.BLOCKER_ID);
        this.destroyElementById(this.BLOCK_ID);

        let currentElement = this._runningTasks[this._currentTaskIndex].element;

        if (this.isCurrentElementText() && this.colorPlaceholder) {
            this._render.setStyle(currentElement.nativeElement, 'color', this.colorPlaceholder);
            this.colorPlaceholder = null;
        } 

        this._render.removeStyle(currentElement.nativeElement, 'position');
        this._render.removeStyle(currentElement.nativeElement, 'zIndex');
    }
    private destroyOverlay(): void {
        this.destroyElementById(this.OVERLAY_ID);

        this._render.removeStyle(document.body, 'overflow');
    }
    private destroyElementById(id: string): void {
        let el = document.getElementById(id);
        
        this._render.removeChild(el.parentNode, el);
    }

    //aux
    private handleTutorialBlockPosition(block: any, el: ElementRef): void {
        setTimeout(() => {
            this.setTutorialBlockPosition(block, el);
        }, 0);

        this._render.listen(window, 'resize', () => {
            this.setTutorialBlockPosition(block, el);
        });
    }
    private setTutorialBlockPosition(block: any, el: ElementRef): void {
        let arrow = document.getElementById(this.BLOCK_ARROW_ID);
        let elementRect = el.nativeElement.getBoundingClientRect();
        let top: number = elementRect.top;
        let left: number = elementRect.left + elementRect.width + 20;
        let blockHeight = $(block).height();
        let blockWidth = $(block).width();
        let isCurrentBlockOnBottomOfScreen = this.isCurrentBlockOnBottomOfScreen();
        let isCurrentBlockOnRightOfScreen = this.isCurrentBlockOnRightOfScreen();
        let arrowBorder: string = isCurrentBlockOnRightOfScreen ? 'border-left' : 'border-right';
        let arrowPositionX: string = isCurrentBlockOnRightOfScreen ? 'right' : 'left';
        let arrowPositionY: string = isCurrentBlockOnBottomOfScreen ? 'bottom' : 'top';
        let arrowColor: string = isCurrentBlockOnBottomOfScreen ? '#FFF' : '#EEE';

        if (isCurrentBlockOnBottomOfScreen) {
            top -= blockHeight - 32;         
        }
        if (isCurrentBlockOnRightOfScreen) {
            left -= blockWidth + elementRect.width + 45;          
        }

        if ((left + blockWidth) >= document.body.clientWidth) {
            left -= blockWidth + 45;  
        }

        if (arrow) {
            this._render.setStyle(arrow, arrowBorder, `15px solid ${arrowColor}`);
            this._render.setStyle(arrow, arrowPositionX, `-17px`);
            this._render.setStyle(arrow, arrowPositionY, `8px`);
        }
        
        this._render.setStyle(block, 'top', this.getNumberInPx(top));
        this._render.setStyle(block, 'left', this.getNumberInPx(left));
    }
    private getNumberInPx(value: number): string {
        return value + 'px';
    }
    private scrollToCurrentElementBlock() { 
        setTimeout(() => {
            let block = document.getElementById(this.BLOCK_ID);
            let el = this._runningTasks[this._currentTaskIndex].element;
            let offsetTopFromBody: number = $(el.nativeElement).offset().top;
            let elementY: number = offsetTopFromBody - 150;

            $('html').animate({
                scrollTop: elementY,
                duration: 0
            }, () => {
                this.setTutorialBlockPosition(block, el);
                this.fadeInTutorialBlockElement(block);
            });
        });
    }
    private hideTutorialBlockElement(block: any): void {
        this._render.setStyle(block, 'opacity', '0');
    }
    private fadeInTutorialBlockElement(block: any): void {
        this._render.setStyle(block, 'opacity', '1');
    }
    private isCurrentBlockOnBottomOfScreen(): boolean {
        if (this._currentTaskIndex < 0) return false;

        let el = this._runningTasks[this._currentTaskIndex].element;
        let elementRect = el.nativeElement.getBoundingClientRect();
        let top: number = elementRect.top;
        let offsetTopFromBody: number = $(el.nativeElement).offset().top;

        return top > document.body.scrollHeight - offsetTopFromBody;
    }
    private isCurrentBlockOnRightOfScreen(): boolean {
        if (this._currentTaskIndex < 0) return false;
        
        let el = this._runningTasks[this._currentTaskIndex].element;
        let offsetLeftFromBody: number = $(el.nativeElement).offset().left;

        return offsetLeftFromBody >= document.body.clientWidth / 2;
    }
    private isCurrentElementText(): boolean {
        if (this._currentTaskIndex < 0) return false;
        
        const allowedTags = ['h1', 'h2', 'h3', 'h4', 'h5', 'span', 'small', 'p'];
        let el = this._runningTasks[this._currentTaskIndex].element;
        
        return allowedTags.filter(x => x.toUpperCase() == el.nativeElement.tagName).length == 1;
    }
    private notifyStepHasChanged(): void {
        this.onStepChanged.emit(this._runningTasks[this._currentTaskIndex]);
    }
    private startListeningKeyboardArrows(): void {
        this.unlistenKeyboardArrows = this._render.listen(document.body, 'keyup', (event: KeyboardEvent) => {
            switch (event.keyCode) {
                case 27:
                    this.exit();
                    break;
                case 37:
                    this.movePrev();
                    break;
                case 13:
                case 39:
                    this.moveNext();
                    break;
            }

            event.stopImmediatePropagation();
        });
    }
    private stopListeningKeyboardArrows(): void {
        this.unlistenKeyboardArrows();
    }

    //localstorage
    private getLocalStorage(key: string): any {
        const result = localStorage.getItem(`Ui-Hero-Turorial-${key}`);

        if (typeof result === 'string') {
            return result;
        } else {
            return JSON.parse(result);
        }
    }
    private setLocalStorage(key: string, value: any): void {
        if (typeof value === 'string') {
            localStorage.setItem(`Ui-Hero-Turorial-${key}`, value);
        } else {
            localStorage.setItem(`Ui-Hero-Turorial-${key}`, JSON.stringify(value));
        }
    }
}

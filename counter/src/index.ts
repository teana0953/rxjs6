import './style.css';
import { fromEvent, Observable, of, Subscription, Subject } from 'rxjs';
import { filter, map } from 'rxjs/operators';

setTimeout(() => {
    let count: number = 0;
    let counter$: Subject<number> = new Subject();

    initiate();

    function initiate() {
        const buttonStart = getButton('start');
        const buttonCount = getButton('count');
        const buttonError = getButton('error');
        const buttonEnd = getButton('end');

        fromEvent(buttonStart, 'click').subscribe({
            next: () => {
                showText(true);

                initiateCount();

                counter$.subscribe({
                    next: (data) => {
                        updateText('count', `${data}`);
                    },
                    error: (err) => {
                        disableActionButtonStatus(true);
                        updateText('status', `${err}`);
                    },
                    complete: () => {
                        disableActionButtonStatus(true);
                        updateText('status', '完成');
                    },
                });

                counter$.pipe(filter((data) => data % 2 === 0)).subscribe({
                    next: (data) => {
                        updateText('even-count', `${data}`);
                    },
                });

                disableActionButtonStatus(false);

                updateText('status', '開始計數');
            },
        });

        fromEvent(buttonCount, 'click').subscribe({
            next: () => {
                count++;
                counter$.next(count);
            },
        });

        fromEvent(buttonError, 'click').subscribe({
            next: () => {
                let errorMsg: string = prompt('請輸入錯誤訊息');

                counter$.error(errorMsg);
            },
        });

        fromEvent(buttonEnd, 'click').subscribe({
            next: () => {
                counter$.complete();
            },
        });
    }

    function initiateCount() {
        counter$ = new Subject();
        count = 0;

        updateText('count', '0');
        updateText('even-count', '0');
    }
}, 0);

/**
 *
 */
function getButton(name: string): HTMLButtonElement {
    return getFirstElement(`action__button--${name}`) as HTMLButtonElement;
}

function getTextContent(name: string): Element {
    return getFirstElement(`text__title__content--${name}`);
}

function getFirstElement(className: string): Element {
    let elements = document.getElementsByClassName(`${className}`);

    if (!!elements && elements.length > 0) {
        return elements[0];
    }

    return null;
}

function showText(value: boolean) {
    let element = getFirstElement('text');

    if (!!element) {
        if (value) {
            element.classList.remove('text--hide');
        } else {
            element.classList.add('text--hide');
        }
    }
}

/**
 * 更新文字
 */
function updateText(name: string, value: string) {
    let element = getTextContent(name);

    if (!!element) {
        element.innerHTML = value;
    }
}

function disableActionButtonStatus(value: boolean) {
    getButton('count').disabled = value;
    getButton('error').disabled = value;
    getButton('end').disabled = value;
}

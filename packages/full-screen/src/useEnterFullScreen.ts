/**
 * A React component to view a PDF document
 *
 * @see https://react-pdf-viewer.dev
 * @license https://react-pdf-viewer.dev/license
 * @copyright 2019-2021 Nguyen Huu Phuoc <me@phuoc.ng>
 */

import * as React from 'react';
import type { Store } from '@react-pdf-viewer/core';

import { addFullScreenChangeListener, exitFullScreen, getFullScreenElement, requestFullScreen } from './fullScreen';
import type { StoreProps } from './types/StoreProps';
import type { Zoom } from './types/Zoom';

export const useEnterFullScreen = (
    store: Store<StoreProps>,
    onEnterFullScreen: (zoom: Zoom) => void,
    onExitFullScreen: (zoom: Zoom) => void
): {
    enterFullScreen: () => void;
} => {
    const pagesRef = React.useRef<HTMLElement | null>(
        store.get('getPagesContainer') ? store.get('getPagesContainer')() : null
    );

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const closeOtherFullScreen = (): Promise<any> => {
        const pagesEle = pagesRef.current;
        if (!pagesEle) {
            return Promise.resolve();
        }

        const ele = getFullScreenElement();
        return ele && ele !== pagesEle ? exitFullScreen(ele) : Promise.resolve();
    };

    const enterFullScreen = () => {
        const pagesEle = pagesRef.current;
        if (!pagesEle) {
            return;
        }

        closeOtherFullScreen().then(() => {
            requestFullScreen(pagesEle);
        });
    };

    const onFullScreenChange = (): void => {
        const ele = getFullScreenElement();
        const isFullScreen = ele === pagesRef.current;
        store.update('isFullScreen', isFullScreen);

        const zoom = store.get('zoom');
        if (zoom) {
            isFullScreen ? onEnterFullScreen(zoom) : onExitFullScreen(zoom);
        }
    };

    const handlePagesContainer = (getPagesContainer: () => HTMLElement) => {
        pagesRef.current = getPagesContainer();
        addFullScreenChangeListener(onFullScreenChange);
    };

    React.useEffect(() => {
        store.subscribe('getPagesContainer', handlePagesContainer);
        return (): void => {
            store.unsubscribe('getPagesContainer', handlePagesContainer);
        };
    }, []);

    return {
        enterFullScreen,
    };
};

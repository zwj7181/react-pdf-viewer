/**
 * A React component to view a PDF document
 *
 * @see https://react-pdf-viewer.dev
 * @license https://react-pdf-viewer.dev/license
 * @copyright 2019-2021 Nguyen Huu Phuoc <me@phuoc.ng>
 */

import * as React from 'react';
import { TextDirection, ThemeContext } from '@react-pdf-viewer/core';
import type { Store } from '@react-pdf-viewer/core';

import { ScrollMode } from './structs/ScrollMode';
import { useScrollMode } from './useScrollMode';
import type { StoreProps } from './types/StoreProps';

export const Tracker: React.FC<{
    store: Store<StoreProps>;
}> = ({ store }) => {
    const { direction } = React.useContext(ThemeContext);
    const isRtl = direction === TextDirection.RightToLeft;
    const { switchTo } = useScrollMode(store);

    const handlePagesContainer = (getPagesContainer: () => HTMLElement) => {
        const pagesEle = getPagesContainer();
        if (!pagesEle) {
            return;
        }
        isRtl ? pagesEle.classList.add('rpv-scroll-mode--rtl') : pagesEle.classList.remove('rpv-scroll-mode--rtl');

        const scrollMode = store.get('scrollMode') || ScrollMode.Vertical;
        if (scrollMode !== ScrollMode.Vertical) {
            switchTo(scrollMode);
        }
    };

    React.useEffect(() => {
        store.subscribe('getPagesContainer', handlePagesContainer);

        return (): void => {
            store.unsubscribe('getPagesContainer', handlePagesContainer);
        };
    }, []);

    return <></>;
};

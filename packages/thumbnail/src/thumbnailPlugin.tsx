/**
 * A React component to view a PDF document
 *
 * @see https://react-pdf-viewer.dev
 * @license https://react-pdf-viewer.dev/license
 * @copyright 2019-2021 Nguyen Huu Phuoc <me@phuoc.ng>
 */

import * as React from 'react';
import { createStore } from '@react-pdf-viewer/core';
import type { Plugin, PluginFunctions, PluginOnDocumentLoad, ViewerState } from '@react-pdf-viewer/core';

import { ThumbnailListWithStore } from './ThumbnailListWithStore';
import type { StoreProps } from './types/StoreProps';

export interface ThumbnailPlugin extends Plugin {
    Thumbnails: () => React.ReactElement;
}

export const thumbnailPlugin = (): ThumbnailPlugin => {
    const store = React.useMemo(() => createStore<StoreProps>({}), []);

    const ThumbnailsDecorator = () => <ThumbnailListWithStore store={store} />;

    return {
        install: (pluginFunctions: PluginFunctions) => {
            store.update('jumpToPage', pluginFunctions.jumpToPage);
        },
        onDocumentLoad: (props: PluginOnDocumentLoad) => {
            store.update('doc', props.doc);
        },
        onViewerStateChange: (viewerState: ViewerState) => {
            store.update('currentPage', viewerState.pageIndex);
            store.update('pageHeight', viewerState.pageHeight);
            store.update('pageWidth', viewerState.pageWidth);
            return viewerState;
        },
        Thumbnails: ThumbnailsDecorator,
    };
};

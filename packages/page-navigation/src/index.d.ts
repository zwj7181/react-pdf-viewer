/**
 * A React component to view a PDF document
 *
 * @see https://react-pdf-viewer.dev
 * @license https://react-pdf-viewer.dev/license
 * @copyright 2019-2021 Nguyen Huu Phuoc <me@phuoc.ng>
 */

import * as React from 'react';
import type { Plugin } from '@react-pdf-viewer/core';

// Types
export interface CurrentPageLabelProps {
    children?: (props: RenderCurrentPageLabelProps) => React.ReactElement;
}

export interface RenderCurrentPageLabelProps {
    currentPage: number;
    numberOfPages: number;
}

export interface GoToPageMenuItemProps {
    onClick: () => void;
}

export interface GoToPageProps {
    children?: RenderGoToPage;
}

export interface RenderGoToPageProps {
    isDisabled: boolean;
    onClick: () => void;
}

export type RenderGoToPage = (props: RenderGoToPageProps) => React.ReactElement;

// Plugin
export interface PageNavigationPlugin extends Plugin {
    jumpToPage: (pageIndex: number) => void;
    CurrentPageInput: () => React.ReactElement;
    CurrentPageLabel: (props: CurrentPageLabelProps) => React.ReactElement;
    GoToFirstPage: (props: GoToPageProps) => React.ReactElement;
    GoToFirstPageButton: () => React.ReactElement;
    GoToFirstPageMenuItem: (props: GoToPageMenuItemProps) => React.ReactElement;
    GoToLastPage: (props: GoToPageProps) => React.ReactElement;
    GoToLastPageButton: () => React.ReactElement;
    GoToLastPageMenuItem: (props: GoToPageMenuItemProps) => React.ReactElement;
    GoToNextPage: (props: GoToPageProps) => React.ReactElement;
    GoToNextPageButton: () => React.ReactElement;
    GoToNextPageMenuItem: (props: GoToPageMenuItemProps) => React.ReactElement;
    GoToPreviousPage: (props: GoToPageProps) => React.ReactElement;
    GoToPreviousPageButton: () => React.ReactElement;
    GoToPreviousPageMenuItem: (props: GoToPageMenuItemProps) => React.ReactElement;
}

export function pageNavigationPlugin(): PageNavigationPlugin;

// Components
export class DownArrowIcon extends React.Component {}
export class NextIcon extends React.Component {}
export class PreviousIcon extends React.Component {}
export class UpArrowIcon extends React.Component {}

/**
 * A React component to view a PDF document
 *
 * @see https://react-pdf-viewer.dev
 * @license https://react-pdf-viewer.dev/license
 * @copyright 2019-2021 Nguyen Huu Phuoc <me@phuoc.ng>
 */

import * as React from 'react';
import { MinimalButton, Position, Tooltip } from '@react-pdf-viewer/core';

import { SwitchScrollModeDecorator } from './SwitchScrollModeDecorator';
import type { RenderSwitchScrollModeProps } from './types/RenderSwitchScrollModeProps';

const TOOLTIP_OFFSET = { left: 0, top: 8 };

export const SwitchScrollModeButton: React.FC<RenderSwitchScrollModeProps> = ({ isSelected, mode, onClick }) => (
    <SwitchScrollModeDecorator mode={mode} onClick={onClick}>
        {(props) => (
            <Tooltip
                ariaControlsSuffix="scroll-mode-switch"
                position={Position.BottomCenter}
                target={
                    <MinimalButton ariaLabel={props.label} isSelected={isSelected} onClick={props.onClick}>
                        {props.icon}
                    </MinimalButton>
                }
                content={() => props.label}
                offset={TOOLTIP_OFFSET}
            />
        )}
    </SwitchScrollModeDecorator>
);

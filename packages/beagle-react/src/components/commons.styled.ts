/*
  * Copyright 2020 ZUP IT SERVICOS EM TECNOLOGIA E INOVACAO SA
  *
  * Licensed under the Apache License, Version 2.0 (the "License");
  * you may not use this file except in compliance with the License.
  * You may obtain a copy of the License at
  *
  *  http://www.apache.org/licenses/LICENSE-2.0
  *
  * Unless required by applicable law or agreed to in writing, software
  * distributed under the License is distributed on an "AS IS" BASIS,
  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  * See the License for the specific language governing permissions and
  * limitations under the License.
*/

import styled from "styled-components";

export const BeagleTheme = {
    swamp: '#001B26',
    swampLight: 'rgba(0, 27, 38, 0.8)',
    swampTransparent: 'rgba(0, 27, 38, 0.1)',
    athensGray: '#F5F7F9',
    blackTransparent: 'rgba(0, 0, 0, 0.1)',
    darkGray: 'rgba(0, 0, 0, 0.75);',
}

export const StyledButton = styled.button`
	border: 1px solid ${BeagleTheme.swampLight};
    line-height: 34px;
    color: inherit;
    background: transparent;
    box-sizing: border-box;
    position: relative;
    cursor: pointer;
    outline: none;
    display: inline-block;
    white-space: nowrap;
    text-decoration: none;
    vertical-align: baseline;
    text-align: center;
    margin: 0;
    min-width: 70px;
    padding: 0 16px;
    border-radius: 5px;
    overflow: visible;
    
    &:hover {
        background-color: ${BeagleTheme.swampTransparent};
    }

    &:disabled {
        opacity: 0.4;
        pointer-events: none;
    }
`;

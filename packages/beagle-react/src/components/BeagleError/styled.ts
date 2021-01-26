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

import { StyledButton } from '../commons.styled';
import styled from 'styled-components';

export const StyledRetryContainer = styled.section`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin: 2em;
    font-size: 23px;
`;

export const StyledRetryButton = styled(StyledButton)`
    max-width: 200px;
    margin: 8px 4px 4px 4px;
`;

export const StyledShowMoreButton = styled(StyledButton)`
    max-width: 200px;
    margin: 4px;
    border: none;
`;

export const ErrorsDetailedContainer = styled.section`
    width: 100%;
    max-width: 800px;
    max-height: 0;
    opacity: 0;
    overflow: auto;
    position: relative;
    margin: 4px;
    border-radius: 8px;
    border: 1px solid #FFD7D7;
    background-color: #FFF0F0;
    padding: 8px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 8px;
    transition: all 0.2s ease;

    &.show {
        max-height: 1024px;
        opacity: 1;
    }

    .error-message {
        font-family: Verdana, Geneva, Tahoma, sans-serif;
        position: relative;
        color: #FF0000;
        font-size: 14px;
        padding: 0;
        margin: 0;

        .error-indicator {
            color: #414a4c;
            margin: 0 4px 0 0;
            font-size: 12px;
        }
    }
`;
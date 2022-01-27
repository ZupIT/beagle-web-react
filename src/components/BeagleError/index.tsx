/*
 * Copyright 2020, 2022 ZUP IT SERVICOS EM TECNOLOGIA E INOVACAO SA
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

import React, { FC, useState } from 'react'
import { BeagleErrorInterface } from 'models'
import BeagleText from 'components/BeagleText'
import withTheme from 'components/utils/withTheme'
import {
  ErrorsDetailedContainer,
  StyledRetryButton,
  StyledRetryContainer,
  StyledShowMoreButton,
} from './styled'

const BeagleError: FC<BeagleErrorInterface> = ({
  retry,
  errors,
  className,
}) => {
  const [showingDetails, setShowingDetails] = useState<boolean>(false)

  const handleShowMore = () => {
    setShowingDetails(!showingDetails)
  }

  return (
    <StyledRetryContainer className={className}>
      <BeagleText text="Sorry!" textColor="red" />
      <BeagleText text="An unexpected error happened while loading your page." />
      <StyledRetryButton
        data-testid="retry"
        onPress={retry}
        text="Retry"
      ></StyledRetryButton>
      {errors.length > 0 ? (
        <>
          <StyledShowMoreButton
            data-testid="show-more"
            onPress={handleShowMore}
            text={`${showingDetails ? 'Hide' : 'Show'} details ${
              showingDetails ? '▲' : '▼'
            }`}
          ></StyledShowMoreButton>
          <ErrorsDetailedContainer
            data-testid="details"
            className={showingDetails ? 'show' : ''}
          >
            {errors.map((error, index) => (
              <p key={`key_${index}`} className="error-message">
                <span className="error-indicator">►</span> ERROR:{' '}
                {error.message}
              </p>
            ))}
          </ErrorsDetailedContainer>
        </>
      ) : null}
    </StyledRetryContainer>
  )
}

export default withTheme(BeagleError)

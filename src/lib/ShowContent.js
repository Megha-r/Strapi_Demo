import React from 'react'
import { Consumer as ContextFileConsumer } from './ContextFile'
import ContentProvider from './ContentProvider'

export default WrappedComponent => props => (
  <ContentProvider>
    <ContextFileConsumer>
      {({ cmsContent, cmsError, setData, loading }) => {
        console.log("cmsContent",  cmsContent)
        console.log("cmsError",  cmsError)
        console.log("setData",  setData)
        console.log("loading",  loading)
        return (<WrappedComponent
          {...props}
          cmsContent={cmsContent}
          cmsError={cmsError}
          setData={setData}
          loading={loading}
        />)
      }
      }
    </ContextFileConsumer>
  </ContentProvider>
)


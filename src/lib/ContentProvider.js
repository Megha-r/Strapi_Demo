import React from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import CMSContext from './ContextFile'

class ContentProvider extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      cmsContent: {},
      cmsError: '',
      loading: false,
    }
  }

  //*********  Function to fetch data from collection on the basis of routeCode **************** 


  getdata = async (data) => {
    let { language, collectionName, routeCode } = data
    this.setState({ loading: true })
    language = language.trim();
    collectionName = collectionName.trim();
    routeCode = routeCode.trim();
    if (!(language && routeCode && collectionName)) {
      const er = 'Specify the correct route, language and collection key'
      this.setState({ cmsError: er, loading: false })
    } else {
      const response = await axios(`http://localhost:1337/${collectionName}?routeCode=${routeCode}`);
      let data = response.data
      const obj = {}
      data && data.length && data.forEach(element => {
        obj[element.code] = element[language]
      })
      this.setState({ cmsContent: obj, loading: false })
    }

  }

  render() {
    const { loading, cmsContent, cmsError } = this.state
    return (
      <CMSContext.Provider
        value={{
          cmsContent: cmsContent,
          cmsError: cmsError,
          loading: loading,
          setData: this.getdata
        }} >

        {this.props.children}

      </CMSContext.Provider>
    )
  }
}

export default ContentProvider

ContentProvider.propTypes = {
  children: PropTypes.node.isRequired
}





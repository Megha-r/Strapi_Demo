import React from 'react'
import PropTypes from 'prop-types'
// import fetch from 'axios'
import { Provider as ContextFileProvider } from './ContextFile'

class ContentProvider extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      cmsContent: {},
      cmsError: '',
   }
  }

//*********  Function to fetch data from collection on the basis of routeCode **************** 
  

  getdata = async (data) => {
    console.log('------- data-----------', data)
    const { language, routeCode, collection } = data;
    if ((language && language === '' && language === undefined) || (routeCode && routeCode === '' && routeCode === undefined )) {
      const er = 'Specify the correct route and language key'
      this.setState({ cmsError: er })
    } else {
      const response = fetch(`http://localhost:1337/${collection}s?routeCode=${routeCode}`)
      .then((data) => {
        data.json()
        .then((array) => {
          const x = array;
          let obj ={};
          x.map(element => {
            obj[element.code] = element[language];
          });
          this.setState({ cmsContent: obj, })
        })
        .catch((err) => this.setState({cmsError: err}));
      })
      .catch((err) => this.setState({cmsError: err}));
    }
  }

  render() {
    const { cmsContent, cmsError } = this.state;
    const value = {
      cmsContent: cmsContent,
      cmsError: cmsError,
      setData: this.getdata
    }
    console.log("value------------------", value)
    return (
      <ContextFileProvider
        value={value} >
        {this.props.children}

      </ContextFileProvider>
    )
  }
}

ContentProvider.propTypes = {
  children: PropTypes.node.isRequired
}

export default ContentProvider







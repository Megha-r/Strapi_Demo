# dan-cms-library

## Steps to use package with application on your local system

```
git checkout develop
npm run develop
npm link
```
It is now linked to your global node_modules

## Use package in your application folder

```
npm link dan-cms-library
```
import ShowContent from 'dan-cms-library', and use it.

## Add Components in package

1. Wrap your component in ShowContent
export default ShowContent(App);

2. You get a setData function in props, use that to send key i.e
   const key = {
      language: "en",
      routeCode: 'product'
    }  
    this.props.setData(key);
    
3.  Now, enjoy the content like:
    const { cmsContent } = this.props;
        <p> {cmsContent.description} </p>
    
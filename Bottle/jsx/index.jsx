// These are needed - bottle-react parses this file to build a javascript dependency tree.
// require https://cdnjs.cloudflare.com/ajax/libs/react/16.9.0/umd/react.development.js
// require https://cdnjs.cloudflare.com/ajax/libs/react-dom/16.8.6/umd/react-dom.development.js

class Index extends React.Component {
    render() {
      return (
        <div>
            Hello
            {/* <Base></Base> */}
        </div>
      );
    }
  }

bottlereact._register("Index", Index);
import React, { Component } from 'react';
import './Main.scss'

class Main extends Component {
  constructor () {
    super();
    this.state = {
      products: '',
      isLoaded: false
    };
  }

  componentDidMount () {
    const query = `query { entries { slug, ... on product_product_Entry{productName,productImages{url},productCategory{slug}}}}`;
    const url = "http://10.32.84.91/api";
    const opts = {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({query})
    };
    fetch(url, opts)
      .then(res => res.json())
      .then(res => this.setState({products: res.data.entries}))
      .then(() => this.setState({loaded: true}))
  }

  render() {
    return (
      <div className={'o-main'}>
        <div className={'o-main__cardswrapper'}>
          {this.state.isLoaded ? this.state.products.map( (el, index) => {
            return(
              <div className={'o-main__card'} key={index}>
                <a href={el['productCategory'][0]['slug'] + '/' + el['slug']}>
                  <div className={'o-main__cardimage'}>
                    <img src={"http://10.32.84.91/" + el['productImages'][0]['url']} alt={'alt'} />
                  </div>
                  <h2>{el['productName']}</h2>
                </a>
              </div>
            )
          }) :
            <div className={'o-main__loadingspinner'}>
                <span />
            </div>
          }
        </div>
      </div>
    )
  }
}

export default Main;

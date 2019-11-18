import {IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonIcon} from '@ionic/react';
import React, { Component } from 'react';

type ProductState = {
	loaded: boolean,
	product: [{ [key: string]: any[] }];
}

class Product extends Component<{}, ProductState> {

	public readonly state: Readonly<ProductState> = {
		loaded: false,
		product: [{}]
	};

	componentDidMount(): void {
		const slug = window.location.pathname.split('/')[2];
		console.log(slug);
		const query = `query { entries(section: "product", slug: ${slug}){ title, ... on product_product_Entry {ingredients,priceWithTax,priceWithoutTax,productDescription,productImages,productName,variations }}}`;
		const url = "http://local.ionic-project.de/api";
		const opts = {
			method: "POST",
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify({query})
		};
		fetch(url, opts)
			.then(res => res.json())
			.then(res => this.setState({product: res.data.entries[0]}))
			.then(() => this.setState({loaded: true}))
	}

	render() {
		return (
			<IonPage>
				<IonHeader>
					<IonToolbar>
						<IonIcon />
						<IonTitle>Whitelabel Sales App</IonTitle>
					</IonToolbar>
				</IonHeader>
				<IonContent className="ion-padding">
					<h2>Insert Name here</h2>
				</IonContent>
			</IonPage>
		);
	}
}

export default Product;

import {IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonIcon, IonGrid, IonRow, IonCol, IonSlides, IonSlide, IonImg, IonLoading} from '@ionic/react';
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
		const query = `query { entries(section:"product",slug:"${slug}"){ title, ... on product_product_Entry {ingredients,priceWithTax,priceWithoutTax,productDescription,productImages{ url },productName,variations}}}`;
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
		console.log(this.state.product);
		const slideOpts = {
			initialSlide: 1,
			speed: 400
		};
		return <IonPage>
			<IonHeader>
				<IonToolbar>
					<IonIcon />
					<IonTitle>Whitelabel Sales App</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent className="ion-padding">
				<h2>{this.state.product['title']}</h2>
				<IonGrid>
					<IonRow>
						<IonCol size={"12"}>
							{this.state.loaded ?
								<IonSlides pager={true} options={slideOpts}>
									{this.state.product['productImages'].map( (image:object, index:number) => {
										return (
											<IonSlide key={index}>
												<IonImg src={"http://local.ionic-project.de" + image['url']} alt={'alt'} />
											</IonSlide>
										)
									})}
								</IonSlides>
							: <IonLoading
								isOpen={!this.state.loaded}
								message={'Loading data...'}
								/>}
						</IonCol>
						<IonCol dangerouslySetInnerHTML={this.state.product['productDescription']} />
					</IonRow>
				</IonGrid>
			</IonContent>
		</IonPage>;
	}
}

export default Product;

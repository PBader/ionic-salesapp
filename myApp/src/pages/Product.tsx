import {IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonIcon, IonGrid, IonRow, IonCol, IonSlides, IonSlide, IonImg, IonLoading, IonSelect, IonSelectOption, IonLabel, IonItem, IonInput, IonButton} from '@ionic/react';
import React, { Component } from 'react';

type ProductState = {
	loaded: boolean,
	currency: string,
	product: [{ [key: string]: any[] }];
}

class Product extends Component<{}, ProductState> {

	public readonly state: Readonly<ProductState> = {
		loaded: false,
		currency: "€",
		product: [{}]
	};

	componentDidMount(): void {
		const slug = window.location.pathname.split('/')[2];
		const query = `query { entries(section:"product",slug:"${slug}"){ title, ... on product_product_Entry {ingredients,priceWithTax,priceWithoutTax,productDescription,productImages{ url },productName,variations}}, globalSets { ... on shopSettings_GlobalSet { currency }}}`;
		const url = "http://local.ionic-project.de/api";
		const opts = {
			method: "POST",
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify({query})
		};
		fetch(url, opts)
			.then(res => res.json())
			.then(res => this.setState({product: res.data.entries[0], currency: res.data['globalSets'][0]['currency']}))
			.then(() => this.setState({loaded: true}))
	}

	render() {
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
				{ this.state.loaded ?
				 <div>
					<IonGrid>
						<IonRow>
							<IonCol size={"12"} sizeMd={"6"} pushMd={"1"}>
								<IonSlides pager={true} options={slideOpts}>
									{this.state.product['productImages'].map( (image:object, index:number) => {
										return (
											<IonSlide key={index}>
												<IonImg src={"http://local.ionic-project.de" + image['url']} alt={'alt'} />
											</IonSlide>
										)
									})}
								</IonSlides>
							</IonCol>
							<IonCol size={"12"} sizeMd={"6"} pushMd={"1"}>
								<h2>{this.state.product['title']}</h2>
								<div>
									<h2>{this.state.product['priceWithTax'] + ' ' + this.state.currency}</h2>
									<p>{this.state.product['priceWithoutTax'] + ' ' + this.state.currency } Wholesale price</p>
								</div>
								<IonItem>
									<IonLabel>Variations</IonLabel>
									<IonSelect multiple={false} cancelText="Cancel" okText="Choose">
										{this.state.product['variations'].split(',').map( (variation:string, index:number) => {
											return (
												<IonSelectOption key={index}>
													{variation}
												</IonSelectOption>
											)
										})}
									</IonSelect>
								</IonItem>
								<IonItem>
									<IonInput type="number" placeholder="Amount" />
								</IonItem>
								<IonButton className="ion-padding">Add to cart</IonButton>
							</IonCol>
						</IonRow>
						<IonRow className="ion-padding">
							<IonCol size={"12"} sizeMd={"8"} pushMd={"2"} >
								{this.state.product['productDescription']}
							</IonCol>
						</IonRow>
					</IonGrid>
				</div>
				: <IonLoading
					isOpen={!this.state.loaded}
					message={'Loading data...'}
				/>}
			</IonContent>
		</IonPage>
	}
}

export default Product;

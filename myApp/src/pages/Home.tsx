import {IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonGrid, IonRow, IonCard, IonCol, IonCardTitle, IonIcon} from '@ionic/react';
import React, { Component } from 'react';

type HomeState = {
    loaded: boolean,
    products: [{ [key: string]: any[] }];
}

class Home extends Component<{}, HomeState> {

    public readonly state: Readonly<HomeState> = {
        loaded: false,
        products: [{}]
    };

    componentDidMount(): void {
        const query = `query { entries { slug, ... on product_product_Entry { productName, productImages { url }}}}`;
        const url = "http://local.ionic-project.de/api";
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
            <IonPage>
                <IonHeader>
                    <IonToolbar>
                        <IonIcon />
                        <IonTitle>Whitelabel Sales App</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent className="ion-padding">
                    <IonGrid>
                        <IonRow>
                            {this.state.loaded ? this.state.products.map( (element:object, index:number) => {
                                return(
                                    <IonCol sizeSm="12" sizeMd="4" sizeLg="4">
                                        <a href={element['slug']} key={index}>
                                            <IonCard>
                                                <img src={"http://local.ionic-project.de" + element['productImages'][0]['url']} alt={'alt'} />
                                                <IonHeader>
                                                    <IonCardTitle>{element['productName']}</IonCardTitle>
                                                </IonHeader>
                                            </IonCard>
                                        </a>
                                    </IonCol>
                                )
                            }) : <p> Loading content</p>}
                        </IonRow>
                    </IonGrid>
                </IonContent>
            </IonPage>
        );
    }
}

export default Home;

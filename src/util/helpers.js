
   //Format the invoice data to be sent for printing
   exports.formatFacture = ({title, totalPrice, companyName, commandes}) => {
    const ptitle = title.toUpperCase();
    const ptotalPrice = totalPrice.toLocaleString('fr-FR');
    const pcommandes = commandes.map(current =>{
        return {
            product: current.product,
            qty: current.qty.toLocaleString('fr-FR'),
            defaultPrice: current.defaultPrice.toLocaleString('fr-FR'),
            montant: current.montant.toLocaleString('fr-FR'),
            
        }
    }
    );

    return {
        title: ptitle,
        companyName,
        totalPrice: ptotalPrice,
        commandes: pcommandes,
        totalPriceToWord : totalPrice
    }

}
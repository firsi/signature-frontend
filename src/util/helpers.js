   const companiesFactureTotal = (invoices) => {
        let companies = [];
        invoices.map(facture => {
            // check if we've already compute this company invoices
            if(!companies.find(name => name === facture.companyName)){
            //compute a single company total
            let singleCompanyMontantTotal =  invoices.filter(current => facture.companyName === current.companyName)
                                .reduce((accumulator, fact) => accumulator+fact.totalPrice,0); 
              
            companies.push({company: facture.companyName ,
                              total: singleCompanyMontantTotal});
            }
        });
        return companies;

    }


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

    //Calcul du chiffre d'affaire
    exports.computeChiffreAffaire = (invoices) => {
        const total = invoices.reduce((accumulator, facture) => accumulator + facture.totalPrice,0);
        return total.toLocaleString('fr-FR');
    }


    //Compute the best customer of the month
    exports.bestCustomer = (invoices) => {
        const factures = invoices;
        //Get Invoices of this month
        const presentMonthFactures = factures.filter(current => {
          if(new Date(current.createdAt).getFullYear() === new Date().getFullYear()){
            return new  Date(current.createdAt).getMonth() === new Date().getMonth()
          }
        });


        const companies = companiesFactureTotal(presentMonthFactures);

        //compare total
        let bestCustomer = {company:'', total:0}
        companies.forEach(facture => {
            if(facture.total > bestCustomer.total)bestCustomer=facture;
        })
        
        return bestCustomer;
     }
  

     exports.customersIncomeThisYear = (invoices) => {
         
        const factures = invoices;
        //Get Invoices of this month
        const presentYearFactures = factures.filter(current => new Date(current.createdAt).getFullYear() === new Date().getFullYear());

        return companiesFactureTotal(presentYearFactures);  
        
     } 


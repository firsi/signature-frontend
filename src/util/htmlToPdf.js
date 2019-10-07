module.exports = ({title,commandes,totalPrice,companyName}) => {
    const today = new Date();
    const  dispCommandes = commandes.map(current => 
            `<tr >
            <td>${current.product}</td>
            <td>${current.qty}</td>
            <td>${current.defaultPrice}</td>
            <td >${current.montant}</td>
        </tr>`
    )
    
    return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        
        <title>Signature Pdf Template</title>
        <style>
          body {
            margin: 0;
            font-family: "Montserrat Medium",-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
              "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
              sans-serif;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }
    
          .container{
        max-width:800px;
        margin: auto;
        padding: 80px;
        border: 1px solid ;
    }
    header{
        width: 350px;
        margin: auto;
        position: relative;
    }
    header img{
        width:350px;
        opacity: 0.5;
    }
    header h1{
        position: absolute;
        top: 10px;
        left:60px;
        font-size:22px;
        opacity:0.5;
    }
    
    .entetes .facture, .entetes .compagnie{
        display: inline-block;
        width: 400px;
    }
    
    .entetes span{
        font-size: 13px;
        line-height: 28px;
    }
    .dear {
        font-size: 13px;
    }
    
    .title{
        text-align: center;
        font-size: 22px;
    }
    
    #facture {
        text-align: right;
        font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
        border-collapse: collapse;
        border: 1px solid black;
        width: 100%;
        font-size:17px;
        margin: 0 auto 0 auto;
        
      }
      
      #facture td, #facture th {
        border: 1px solid black;
        padding:  15px;
      }
       #facture  tbody  td{
        padding: 40px 15px;
      }
      
      #facture th {
        padding-top: 12px;
        padding-bottom: 12px;
        text-align: center;
        background-color: #5f5b5b;
        color: white;
        font-weight: 400;
      }
      #facture th:nth-child(1), #facture td:nth-child(1){
          text-align: left;
      }
    
      #facture #total  {
        text-align:left;
        background-color: #d2d2d2;
        padding-left: 3%;
        font-weight: 900;
        color:black;
     }
     #facture #total-value  {
        background-color: #d2d2d2;
        color:black;
        font-weight: 900;
     }
     .gerant{
         text-align: right;
         margin-right:100px;
         margin-top: 80px;
     }
    
     footer img{
         width:350px;
         margin-top:100px;
         opacity: 0.7;
     }
        </style>
      </head>
      <body>
        
        <div id="root">
            <div class='container'>
                <header>
                    <img src='logo.png' alt='Signature' />
                    <h1>EDIMO EHOWE BRIGITTE</h1>
                </header>
                <div className='entetes' >
                    <div className='facture'>
                        <h2>Facture</h2>
                        <span>SIG/Cpt 1907-3002</span><br />
                        <span>Du ${today.getDate()} ${today.getMonth()+1} ${today.getFullYear()} / Bamako Mali</span><br />
                        
                    </div>
                    <div className='compagnie'>
                        <h2>${companyName}</h2>
                        <span>Remise à : </span><br />
                        <span>Tél.</span><br />
                        <span>E-mail :</span><br /> 
                    </div>
                </div>
                    <p className='dear'>Madame, Monsieur,<br/>
                        Suite à notre entretien, veuillez trouver ici notre meilleure offre pour :<br />
                        ------------------------------------------------------------------------------------------------------------------------------------------------
                    </p>
               
                    <h3 className='title'>${title}</h3>
               
                <table id='facture'>
                    <tr>
                        <th >Désignation</th>
                        <th >Quantité</th>
                        <th >Prix Unit.</th>
                        <th >Montant</th>
                    </tr>
                    <tbody>
                        ${dispCommandes}
                    </tbody>    
                    <tfoot>
                        <tr>
                            <th id="total" colSpan={3}>Montant HT :</th>
                            <td id='total-value'>${totalPrice}</td>
                        </tr>
                    </tfoot>
                </table>
                <p>Arrêté la présente facture à la somme de <b>Deux Cent Soixante Mille</b> Francs CFA.</p>
                <p className='gerant'>Gérant Associé</p>
                
                <footer><img src='logo.png' alt='Signature' /></footer>
            </div>
        </div>
        
      </body>
    </html>
    
    `
}
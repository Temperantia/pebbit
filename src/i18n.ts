import i18n from "i18next";

import languageDetector from "./languageDetector";

i18n.use(languageDetector() as any).init({
  defaultNS: "common",
  fallbackLng: "en",
  resources: {
    en: {
      common: {
        ads: "ads",
        category: "Category",
        all: "All",
        location: "Location",
        currency: "Currency",
        currencies: "Currencies",
        dateListed: "Date Listed",
        completedOn: "Completed on",
        newestFirst: "Newest first",
        oldestFirst: "Oldest first",
        accordionExpand: "Expand Details",
        accordionCollapse: "Collapse Details",
        submit: "SUBMIT",
        done: "Done",
        noAdsYet: "No ads here yet!",
      },
      errors: {
        isRequired: "Is required",
        invalidEmail: "Invalid",
        invalidPassword:
          "Your password must contain at least 8 characters, one letter, one number and one special character",
        invalidMinimumPrice: "Price must be at least",
        wrongCredentials: "Incorrect credentials",
        wrongPassword: "Incorrect password",
        notificationToken: "Failed to get push token for push notification!",
        noCurrencySelected: "At least 1 currency",
        noPictureSelected: "At least 1 picture",
        cameraPermission: "Permission to access camera roll is required!",
      },
      statuses: {
        new: {
          buying: {
            title: "",
            description: "Listed",
          },
          messaging: {
            title: "",
            description: "Listed",
          },
          selling: {
            title: "",
            description: "Listed",
          },
        },
        paid: {
          buying: { title: "PAID", description: "Waiting for seller..." },
          messaging: {
            title: "PAID",
            description: "Waiting for seller...",
          },
          selling: {
            title: "PAID",
            description: "Waiting for seller...",
          },
        },
        sent: {
          buying: { title: "SENT", description: "" },
          messaging: {
            title: "SENT",
            description: "Waiting for buyer...",
          },
          selling: {
            title: "SENT",
            description: "",
          },
        },
        received: {
          buying: { title: "RECEIVED", description: "" },
          messaging: { title: "RECEIVED", description: "" },
          selling: { title: "RECEIVED", description: "" },
        },
        complete: {
          buying: { title: "SOLD", description: "Sold" },
          history: { sold: "SOLD", bought: "BOUGHT" },
          messaging: { title: "SOLD", description: "Sold" },
          selling: { title: "SOLD", description: "Sold" },
        },
      },
      auth: {
        password: "Password",
        signInWith: "Sign in with",
        title: "Sign in or Create an Account",
        description:
          "Otherwise, enter your email and password to sign in or create an account",
        disclaimer:
          "By signing up, you agree to our terms of service and privacy policy",
        signIn: "Sign In",
        signOut: "Sign Out",
        signInRequest: "Please sign in to purchase this item",
        emailConfirmation:
          "We have sent an email to your address, please confirm before you continue.",
        setUpAccount: "Set up your account",
        pleaseCreateUsername:
          "Please create a username, you cannot change this later",
        pleaseEnterShipping:
          "Please enter your shipping information, this is what sellers will use to ship your purchased items, please ensure this information is correct. You can change this later.",
        yourName: "Addressee Name",
        streetAddress: "Street Address or PO Box #",
        city: "City or Town, other Principal Subdivision, and Postage",
        country: "Country",
        continue: "CONTINUE",
      },
      profile: {
        recentTransactions: "Recent Transactions",
        accountInformation: "Account Information",
        editInfo: "Edit your email, password or phone number",
        email: "Email",
        password: "Current Password (required if changing email or password)",
        newPassword: "New Password",
        phoneNumber: "Phone Number",
        shippingInfo: "Shipping Information",
        shippingDescription:
          "This is what sellers will use to ship your purchased items, please ensure this information is correct.",
        addresseeName: "Addressee Name",
        streetAddress: "Street Address or PO Box #",
        city: "City or Town, other Principal Subdivision, and Postage",
        country: "Country",
        saveChanges: "Save Changes",
      },
      navigation: {
        home: "Home",
        myProfile: "My Profile",
        accountSettings: "Account Settings",
        backToResults: "Back to Results",
        selling: "Selling",
        buying: "Buying",
        messages: "Messages",
        history: "History",
        browse: "Browse",
        post: "Post",
        account: "Account",
        exchanges: "Exchanges",
      },
      home: {
        seeAll: "See all",
        recentlyPosted: "Recently Posted",
      },
      messaging: {
        backToMessages: "Back to Messages",
        typeAMessage: "Type here to send a message...",
      },
      listing: {
        results: "Results",
        filter: "Filter",
        aboutSeller: "About Seller",
      },
      shipping: {
        service: "Shipping service:",
        trackingNumber: "Tracking Number:",
        confirm: "CONFIRM",
        shipTo: "Ship to:",
      },
      adBuying: {
        priceSelection1: "Price ",
        priceSelection2: "(select one)",
        buy: "BUY IT NOW",
        timeExpired: "Time Expired",
        send1: "Please send ",
        sendBold: "exactly ",
        send2: " to the address listed below:",
        sendDisclaimer:
          "This cannot be refunded, please ensure the amount is correct.",
        paymentReceived: "Payment received, thank you for your purchase",
        pendingPayment: "Payment pending, awaiting block confirmation",
        pendingWait: "Please Wait...",
        processTime:
          "Please allow up to 10 minutes for payment to be processed",
        waitingSeller: "Waiting for Seller...",
        sentIndication: "Seller has indicated item was shipped",
        sentConfirmation: "Confirm Transaction Success",
        sentGuarantee:
          "If no action is taken within 14 days funds will be released automatically",
        receivedConfirmation: "Thank you for confirming",
        receivedTransaction: "Transaction Complete",
        ratingRequest: "Please rate your experience with this seller",
        ratingConfirmation: "Thank you for rating",
      },
      adCreation: {
        askingPrice: "Asking Price",
        addAddress1: "Add your ",
        addAddress2: " wallet address below.",
        postAnAd: "Post an Ad",
        adDetails: "Ad Details",
        title: "Title",
        category: "Category",
        description: "Description",
        chooseCurrencies1: "You may choose up to",
        chooseCurrencies2: "currencies.",
        escrowAgreement: "ESCROW AGREEMENT",
        escrowDescription:
          "Escrow is a neutral holding place where we put the buyer's funds aside until the transaction is done. The funds stay there until the seller fulfills their obligations and the buyer marks the transaction as complete. If an agreement is not made within 30 days of the accepted offer, the funds will be returned to the buyer.",
        pictures: "Pictures",
        addPictures:
          "Add up to 6 pictures. You must have at least one picture.",
        adPreview: "Ad Preview",
        postAd: "Post Ad",
      },
      onboarding: {
        skip: "OK",
        welcome: {
          title: "Welcome to Pebbit!",
          description: "Let's get you an account right away!",
        },
        sell: {
          title: "Congratulations for your account!",
          description: "Now let's sell your first item thanks to Pebbit!",
        },
      },
    },
    fr: {
      common: {
        ads: "annonces",
        category: "Catégorie",
        all: "Tout",
        location: "Pays",
        currency: "Monnaie",
        currencies: "Monnaies",
        dateListed: "Date de création",
        completedOn: "Effectuée le",
        newestFirst: "Le plus récent d'abord",
        oldestFirst: "Le moins récent d'abord",
        accordionExpand: "Plus de détail",
        accordionCollapse: "Moins de détail",
        submit: "VALIDER",
        done: "Ok",
        noAdsYet: "Pas encore d'annonces ici !",
      },
      errors: {
        isRequired: "Requis",
        invalidEmail: "Invalide",
        invalidPassword:
          "Votre mot de passe doit contenir au moins 8 caractères, une lettre, un chiffre et un caractère spécial",
        invalidMinimumPrice: "Le prix doit être au moins de",
        wrongCredentials: "Identifiants incorrects",
        wrongPassword: "Mot de passe incorrect",
        notificationToken: "Echec d'obtention du jeton de notification !",
        noCurrencySelected: "Au moins 1 monnaie",
        noPictureSelected: "Au moins 1 photo",
        cameraPermission: "La permission pour accéder aux photos est requise !",
      },
      statuses: {
        new: {
          buying: {
            title: "",
            description: "Listé",
          },
          messaging: {
            title: "",
            description: "Listé",
          },
          selling: {
            title: "",
            description: "Listé",
          },
        },
        paid: {
          buying: { title: "PAYÉ", description: "En attente du vendeur ..." },
          messaging: {
            title: "PAYÉ",
            description: "En attente du vendeur ...",
          },
          selling: {
            title: "PAYÉ",
            description: "En attente du vendeur ...",
          },
        },
        sent: {
          buying: { title: "ENVOYÉ", description: "" },
          messaging: {
            title: "ENVOYÉ",
            description: "En attente de l'acheteur ...",
          },
          selling: {
            title: "ENVOYÉ",
            description: "",
          },
        },
        received: {
          buying: { title: "REÇU", description: "" },
          messaging: { title: "REÇU", description: "" },
          selling: { title: "REÇU", description: "" },
        },
        complete: {
          buying: { title: "VENDU", description: "Vendu" },
          history: { sold: "VENDU", bought: "Acheté" },
          messaging: { title: "VENDU", description: "Vendu" },
          selling: { title: "VENDU", description: "Vendu" },
        },
      },
      auth: {
        password: "Mot de passe",
        signInWith: "Se connecter avec",
        title: "Se connecter ou Créer un Compte",
        description:
          "Ou alors, entrez votre email et mot de passe pour vous connecter ou créer un compte",
        disclaimer:
          "En vous inscrivant, vous acceptez nos conditions d'utilisation et politique de confidentialité",
        signIn: "Se Connecter",
        signOut: "Se Déconnecter",
        signInRequest: "Veuillez vous connecter pour acheter ce produit",
        emailConfirmation:
          "Nous avons envoyé un email à votre adresse, veuillez confirmer avant de continuer.",
        setUpAccount: "Configurez votre compte",
        pleaseCreateUsername:
          "Veuillez créer un nom d'utilisateur, vous ne pouvez pas le changer plus tard",
        pleaseEnterShipping:
          "Veuillez entrer vos informations de livraison, les vendeurs utiliseront ceci pour vous envoyer vos produits, veuillez vous assurer de la conformité de ces informations. Vous pouvez les changer plus tard.",
        yourName: "Nom du Destinaire",
        streetAddress: "Adresse ou Boîte Postale",
        city: "Ville",
        country: "Pays",
        continue: "CONTINUER",
      },
      profile: {
        recentTransactions: "Transactions Récentes",
        accountInformation: "Informations du Compte",
        editInfo:
          "Mettre à jour votre email, mot de passe ou numéro de téléphone",
        email: "Email",
        password:
          "Mot de passe actuel (requis si vous changez d'email ou de mot de passe)",
        newPassword: "Nouveau Mot de passe",
        phoneNumber: "Numéro de téléphone",
        shippingInfo: "Informations de Livraison",
        shippingDescription:
          "Les vendeurs utiliseront ceci pour vous envoyer vos produits, veuillez vous assurer de la conformité de ces informations.",
        addresseeName: "Nom du Destinataire",
        streetAddress: "Adresse ou Boîte Postale",
        city: "Ville",
        country: "Pays",
        saveChanges: "Sauvegarder",
      },
      navigation: {
        home: "Accueil",
        myProfile: "Mon Profil",
        accountSettings: "Réglages",
        backToResults: "Retour aux Résultats",
        selling: "Ventes",
        buying: "Achats",
        messages: "Messages",
        history: "Historique",
        browse: "Acheter",
        post: "Poster",
        account: "Compte",
        exchanges: "Échange",
      },
      home: {
        seeAll: "Voir Tout",
        recentlyPosted: "Récemment Posté",
      },
      messaging: {
        backToMessages: "Retour aux Messages",
        typeAMessage: "Envoyer un message ...",
      },
      listing: {
        results: "Résultats",
        filter: "Filtrer",
        aboutSeller: "À propos du Vendeur",
      },
      shipping: {
        service: "Service de livraison :",
        trackingNumber: "Numéro de suivi :",
        confirm: "CONFIRMER",
        shipTo: "Envoyer à :",
      },
      adBuying: {
        priceSelection1: "Prix ",
        priceSelection2: "(sélectionnez)",
        buy: "ACHETER MAINTENANT",
        timeExpired: "Temps expiré",
        send1: "Veuillez envoyer ",
        sendBold: "exactement ",
        send2: " à l'adresse indiquée ci dessous :",
        sendDisclaimer:
          "Cela ne peut pas être remboursé, veuillez vous assurer que le montant soit correct.",
        paymentReceived: "Paiment reçu, merci pour votre achat",
        pendingPayment:
          "Paiement en cours, en attente de la confirmation de bloc",
        pendingWait: "Veuillez attendre ...",
        processTime:
          "Veuillez attendre jusqu'à 10 minutes pour que le paiement soit traité",
        waitingSeller: "En attente du vendeur ...",
        sentIndication: "Le vendeur a indiqué que le produit a été envoyé",
        sentConfirmation: "Confirmer la Transaction",
        sentGuarantee:
          "Si rien n'est fait sous 14 jours les fonds seront débloqués automatiquement",
        receivedConfirmation: "Merci pour votre confirmation",
        receivedTransaction: "Transaction Terminée",
        ratingRequest: "Merci de noter votre expérience avec ce vendeur",
        ratingConfirmation: "Merci pour votre évaluation",
      },
      adCreation: {
        askingPrice: "Prix demandé",
        addAddress1: "Ajoutez votre ",
        addAddress2: " adresse de wallet ci-dessous.",
        postAnAd: "Poster une Annonce",
        adDetails: "Détails d'Annonce",
        title: "Titre",
        category: "Catégorie",
        description: "Description",
        chooseCurrencies1: "Vous pouvez choisir jusqu'à",
        chooseCurrencies2: "monnaies.",
        escrowAgreement: "ACCORD DE MISE SOUS SÉQUESTRE",
        escrowDescription:
          "Une mise sous séquestre est un emplacement neutre de rétention où nous mettons les fonds de l'acheteur de côté jusqu'à ce que la transaction soit terminée. Les fonds y restent jusqu'à ce que le vendeur remplisse ses obligations et que l'acheteur indique la transaction comme terminée. Si un accord n'est pas trouvé sous 30 jours après acceptation de l'offre, les fonds seront retournés à l'acheteur.",
        pictures: "Photos",
        addPictures:
          "Ajoutez jusqu'à 6 photos. Vous devez avoir au moins une photo.",
        adPreview: "Aperçu de l'Annonce",
        postAd: "Poster l'Annonce",
      },
      onboarding: {
        skip: "OK",
        welcome: {
          title: "Bienvenue chez Pebbit !",
          description: "Créons un compte dès maintenant !",
        },
        sell: {
          title: "Félicitations pour ce compte !",
          description: "A présent, vendons ensemble votre premier article !",
        },
      },
    },
  },
});

export default i18n;

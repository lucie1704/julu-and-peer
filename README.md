# Julu&Peer
Julu&amp;Peer an online shop to buy your favorite vinyls

## Développeurs 
DA SILVA SOUSA Pedro (PedroDSS)   
GODARD Lucie (lucie1704)   
JOUVET Erwann (ErwannJouvet)    
KATASI Justin (justinDev91)

## Fonctionnalitées

### DA SILVA SOUSA Pedro
- Ajout du paiement via l'intégration de Stripe.
- Ajout de controllers + routing.
- Ajout de fausses données de tests (Fixtures/Seeders).
- Ajout et modications de migrations de tables.
- Ajout de tests unitaires et d'intégrations.
- Ajout de hooks sur les tables liés aux produits.
- Ajout d'une logique de pagination sur les controllers.
- Amélioration de la page de paiement.
- Composant & Composables de tableau pour la partie Administration.
- Correction de Features.
- Création de pages pour la CGV et la CGU.
- Création de Webhook pour gérer le paiement effectuer de stripe (création commandes + livraison si payés).
- Création de schema Mongo pour les produits
- Création des pages + CRUD pour la partie Administration.
- Denormalization des produits avec les tables associés en document Mongo.
- Mise en place de la base de données et de l'architecture des tables.

### GODARD Lucie
- Initialisation du projet.
- Ajout et modications de migrations de tables.
- Ajout de tests unitaires et d'intégrations.
- Ajout d'un make file pour faciliter les commandes sur le projet.
- Ajout de la barre de recherche pour les produits.
- Ajout de la recherche facetté pour les produits.
- Composables de gestion de formulaire.
- Correction de Features.
- Gestion de la sécurité niveau front (navigation guards)
- Mise en production du site et de l'api.

### JOUVET Erwann
- Ajout de controllers + routing.
- Ajout de fausses données de tests (Fixtures/Seeders).
- Ajout de hooks sur les tables liés aux utilisateurs.
- Ajout de la page d'historique des commandes
- Ajout et modications de migrations de tables.
- Ajout de tests unitaires et d'intégrations.
- Correction de Features.
- Composant de bouton de validation de supression d'une ressource.
- Mise en place de la base de données et de l'architecture des tables.
- Page d'historique des commandes/livraisons côté client.
- Page de dashboard côté admin avec l'intégration de Widget.

### KATASI Justin
- Ajout de controllers + routing.
- Ajout de fausses données de tests (Fixtures/Seeders).
- Ajout et modications de migrations de tables.
- Ajout de tests unitaires et d'intégrations.
- Ajout de l'Authentification + Inscription.
- Gestion d'envoi de mail avec Mailtrap (Local) et Gmail (Prod).
- Mise en place de la sécurité niveau back avec des middleswares (Connexion Utilisateur et Administrateur).
- Implémentation de la newsletter.
- Correction de Features.
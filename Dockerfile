FROM php:8.2-apache

# Installation des dépendances système et des extensions pour MySQL et MongoDB
RUN apt-get update && apt-get install -y \
    libssl-dev \
    unzip \
    zip \
    git \
    && docker-php-ext-install pdo pdo_mysql \
    && pecl install mongodb \
    && docker-php-ext-enable mongodb

# Installation de Composer (l'outil qui manque actuellement)
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Activation de mod_rewrite pour Apache
RUN a2enmod rewrite

WORKDIR /var/www/html
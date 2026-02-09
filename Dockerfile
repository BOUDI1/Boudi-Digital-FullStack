FROM php:8.2-apache

# Installation des extensions pour MySQL et MongoDB
RUN apt-get update && apt-get install -y libssl-dev \
    && docker-php-ext-install pdo pdo_mysql \
    && pecl install mongodb \
    && docker-php-ext-enable mongodb

# Activation de mod_rewrite pour Apache
RUN a2enmod rewrite

WORKDIR /var/www/html
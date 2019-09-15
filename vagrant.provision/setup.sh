#!/bin/bash

echo ""
echo "——————————————————————————————————————————————————————————————————————"
echo "Provisioning VM…"
echo ""

mkdir /vagrant/tmp/

echo ""
echo "——————————————————————————————————————————————————————————————————————"
echo "Updating the system"
echo ""
apt-get update
apt-get upgrade -y
apt-get autoremove -y

echo ""
echo "——————————————————————————————————————————————————————————————————————"
echo "Installing and initializing git-flow"
echo ""
apt-get install git-flow
cd /vagrant/
git flow init -d

echo ""
echo "——————————————————————————————————————————————————————————————————————"
echo "Setting hostname to: $VAGRANT_PROJECT_NAME-vb-box"
echo ""
hostnamectl set-hostname "$VAGRANT_PROJECT_NAME-vb-box"

echo ""
echo "——————————————————————————————————————————————————————————————————————"
echo "Copying v-host template to apache available-sites"
echo ""
cp /vagrant/vagrant.provision/config-template/apache-vhost-vb-box.conf /etc/apache2/sites-available/vb-box.conf
echo "Setting v-host url to: $VAGRANT_PROJECT_URL"
sed -i -e "s:INSERT_PROJECT_URL:$VAGRANT_PROJECT_URL:g" /etc/apache2/sites-available/vb-box.conf
echo "Setting v-host docroot: $VAGRANT_PROJECT_DOCROOT"
sed -i -e "s:INSERT_PROJECT_DOCROOT:$VAGRANT_PROJECT_DOCROOT:g" /etc/apache2/sites-available/vb-box.conf

echo ""
echo "——————————————————————————————————————————————————————————————————————"
echo "Intialising database"
echo ""
cp /vagrant/vagrant.provision/database/init.sql /vagrant/tmp/init.sql
mysql --host=localhost --user=$VAGRANT_DATABASE_USER --password=$VAGRANT_DATABASE_PW -f $VAGRANT_DATABASE_NAME < /vagrant/tmp/init.sql

echo ""
echo "——————————————————————————————————————————————————————————————————————"
echo "Restarting Apache"
echo ""
service apache2 restart

echo "" >> /home/vagrant/.profile
echo "cd /vagrant/" >> /home/vagrant/.profile

rm -rf /vagrant/tmp/

echo ""
echo "——————————————————————————————————————————————————————————————————————"
echo "Provisioning done. Yay!"
echo ""

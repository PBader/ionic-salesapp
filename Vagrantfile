# -*- mode: ruby -*-
# vi: set ft=ruby :


# global settings and flags
# feel free to edit as wished

project_name = "local-ionic-project-de"
project_local_url = "local.ionic-project.de"
project_docroot = "/vagrant/craft/web"
ip_address = "10." + Random.rand(2...254).to_s + "." + Random.rand(2...254).to_s + "." + Random.rand(2...254).to_s

# database settings
database_name = "vb_db"
database_user = "root"
database_pw = "root"


# Don't edit any code below the following line, unless you know what you're doing!
# ————————————————————————————————————————————————————————————————————————————————


Vagrant.configure(2) do |config|

  # rename the VirtualBox, also define some settings like memory
  config.vm.provider "virtualbox" do |vb|
      vb.name = project_name
      vb.memory = "2048"
  end

  # use the Vierbeuter "vb-box"
  # (which is a Ubuntu 16.04 with Apache 2.4, PHP 7.1 and MySQL 5.7)
  config.vm.box = "vb-box-php71"
  config.vm.box_url = "http://vagrant.vierbeuter.de/vb.box.php71.json"

  # set project url (also adds an entry to /etc/hosts)
  config.vm.network "private_network", ip: ip_address
  config.vm.hostname = project_local_url

  # install packages as defined in bootstrap file
  config.vm.provision :shell, path: "vagrant.provision/setup.sh",
    :env => {
      :VAGRANT_PROJECT_NAME => project_name,
      :VAGRANT_PROJECT_URL => project_local_url,
      :VAGRANT_PROJECT_DOCROOT => project_docroot,
      :VAGRANT_DATABASE_NAME => database_name,
      :VAGRANT_DATABASE_USER => database_user,
      :VAGRANT_DATABASE_PW => database_pw,
    }

end

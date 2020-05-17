### install azure CLIs
npm i -g azure-functions-core-tools@3 --unsafe-perm true
https://docs.microsoft.com/en-us/cli/azure/install-azure-cli?view=azure-cli-latest

### Init func app
func init . --docker

### Create new func
func new

### Azure setup
az login
setup azure functions app with :
- linux docker registry 
- linux storage account

### CI chain 
see .github/workflows folder

### Credentials for github secret
az ad sp create-for-rbac --name "myApp" --role contributor --scopes /subscriptions/{SUBSCRIPTION_ID}/resourceGroups/{RESOURCE_GROUP} --sdk-auth

### Install mssql using docker
docker run -e "ACCEPT_EULA=Y" -e "SA_PASSWORD=@passwordSafe111" -e "MSSQL_PID=Express" -p 1433:1433 --name mssql -d mcr.microsoft.com/mssql/server:2017-latest-ubuntu

### Start stopped container
docker container start mssql
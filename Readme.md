
### Credentials for github secret
az ad sp create-for-rbac --name "myApp" --role contributor --scopes /subscriptions/{SUBSCRIPTION_ID}/resourceGroups/{RESOURCE_GROUP} --sdk-auth

### Install mssql using docker
docker run -e "ACCEPT_EULA=Y" -e "SA_PASSWORD=@passwordSafe111" -e "MSSQL_PID=Express" -p 1433:1433 --name mssql -d mcr.microsoft.com/mssql/server:2017-latest-ubuntu

### Start stopped container
docker container start mssql

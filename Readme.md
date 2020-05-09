   az ad sp create-for-rbac --name "myApp" --role contributor --scopes /subscriptions/83973629-b28a-49fd-9f09-5721576561b7/resourceGroups/senner-linux-group --sdk-auth

   ### Install mssql using docker
https://hub.docker.com/_/microsoft-mssql-server
docker run -e "ACCEPT_EULA=Y" -e "SA_PASSWORD=@passwordSafe111" -e "MSSQL_PID=Express" -e "MSSQL_DB=payment_test_db" -p 1433:1433 --name mssql -d mcr.microsoft.com/mssql/server:2017-latest-ubuntu

### Start stopped container
docker container start mssql

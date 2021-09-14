
FROM mcr.microsoft.com/mssql/server:2019-latest

ENV SA_PASSWORD=GraphQL!Workshop
ENV ACCEPT_EULA=Y

USER mssql

COPY ./AdventureWorksLT2019.bak /var/opt/mssql/backup/

RUN ( /opt/mssql/bin/sqlservr & ) | grep -q "Service Broker manager has started" \
    && /opt/mssql-tools/bin/sqlcmd -S localhost -U SA -P ${SA_PASSWORD} -Q 'RESTORE DATABASE AdventureWorks FROM DISK = "/var/opt/mssql/backup/AdventureWorksLT2019.bak" WITH MOVE "AdventureWorksLT2012_Data" to "/var/opt/mssql/data/AdventureWorksLT2019.mdf", MOVE "AdventureWorksLT2012_Log" to "/var/opt/mssql/data/AdventureWorksLT2019_log.ldf", NOUNLOAD, STATS = 5' \
    && pkill sqlservr

CMD ["/opt/mssql/bin/sqlservr"]
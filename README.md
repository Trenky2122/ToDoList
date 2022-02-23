# ToDoList
Short interview homework

To run, create an empty database using PostgreSQL and replace connection string with correct one in web.config
```xml
<connectionStrings>
  <add name="ToDoListContext" connectionString="Server=localhost;port={your psql port};Database={your db name};User Id={your db username};Password={password of your db user};" providerName="Npgsql" />
</connectionStrings>
```
Visual Studio should restore NuGet and npm packages on run.
